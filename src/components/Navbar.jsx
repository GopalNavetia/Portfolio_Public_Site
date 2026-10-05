import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ name }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = name || "Portfolio";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900"
          onClick={closeMenu}
        >
          {displayName}
        </a>
        <button
          type="button"
          className="rounded-md px-2 py-1 text-2xl leading-none text-slate-700 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              className="transition-colors hover:text-teal-600"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 px-4 pb-3 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              className="block py-3 text-sm font-medium text-slate-700 hover:text-teal-600"
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
