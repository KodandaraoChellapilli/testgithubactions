# Beginner Tutorial: Building This Next.js Portfolio With a Digital Twin Chat Widget

This tutorial explains the website in this project from the point of view of someone who is new to frontend coding. It covers what technology is being used, how the files are organized, how the page is built, how styling works, and how the AI Digital Twin chat feature talks to OpenRouter.

The goal is not just to show what the code does, but to help you understand why it is organized this way.

## 1. What We Built

This project is a personal portfolio website for Vinny Chellapilli. It includes:

- A professional homepage.
- A hero section with name, summary, and contact links.
- About, skills, experience, education, profile links, and contact sections.
- A modern floating AI chat widget.
- A server-side API route that sends chat questions to OpenRouter.
- A Digital Twin prompt that answers questions about Vinny's career.

The site runs locally at:

```bash
http://localhost:3000
```

The main app is built with Next.js, React, TypeScript, and CSS.

## 2. Technology Summary

### Next.js

Next.js is a framework built on top of React. React helps you build user interfaces using reusable components. Next.js adds extra structure, routing, server features, builds, and performance improvements.

In this project, Next.js is used for:

- Rendering the portfolio page.
- Organizing routes inside `src/app`.
- Creating an API endpoint at `src/app/api/chat/route.ts`.
- Reading the secret OpenRouter API key on the server.

### React

React lets you build the page out of small pieces called components.

For example, the homepage is made from components like:

- `Header`
- `Hero`
- `About`
- `Experience`
- `Contact`
- `DigitalTwinChat`

Instead of putting all page code in one large file, each component owns one part of the page.

### TypeScript

TypeScript is JavaScript with types. Types help catch mistakes earlier.

Example:

```ts
type Message = {
  role: "user" | "assistant";
  content: string;
};
```

This says a chat message must have:

- `role`, which can only be `"user"` or `"assistant"`.
- `content`, which must be a string.

### CSS

CSS controls how the website looks.

This project uses one global stylesheet:

```text
src/app/globals.css
```

That file defines:

- Colors.
- Layouts.
- Buttons.
- Cards.
- The floating chat widget.
- Responsive styles for smaller screens.

### OpenRouter

OpenRouter is the AI service used by the Digital Twin chat.

The website sends user questions to a local API route:

```text
/api/chat
```

That API route then sends the request to OpenRouter using this model:

```text
openai/gpt-oss-120b
```

The browser never receives the secret API key. The key stays on the server in `.env`.

## 3. Project Folder Structure

The project is organized like this:

```text
site/
  package.json
  tutorial.md
  .env
  src/
    app/
      api/
        chat/
          route.ts
      globals.css
      layout.tsx
      page.tsx
    components/
      About.tsx
      Contact.tsx
      DigitalTwinChat.tsx
      Experience.tsx
      Header.tsx
      Hero.tsx
      SectionTitle.tsx
    data/
      profile.ts
```

Here is what each important folder does.

### `src/app`

This is the Next.js App Router folder.

Important files:

- `page.tsx`: The homepage.
- `layout.tsx`: The root layout and metadata.
- `globals.css`: Global styles.
- `api/chat/route.ts`: Server-side chat API route.

### `src/components`

This folder stores reusable React components.

A component is a function that returns UI.

For example:

```tsx
export function Header() {
  return (
    <header className="site-header">
      ...
    </header>
  );
}
```

### `src/data`

This folder stores profile data separately from the UI.

The file `src/data/profile.ts` contains things like:

- Name.
- Email.
- LinkedIn URL.
- Skills.
- Experience.
- Education.

This is useful because the components can display data without hardcoding everything inside the visual layout.

## 4. How to Run the Website

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the website:

```bash
http://localhost:3000
```

Run lint checks:

```bash
npm run lint
```

Build the production version:

```bash
npm run build
```

## 5. High-Level Walkthrough

At a high level, the app works like this:

```text
User opens homepage
  -> Next.js renders src/app/page.tsx
  -> page.tsx displays components
  -> components read profile data from src/data/profile.ts
  -> CSS in globals.css styles everything
  -> floating chat widget appears at bottom
  -> user asks a question
  -> browser POSTs to /api/chat
  -> server route calls OpenRouter
  -> AI answer returns to the widget
```

The main idea is separation of concerns.

That means:

- Page structure lives in `page.tsx`.
- Visual sections live in `src/components`.
- Career information lives in `src/data/profile.ts`.
- Server AI logic lives in `src/app/api/chat/route.ts`.
- Styling lives in `src/app/globals.css`.

