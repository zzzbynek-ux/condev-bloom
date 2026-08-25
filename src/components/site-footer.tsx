import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary-foreground/20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold text-white">
            Jedním<span className="text-white/90">Hlasem</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
            Občanská komunita, která vrací do debaty o Izraeli a antisemitismu fakta,
            kontext a klidný tón. Píšeme, ověřujeme a pomáháme lidem reagovat.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">Obsah</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/clanky" className="text-primary-foreground/80 hover:text-white">
              Články
            </Link>
            <Link to="/temata" className="text-primary-foreground/80 hover:text-white">
              Témata
            </Link>
            <Link to="/o-nas" className="text-primary-foreground/80 hover:text-white">
              O nás
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60">Zapojte se</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/zapojte-se" className="text-primary-foreground/80 hover:text-white">
              Nahlaste incident
            </Link>
            <Link to="/zapojte-se" className="text-primary-foreground/80 hover:text-white">
              WhatsApp komunita
            </Link>
            <Link to="/zapojte-se" className="text-primary-foreground/80 hover:text-white">
              Podpořte nás
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} JednímHlasem — komunitní projekt.
        </div>
      </div>
    </footer>
  );
}
