import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/o-nas", label: "O nás" },

  { to: "/podporte-nas", label: "Podpořte nás" },
] as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.098 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.653c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.098 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.4l-5-6.5L5.8 22H2.7l7.3-8.3L1.5 2H8l4.5 6 6.4-6Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[88rem] flex-col items-center gap-5 px-5 py-8 lg:grid lg:grid-cols-3 lg:items-center lg:gap-6 lg:px-6">
        <div className="lg:justify-self-start">
          <Link to="/" className="inline-block" aria-label="JednímHlasem — domů">
            <img
              src="/images/logo-bublina.png"
              alt="JednímHlasem"
              width={140}
              height={109}
              className="h-12 w-auto md:h-14"
            />
          </Link>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          {LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center gap-4">
              {i > 0 ? <span className="h-4 w-px bg-primary-foreground/35" /> : null}
              <Link to={l.to} className="text-primary-foreground/85 hover:text-white">
                {l.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-2 lg:justify-end">
          <a href="https://www.facebook.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Facebooku" title="JednímHlasem na Facebooku" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10">
            <FacebookIcon className="size-4" />
          </a>
          <a href="https://www.instagram.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na Instagramu" title="JednímHlasem na Instagramu" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10">
            <InstagramIcon className="size-4" />
          </a>
          <a href="https://x.com/JednimHlasem" target="_blank" rel="noreferrer" aria-label="JednímHlasem na X" title="JednímHlasem na X" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:border-primary-foreground hover:bg-primary-foreground/10">
            <XIcon className="size-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-4 text-xs text-primary-foreground/85 md:px-6">
          <span>© {new Date().getFullYear()} JednímHlasem</span>
          <Link to="/ochrana-osobnich-udaju" className="hover:text-white">
            Ochrana osobních údajů
          </Link>
        </div>
      </div>
    </footer>
  );
}