This makes the project easier to understand and easier to change.

## 6. The Package File

The `package.json` file describes the project and its commands.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "^16.2.7",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  }
}
```

The most important scripts are:

- `npm run dev`: Starts the local development server.
- `npm run build`: Checks that the site can be built for production.
- `npm run lint`: Checks the code style and catches common mistakes.

There is also an `overrides` section:

```json
{
  "overrides": {
    "postcss": "8.5.15"
  }
}
```

That pins `postcss` to a safer version after an audit warning.

## 7. The Homepage: `src/app/page.tsx`

The homepage is intentionally simple.

```tsx
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { DigitalTwinChat } from "../components/DigitalTwinChat";
import { Experience } from "../components/Experience";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <main>
      <div className="page-shell">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Contact />
      </div>
      <DigitalTwinChat />
    </main>
  );
}
```

This file imports components and places them in order.

The normal page content is wrapped inside:

```tsx
<div className="page-shell">
```

The floating chat widget is outside that shell:

```tsx
<DigitalTwinChat />
```

That is because the chat widget is fixed to the bottom of the screen. It should float independently instead of taking up normal page space.

## 8. Root Layout: `src/app/layout.tsx`

The layout file wraps every page in the app.

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinny Chellapilli | Software Engineer",
  description: "Vinny Chellapilli's software engineering portfolio and Digital Twin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Important details:

- `globals.css` is imported here so the whole site gets the same styles.
- `metadata` controls the browser title and search/social description.
- `children` means "whatever page is currently being shown."

## 9. Profile Data: `src/data/profile.ts`

The data file stores content separately from the components.

Example:

```ts
export const profile = {
  name: "Vinny Chellapilli",
  initials: "VC",
  role: "Software Engineer",
  location: "Lindon, Utah",
  email: "vinnychellapilli@gmail.com",
  phone: "385-216-9161",
  linkedin: "https://www.linkedin.com/in/vinodh-chellapilli",
  headline: "Vinny Chellapilli",
  summary:
    "Software engineer building clean, reliable applications across React, Spring Boot, data, and AI.",
};
```

This is used by components like `Hero`, `Header`, and `Contact`.

For example, instead of writing the email directly in multiple files, a component can use:

```tsx
profile.email
```

That means if the email changes later, you update it in one place.

The same file also stores arrays:

```ts
export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Java",
  "Spring Boot",
  "Python",
  "Django",
  "REST APIs",
  "AI/ML",
  "Data Engineering",
  "Statistics",
  "Docker",
];
```

Arrays are useful because components can loop over them.

Example idea:

```tsx
{skills.map((skill) => (
  <span key={skill}>{skill}</span>
))}
```

That creates one `<span>` for each skill.

## 10. The Header Component

The header is the top navigation bar.

```tsx
import { profile } from "../data/profile";

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${profile.name} home`}>
        <span>{profile.initials}</span>
        <strong>{profile.name}</strong>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
```

Beginner notes:

- `<header>` is semantic HTML for the page header.
- `<nav>` tells browsers and screen readers this is navigation.
- `href="#about"` jumps to the element with `id="about"`.
- `className` connects the HTML element to CSS.

In React, you use `className` instead of `class`.

## 11. The Hero Component

The hero is the first large section of the page.

```tsx
import { profile, stats } from "../data/profile";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{profile.role} | Full-Stack + AI/ML</p>
        <h1>{profile.headline}</h1>
        <p className="lead">{profile.summary}</p>

        <div className="actions">
          <a className="button primary" href={`mailto:${profile.email}`}>
            Contact me
          </a>
          <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
```

Important concepts:

### Template strings

This line:

```tsx
href={`mailto:${profile.email}`}
```

creates an email link like:

```text
mailto:vinnychellapilli@gmail.com
```

### External links

This link opens LinkedIn in a new tab:

```tsx
target="_blank"
rel="noreferrer"
```

`rel="noreferrer"` is a security and privacy best practice.

### Rendering stats with `.map()`

The hero card uses:

```tsx
{stats.map((stat) => (
  <div key={stat.label}>
    <strong>{stat.value}</strong>
    <span>{stat.label}</span>
  </div>
))}
```

`.map()` loops through the `stats` array and creates UI for each stat.

React needs a `key` so it can track each item efficiently.

## 12. About and Experience Components

The `About` component shows a summary, skills, and highlight cards.

The `Experience` component shows career history and education.

They follow the same pattern:

