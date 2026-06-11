"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterQuestions = [
  "What kind of engineer is Vinny?",
  "What is Vinny's strongest experience?",
  "What technologies does Vinny use?",
  "Tell me about Vinny's teaching background.",
];

export function DigitalTwinChat() {
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

  const apiMessages = useMemo(
    () => messages.filter((message) => message.content.trim().length > 0),
    [messages],
  );

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="chat-widget">
      {isOpen ? (
        <section className="chat-panel" aria-label="Digital Twin chat">
          <div className="chat-panel-header">
            <div>
              <span className="chat-status">Online</span>
              <h2>Ask Vinny&apos;s Digital Twin</h2>
            </div>
            <button
              aria-label="Close chat"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>

          <div className="chat-window" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "assistant" ? "Digital Twin" : "You"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading ? (
              <div className="chat-message assistant">
                <span>Digital Twin</span>
                <p>Thinking...</p>
              </div>
            ) : null}
          </div>

          <div className="starter-questions" aria-label="Suggested questions">
            {starterQuestions.map((question) => (
              <button
                disabled={isLoading}
                key={question}
                onClick={() => void sendMessage(question)}
                type="button"
              >
                {question}
              </button>
            ))}
          </div>

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
        </section>
      ) : null}

      <button
        aria-expanded={isOpen}
        aria-label="Open Digital Twin chat"
        className="chat-launcher"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="chat-launcher-orb">AI</span>
        <span>
          <strong>Ask Digital Twin</strong>
          <em>Career chat</em>
        </span>
      </button>
    </div>
  );
}
