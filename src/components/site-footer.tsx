import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/o-nas", label: "O nás" },
  { to: "/zapojte-se", label: "Zapojte se" },
  { to: "/zapojte-se", label: "Podpořte nás" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[88rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-5 py-8 md:grid-cols-3 md:px-6">
        <div className="min-w-0">
          <p className="font-display text-xl font-bold text-white">Jedním Hlasem</p>
          <p className="mt-1 text-xs text-primary-foreground/70">
            Fakta, kontext a klidný tón do debaty o Izraeli.
          </p>
        </div>


        <nav className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:col-span-1 md:justify-center">
          {LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center gap-4">
              {i > 0 ? <span className="h-4 w-px bg-primary-foreground/35" /> : null}
              <Link to={l.to} className="text-primary-foreground/85 hover:text-white">
                {l.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex justify-end">
          <a href="https://x.com" aria-label="Jedním Hlasem na X" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" aria-hidden className="size-7" fill="currentColor">
              <path d="M18.9 2H22l-6.8 7.8L23 22h-6.4l-5-6.5L5.8 22H2.7l7.3-8.3L1.5 2H8l4.5 6 6.4-6Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto max-w-[88rem] px-5 py-4 text-xs text-primary-foreground/70 md:px-6">
          © {new Date().getFullYear()} Jedním Hlasem — komunitní projekt.
        </div>
      </div>
    </footer>
  );
}