1. Import data from `src/data/profile.ts`.
2. Import `SectionTitle`.
3. Return HTML-like JSX.
4. Use `.map()` to turn arrays into UI.

For example:

```tsx
{experience.map((item) => (
  <article className="timeline-item" key={`${item.company}-${item.period}`}>
    <span>{item.period}</span>
    <div>
      <h3>{item.role}</h3>
      <strong>{item.company}</strong>
      <p>{item.detail}</p>
    </div>
  </article>
))}
```

Beginner notes:

- `<article>` is good for standalone content blocks.
- `key={`${item.company}-${item.period}`}` creates a unique key.
- The timeline content comes from the data file, not hardcoded inside the component.

## 13. The Floating Digital Twin Chat Widget

The chat widget lives in:

```text
src/components/DigitalTwinChat.tsx
```

This is a client component.

At the top of the file:

```tsx
"use client";
```

This tells Next.js that the component runs in the browser.

That is necessary because the chat widget uses browser interactivity:

- Opening and closing the panel.
- Typing into an input.
- Updating messages.
- Showing loading state.
- Sending a request when the user clicks Send.

### State

React state stores values that can change.

```tsx
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([
  {
    role: "assistant",
    content:
      "Hi, I am Vinny's Digital Twin. Ask me about his career, skills, education, or background.",
  },
]);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

What each state value means:

- `isOpen`: whether the floating chat panel is open.
- `messages`: the conversation history.
- `input`: what the user typed.
- `isLoading`: whether the AI is currently responding.

### Message Type

```ts
type Message = {
  role: "user" | "assistant";
  content: string;
};
```

This keeps messages predictable.

Every message must have:

- A role.
- Text content.

### Opening and Closing the Widget

The launcher button uses:

```tsx
onClick={() => setIsOpen((current) => !current)}
```

This means:

- If `isOpen` is `false`, set it to `true`.
- If `isOpen` is `true`, set it to `false`.

That creates a toggle.

### Sending a Message

The main chat function is:

```tsx
async function sendMessage(content: string) {
  const question = content.trim();

  if (!question || isLoading) {
    return;
  }

  const nextMessages: Message[] = [...apiMessages, { role: "user", content: question }];

  setMessages(nextMessages);
  setInput("");
  setIsLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: nextMessages }),
    });

    const data = (await response.json()) as { answer?: string; error?: string };

    if (!response.ok || !data.answer) {
      throw new Error(data.error ?? "The Digital Twin is unavailable right now.");
    }

    setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
  } catch (error) {
    setMessages([
      ...nextMessages,
      {
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "The Digital Twin is unavailable right now.",
      },
    ]);
  } finally {
    setIsLoading(false);
  }
}
```

This does several things:

1. Trims extra spaces from the user's question.
2. Stops if the question is empty.
3. Adds the user's message to the chat.
4. Clears the input box.
5. Sets loading to `true`.
6. Sends the message history to `/api/chat`.
7. Adds the AI answer to the chat.
8. Shows an error message if something goes wrong.
9. Sets loading back to `false`.

### The Form

```tsx
<form className="chat-form" onSubmit={handleSubmit}>
  <input
    aria-label="Ask the Digital Twin a question"
    disabled={isLoading}
    onChange={(event) => setInput(event.target.value)}
    placeholder="Ask about Vinny..."
    type="text"
    value={input}
  />
  <button disabled={isLoading || input.trim().length === 0} type="submit">
    Send
  </button>
</form>
```

Important beginner concepts:

- `onSubmit` runs when the form is submitted.
- `value={input}` means React controls the input.
- `onChange` updates React state whenever the user types.
- `disabled` prevents actions while the AI is loading.
- `aria-label` improves accessibility.

## 14. The Chat API Route

The API route lives here:

```text
src/app/api/chat/route.ts
```

Because this file is under `src/app/api/chat`, Next.js makes it available at:

```text
/api/chat
```

The browser sends chat messages to this route.

The route then sends the request to OpenRouter.

### Why Use a Server Route?

You should never put secret API keys in browser code.

Bad idea:

```tsx
const key = "secret-key-in-browser";
```

Anyone could inspect the website and steal it.

Good idea:

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
```

This only runs on the server.

The key is stored in `.env`, but the actual key value should never be committed to Git.

### The Career Context

The API route builds a career summary:

```ts
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
```

This gives the AI the information it is allowed to use.

### The System Prompt

The system prompt tells the AI how to behave.

