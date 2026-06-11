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
