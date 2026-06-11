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

      <aside className="hero-card" aria-label="Professional highlights">
        <p className="eyebrow">Current Role</p>
        <h2>Renewable Innovations</h2>
        <p>
          Building reliable full-stack software with React, Spring Boot, Java,
          Python, and modern data tools.
        </p>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