```ts
const systemPrompt = `
You are Vinny Chellapilli's Digital Twin on his professional portfolio.
Answer questions about Vinny's career, skills, education, experience, and professional background.
Use only the career context below. If a question asks for information not present, say you do not have that detail yet and suggest contacting Vinny.
Keep answers warm, concise, professional, and in first person as Vinny.
Never invent companies, dates, degrees, achievements, private details, or links.
`;
```

This is important because it reduces hallucination.

Hallucination means the AI makes up information.

The prompt says:

- Answer as Vinny.
- Stay professional.
- Use only known career context.
- Do not invent facts.

### Validating Incoming Messages

The route checks that each message has the right shape:

```ts
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
```

This protects the API from bad input.

If the browser sends invalid data, the route returns:

```ts
return Response.json({ error: "Invalid chat messages." }, { status: 400 });
```

### Calling OpenRouter

The API sends a request to OpenRouter:

```ts
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
```

Important parts:

- `Authorization`: sends the API key.
- `model`: chooses the OpenRouter model.
- `messages`: sends the system prompt and conversation history.
- `temperature`: controls creativity.
- `max_tokens`: limits answer length.
- `signal`: lets the request time out.

### Timeout Handling

The route creates a timeout:

```ts
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 20000);
```

That means if OpenRouter takes more than 20 seconds, the request is canceled.

If that happens, the API returns:

```ts
return Response.json(
  { error: "The Digital Twin timed out. Please try again." },
  { status: 504 },
);
```

This is better than letting the chat hang forever.

## 15. Styling: `src/app/globals.css`

The site uses CSS variables for colors.

```css
:root {
  --bg: #020617;
  --panel: rgba(15, 23, 42, 0.72);
  --panel-strong: rgba(30, 41, 59, 0.86);
  --text: #f8fafc;
  --muted: #94a3b8;
  --line: rgba(148, 163, 184, 0.18);
  --accent: #22d3ee;
  --accent-2: #8b5cf6;
  --shadow: 0 24px 80px rgba(2, 6, 23, 0.5);
}
```

These colors are inspired by Tailwind CSS color families:

- `slate`: dark backgrounds and muted text.
- `cyan`: bright accent color.
- `violet`: secondary accent color.

CSS variables make it easier to update the design later.

For example:

```css
color: var(--text);
```

uses the value from:

```css
--text: #f8fafc;
```

### Page Shell

```css
.page-shell {
  margin: 0 auto;
  max-width: 1120px;
  padding: 24px;
}
```

This centers the site and limits the maximum width.

Without a max width, text can stretch too wide on large screens.

### Hero Layout

```css
.hero {
  align-items: center;
  display: grid;
  gap: 32px;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  min-height: 620px;
  padding: 56px 0;
}
```

This creates a two-column layout:

- Left column: text and buttons.
- Right column: current role card.

On smaller screens, media queries change it to one column.

### Floating Chat Widget

The widget is fixed to the bottom-right:

```css
.chat-widget {
  bottom: 22px;
  display: grid;
  gap: 14px;
  justify-items: end;
  position: fixed;
  right: 22px;
  z-index: 50;
}
```

Key beginner concepts:

- `position: fixed` means it stays in the same place on the screen.
- `bottom: 22px` places it near the bottom.
- `right: 22px` places it near the right edge.
- `z-index: 50` keeps it above other page content.

### Chat Panel

```css
.chat-panel {
  backdrop-filter: blur(24px);
  background:
    linear-gradient(145deg, rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.9)),
    var(--panel);
  border: 1px solid rgba(34, 211, 238, 0.22);
  border-radius: 30px;
  box-shadow: 0 28px 90px rgba(2, 6, 23, 0.62);
  overflow: hidden;
  padding: 16px;
  width: min(420px, calc(100vw - 32px));
}
```

This creates the modern glass-style panel.

The line:

```css
width: min(420px, calc(100vw - 32px));
```

means:

- Use 420px on desktop.
- But never be wider than the screen minus 32px.

That helps the widget fit on phones.

### Mobile Styles

At the bottom of the CSS file, there is a media query:

```css
@media (max-width: 620px) {
  .chat-widget {
    bottom: 12px;
    left: 12px;
    right: 12px;
  }

  .chat-panel {
    border-radius: 26px;
    width: 100%;
  }
}
```

This means when the screen is 620px wide or smaller:

- The chat widget becomes wider.
- It behaves more like a bottom sheet.
- It is easier to use on mobile.

## 16. How the Digital Twin Flow Works

Here is the complete flow:

