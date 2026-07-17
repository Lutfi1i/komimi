import Link from "next/link";

const EXPLORE_LINKS = [
  { label: "Manga", href: "/genre/manga" },
  { label: "Manhwa", href: "/genre/manhwa" },
  { label: "Manhua", href: "/genre/manhua" },
  { label: "Rilisan Terbaru", href: "/latest" },
];

const INFO_LINKS = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Kontak", href: "/contact" },
  { label: "Kebijakan Privasi", href: "/privacy" },
  { label: "Syarat & Ketentuan", href: "/terms" },
];

const SOCIALS = [
  { label: "Discord", icon: "ti-brand-discord", href: "#" },
  { label: "Twitter", icon: "ti-brand-x", href: "#" },
  { label: "Instagram", icon: "ti-brand-instagram", href: "#" },
];

function MascotLogo() {
  return (
    <svg className="w-7 h-7 text-[#ff6740] fill-current drop-shadow-[0_0_4px_rgba(255,103,64,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(255,103,64,0.75)] transition-all duration-300" viewBox="0 0 24 24">
      <path d="M12 3c-1.2 0-2.4.3-3.5.9L5.2 2.1C4.8 1.8 4.2 2 4 2.5c-.2.5 0 1.1.5 1.3l2.5 1.5C5.2 6.7 4 8.7 4 11c0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.3-1.2-4.3-3-5.7l2.5-1.5c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.2-.4l-3.3 1.9C14.4 3.3 13.2 3 12 3zm-3.5 9c-.8 0-1.5-.7-1.5-1.5S7.7 9 8.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm7 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-ink border-t border-white/10 overflow-hidden">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff6740] via-gold to-[#ff6740]" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 select-none group">
            <MascotLogo />
            <span className="text-[20px] text-white font-black tracking-tight leading-none group-hover:text-[#ff6740] transition-colors">
              Kumimi
            </span>
          </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[220px]">
              Tempat baca manga, manhwa, dan manhua favorit kamu. Update tiap hari, tanpa drama.
            </p>
            <div className="flex items-center gap-2 mt-1">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-white/10 text-white/50 hover:text-gold hover:border-gold/40 transition-colors"
                  >
                    <i className={`ti ${s.icon} text-base`} />
                  </a>
                ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Jelajahi
            </h3>
            <ul className="flex flex-col gap-2">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Informasi
            </h3>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / disclaimer */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Status
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Server Online
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed">
              Semua konten milik pemilik hak cipta masing-masing. Kumimi hanya menyediakan akses baca.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Kumimi. Dibuat dengan{" "}
            <i className="ti ti-heart-filled text-gold text-[10px] align-middle" /> untuk pembaca komik.
          </p>
          <p className="text-[11px] text-white/20 font-mono">
            v1.0 · localhost
          </p>
        </div>
      </div>
    </footer>
  );
}