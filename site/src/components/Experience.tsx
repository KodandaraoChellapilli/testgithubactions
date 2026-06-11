import { education, experience } from "../data/profile";
import { SectionTitle } from "./SectionTitle";

export function Experience() {
  return (
    <section className="section" id="experience">
      <SectionTitle eyebrow="Experience" title="Career journey." />

      <div className="timeline">
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
      </div>

      <div className="education-card">
        <p className="eyebrow">Education</p>
        {education.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}