```text
1. Visitor clicks "Ask Digital Twin"
2. React sets isOpen to true
3. Chat panel appears
4. Visitor types a question
5. Form submit calls sendMessage()
6. Browser sends POST request to /api/chat
7. Next.js API route validates the messages
8. API route reads OPENROUTER_API_KEY from .env
9. API route sends request to OpenRouter
10. OpenRouter returns an AI response
11. API route returns { answer: "..." }
12. React adds the answer to the chat window
```

The browser only talks to your own API route.

It does not talk directly to OpenRouter.

That keeps the API key safer.

## 17. Beginner Glossary

### Component

A reusable piece of UI.

Example:

```tsx
<Hero />
```

### Props

Values passed into a component.

Example:

```tsx
<SectionTitle eyebrow="About" title="Simple, focused software engineering." />
```

### State

Data that changes while the user interacts with the page.

Example:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### JSX

HTML-like syntax used inside React.

Example:

```tsx
return <h1>Hello</h1>;
```

### API Route

A server endpoint inside the Next.js app.

Example:

```text
src/app/api/chat/route.ts
```

### Environment Variable

A secret or setting stored outside code.

Example:

```text
OPENROUTER_API_KEY=...
```

## 18. Common Things You Might Want to Change

### Change your name or headline

Edit:

```text
src/data/profile.ts
```

Update:

```ts
headline: "Vinny Chellapilli",
summary:
  "Software engineer building clean, reliable applications across React, Spring Boot, data, and AI.",
```

### Change skills

Edit the `skills` array:

```ts
export const skills = [
  "React",
  "Next.js",
  "TypeScript",
];
```

### Change the AI model

Edit:

```text
src/app/api/chat/route.ts
```

Find:

```ts
model: "openai/gpt-oss-120b",
```

Replace it with another OpenRouter model if needed.

### Change chat starter questions

Edit:

```text
src/components/DigitalTwinChat.tsx
```

Find:

```ts
const starterQuestions = [
  "What kind of engineer is Vinny?",
  "What is Vinny's strongest experience?",
  "What technologies does Vinny use?",
  "Tell me about Vinny's teaching background.",
];
```

### Change colors

Edit:

```text
src/app/globals.css
```

Change the variables at the top:

```css
:root {
  --accent: #22d3ee;
  --accent-2: #8b5cf6;
}
```

## 19. Code Review Summary

### What is good about the current code

The app is organized in a beginner-friendly way:

- `src/app/page.tsx` is small and easy to read.
- Components are separated by responsibility.
- Profile data is centralized in `src/data/profile.ts`.
- The OpenRouter API key stays server-side.
- The chat widget has loading and error states.
- The API route validates input before calling OpenRouter.
- The app passes lint and production build checks.

### Why the floating chat approach is better

The earlier chat section took up normal page space. The current version is better because:

- It is always available.
- It does not interrupt the portfolio layout.
- It feels more like a modern product assistant.
- It works as a compact launcher on desktop.
- It adapts to a wider bottom-sheet style on mobile.

### Why the API route is important

The AI call could technically happen in the browser, but that would expose the API key.

This project correctly uses:

```ts
process.env.OPENROUTER_API_KEY
```

inside the server route.

That is the safer pattern.

## 20. Five Improvement Suggestions From Self-Review

1. Add streaming responses.

   Right now the chat waits for the full AI answer before showing it. A future improvement would stream the response token by token, so the answer appears while it is being generated.

2. Add automatic scroll-to-bottom in the chat window.

   When a new message appears, the chat window should automatically scroll to the newest message. This would make longer conversations easier to follow.

3. Store conversation history in local storage.

   Currently, refreshing the page resets the chat. Saving messages in `localStorage` would let the conversation survive a page refresh.

4. Move the Digital Twin prompt into a separate file.

   The API route currently contains both request logic and prompt text. Moving the prompt to something like `src/data/digitalTwinPrompt.ts` would make the API route shorter and easier to maintain.

5. Add stronger rate limiting and abuse protection.

   The current API route validates input and has a timeout, but a public site should also limit how often someone can call `/api/chat`. This would protect the OpenRouter account from spam or unexpected costs.

## Final Mental Model

Think of this project as three layers:

```text
Content layer:
  src/data/profile.ts

UI layer:
  src/components/*
  src/app/page.tsx
  src/app/globals.css

Server AI layer:
  src/app/api/chat/route.ts
  .env
  OpenRouter
```

The content layer stores facts.

The UI layer displays those facts.

The server AI layer lets visitors ask questions about those facts.

That separation is the main reason the project is understandable and maintainable.
