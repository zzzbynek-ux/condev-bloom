import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold text-foreground">
            Jedním<span className="text-primary">Hlasem</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Občanská komunita, která vrací do debaty o Izraeli a antisemitismu fakta,
            kontext a klidný tón. Píšeme, ověřujeme a pomáháme lidem reagovat.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Obsah</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/clanky" className="text-foreground/80 hover:text-primary">
              Články
            </Link>
            <Link to="/temata" className="text-foreground/80 hover:text-primary">
              Témata
            </Link>
            <Link to="/o-nas" className="text-foreground/80 hover:text-primary">
              O nás
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Zapojte se</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/zapojte-se" className="text-foreground/80 hover:text-primary">
              Nahlaste incident
            </Link>
            <Link to="/zapojte-se" className="text-foreground/80 hover:text-primary">
              WhatsApp komunita
            </Link>
            <Link to="/zapojte-se" className="text-foreground/80 hover:text-primary">
              Podpořte nás
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} JednímHlasem — komunitní projekt.
        </div>
      </div>
    </footer>
  );
}
