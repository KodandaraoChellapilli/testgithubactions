import { highlights, profile, skills } from "../data/profile";
import { SectionTitle } from "./SectionTitle";

export function About() {
  return (
    <section className="section" id="about">
      <SectionTitle eyebrow="About" title="Simple, focused software engineering." />

      <div className="about-grid">
        <div className="about-copy">
          <p>
            I am a software engineer based in {profile.location}. I enjoy
            building applications that are easy to use, easy to maintain, and
            strong enough for real teams.
          </p>
          <p>
            My background includes full-stack development, data, AI/ML, and
            teaching. That mix helps me build clearly and communicate clearly.
          </p>
        </div>

        <div className="skill-list" aria-label="Technical skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="highlight-grid">
        {highlights.map((highlight) => (
          <article className="card" key={highlight.title}>
            <h3>{highlight.title}</h3>
            <p>{highlight.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
