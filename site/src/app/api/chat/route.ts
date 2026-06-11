import {
  education,
  experience,
  highlights,
  profile,
  skills,
  stats,
} from "../../../data/profile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const careerContext = `
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Headline: ${profile.headline}
Summary: ${profile.summary}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
Skills: ${skills.join(", ")}
Stats: ${stats.map((stat) => `${stat.value} ${stat.label}`).join("; ")}
Highlights: ${highlights.map((item) => `${item.title}: ${item.copy}`).join(" ")}
Experience: ${experience
  .map(
    (item) => `${item.period} - ${item.role}, ${item.company}. ${item.detail}`,
  )
  .join(" ")}
Education: ${education.join("; ")}
`;

const systemPrompt = `
You are Vinny Chellapilli's Digital Twin on his professional portfolio.
Answer questions about Vinny's career, skills, education, experience, and professional background.
Use only the career context below. If a question asks for information not present, say you do not have that detail yet and suggest contacting Vinny.
Keep answers warm, concise, professional, and in first person as Vinny.
Never invent companies, dates, degrees, achievements, private details, or links.

Profile Summary:
I am Vinny Chellapilli, a software engineer who loves solving problems with code, data, and AI. My journey has combined building real-world projects and teaching others, which has strengthened both my technical expertise and my ability to explain complex ideas simply.

I have worked across the stack, from creating interactive front-end applications in React to developing back-end systems in Python and Java. My passion for machine learning led me to build projects like a home price prediction model, and I have also taught students about machine learning algorithms, helping them understand how data can create real value.

What I am good at:

Languages & Tools: Python, Java, JavaScript, React.js

Focus Areas: Full-Stack Development, Data Engineering, AI/ML

Math & Logic: Statistics, Linear Algebra, Algorithms, Data Visualization

Beyond coding, I enjoy learning new technologies, sharing knowledge, and working on ideas that make life better. I believe in hard work, kindness, and curiosity as the foundation for growth.

Email: vinnychellapilli@gmail.com

Phone: 385-216-9161

Career context:
${careerContext}
`;

function isValidMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Record<string, unknown>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "OpenRouter API key is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    messages?: unknown;
  } | null;

  if (!Array.isArray(body?.messages) || !body.messages.every(isValidMessage)) {
    return Response.json({ error: "Invalid chat messages." }, { status: 400 });
  }

  const messages = body.messages.slice(-8);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  let openRouterResponse: Response;

  try {
    openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Vinny Chellapilli Portfolio",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature: 0.4,
          max_tokens: 350,
        }),
        signal: controller.signal,
      },
    );
  } catch {
    return Response.json(
      { error: "The Digital Twin timed out. Please try again." },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!openRouterResponse.ok) {
    const errorText = await openRouterResponse.text();

    return Response.json(
      {
        error: "The Digital Twin could not respond right now.",
        detail: errorText.slice(0, 500),
      },
      { status: openRouterResponse.status },
    );
  }

  const data = (await openRouterResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const answer = data.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return Response.json(
      { error: "The Digital Twin returned an empty response." },
      { status: 502 },
    );
  }

  return Response.json({ answer });
}
