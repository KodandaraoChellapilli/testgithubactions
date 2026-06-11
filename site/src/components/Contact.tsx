import { profile, profileLinks } from "../data/profile";
import { SectionTitle } from "./SectionTitle";

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <SectionTitle eyebrow="Profiles" title="Let's connect." />

      <div className="profile-links">
        {profileLinks.map((link) => (
          <a
            className="profile-link"
            href={link.href}
            key={link.label}
            target={link.href === "#" ? undefined : "_blank"}
            rel={link.href === "#" ? undefined : "noreferrer"}
          >
            <span>{link.note}</span>
            <strong>{link.label}</strong>
          </a>
        ))}
      </div>

      <div className="contact-card">
        <h2>Have an opportunity or project?</h2>
        <p>Send a message and I&apos;ll get back to you.</p>
        <div className="actions">
          <a className="button primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="button secondary" href={`tel:+1${profile.phone.replaceAll("-", "")}`}>
            {profile.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
