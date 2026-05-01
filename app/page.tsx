"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type EducationItem = {
  label: string;
  title: string;
  org: string;
};

type CareerItem = {
  period: string;
  title: string;
  org: string;
};

type TypewriterLine = {
  text: string;
  italic?: boolean;
  compact?: boolean;
};

const eduItems: EducationItem[] = [
  { label: "Foundation", title: "Secondary Education", org: "Isipathana College, Colombo 05" },
  { label: "Specialization", title: "Diploma in Credit Management", org: "IBSL, Sri Lanka" },
  { label: "Growth", title: "MBA (Pursuing)", org: "Asia e University, 2025-" },
];

const careerTimeline: CareerItem[] = [
  { period: "2008-2009", title: "Business Development Officer", org: "Nations Trust Bank" },
  { period: "2009-2010", title: "Senior Business Dev. Officer", org: "Nations Trust Bank" },
  { period: "2010-2011", title: "Account Relationship Officer", org: "Thalawathugoda Branch" },
  { period: "2011-2015", title: "Senior Account Rel. Officer", org: "Thalawathugoda Branch" },
  { period: "2015-2017", title: "Senior Overseas Rel. Officer", org: "Qatar" },
  { period: "2017-2019", title: "Senior Account Rel. Officer", org: "Battaramulla Branch" },
  { period: "2019-2023", title: "Deputy Manager - Business Banking", org: "Cinnamon Gardens" },
  { period: "2023", title: "Deputy Manager - Business Banking", org: "Banking Services Div." },
  { period: "2024", title: "Deputy Manager - Business Banking", org: "Union Place Branch" },
  { period: "2024-Nov 2025", title: "Deputy Manager - Business Banking", org: "Kollupitiya Branch" },
  { period: "Nov 2025-Present", title: "Relationship Manager", org: "Sampath Bank" },
];

const heroHeadlineLines: TypewriterLine[] = [
  { text: "Rasika Nilnuwan" },
  { text: "Kekulawela" },
  { text: "Relationship Manager - Sampath Bank", italic: true, compact: true },
  { text: "Based in Sri Lanka", compact: true },
];

type HeroStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const heroStats: HeroStat[] = [
  { label: "Years of Experience", value: 17, suffix: "+", duration: 1200 },
  { label: "Client Satisfaction", value: 100, suffix: "%", duration: 1150 },
  { label: "Clients Managed", value: 100, prefix: "+", duration: 1300 },
  { label: "Career Since", value: 2008, duration: 1450 },
];

const linkedInUrl = "https://www.linkedin.com/in/rasika-kekulawela-6b9453113?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

function TypewriterHeading({
  lines,
  className,
  style,
}: {
  lines: ReadonlyArray<TypewriterLine>;
  className?: string;
  style?: CSSProperties;
}) {
  let delay = 180;

  return (
    <span className={className} style={style}>
      {lines.map((line) => {
        const lineDelay = delay;
        const duration = Math.max(line.text.length * 42, 640);
        delay += duration + 160;

        const content = line.italic ? <em style={{ fontWeight: 400 }}>{line.text}</em> : line.text;

        return (
          <span key={line.text} className="block">
            <span
              className="typewriter-line"
              style={{
                fontSize: line.compact ? "clamp(1.02rem, 2.1vw, 1.45rem)" : undefined,
                lineHeight: line.compact ? 1.45 : undefined,
                animation: `typewriter-reveal ${duration}ms steps(${Math.max(line.text.length, 1)}, end) ${lineDelay}ms forwards`,
              }}
            >
              {content}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function AnimatedStatValue({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  className,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const element = valueRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setShouldAnimate(true);
        observer.disconnect();
      },
      {
        threshold: 0.55,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let animationFrame = 0;
    let startTime: number | undefined;

    const step = (timestamp: number) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, shouldAnimate, value]);

  return (
    <span ref={valueRef} className={className} style={style}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// â”€â”€â”€ SKILL CIRCLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SkillCircle({
  label,
  pct,
  icon,
  className = "",
  style,
}: {
  label: string;
  pct: number;
  icon: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const r = 36;
  const c = 44;
  const circ = 2 * Math.PI * r;
  const fill = (pct / 100) * circ;
  return (
    <div className={className} style={style}>
      <div className="relative transition-transform duration-300 ease-out" style={{ width: 88, height: 88 }}>
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
          <circle cx={c} cy={c} r={r} stroke="#e8e8e8" strokeWidth="5" />
          <circle
            cx={c}
            cy={c}
            r={r}
            stroke="#111111"
            strokeWidth="5"
            strokeDasharray={`${fill} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${c} ${c})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[#111]">{icon}</div>
      </div>
      <p className="text-xl font-bold text-[#111]">{pct}%</p>
      <p
        className="text-center leading-snug"
        style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999" }}
      >
        {label}
      </p>
    </div>
  );
}

// â”€â”€â”€ PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Home() {
  const currentRole = careerTimeline[careerTimeline.length - 1];
  const previousRoles = careerTimeline.slice(0, -1);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-up, .reveal-soft")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const revealClass = "reveal-up";
  const softRevealClass = "reveal-soft";
  const revealStyle = (delay: number, duration = 560): CSSProperties => ({
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  });
  const statClass =
    "border-t border-black/10 pt-5 pb-2 transition duration-300 hover:border-black/30";
  const iconButtonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-transparent transition duration-300 hover:bg-black hover:text-white hover:border-black";
  const linkPillClass =
    "inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-transparent px-4 py-2.5 transition duration-300 hover:bg-black hover:text-white hover:border-black";

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-white text-[#111111]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(17,17,17,0.03),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(17,17,17,0.02),transparent_18%)]" />

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <nav className={`${softRevealClass} fixed top-0 inset-x-0 z-50 h-14 border-b border-[#eeeeee] bg-white/88 backdrop-blur-md`} style={revealStyle(60, 1000)}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between gap-3">

          {/* Left links */}
          <div className="flex-1 hidden md:flex items-center gap-7">
            {(["About", "Experience", "Contact"] as const).map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111] transition-opacity hover:opacity-50"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Center mark */}
          <div className="flex shrink-0 flex-col items-center">
            <div
              className="flex items-center justify-center mb-0.5"
              style={{ width: 30, height: 30, border: "1.5px solid #111" }}
            >
              <span className="text-[11px] font-bold tracking-tight">R</span>
            </div>
            <span className="text-center text-[7px] font-bold tracking-[0.14em] uppercase text-[#111] min-[420px]:text-[8px] min-[420px]:tracking-[0.18em]">
              RASIKA KEKULAWELA
            </span>
          </div>

          {/* Right icons */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hidden items-center gap-2.5 rounded-full border border-black/10 bg-transparent px-4 py-2.5 text-[#111] transition duration-300 hover:border-black hover:bg-black hover:text-white md:inline-flex"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A1.49 1.49 0 1 1 5 6.48 1.49 1.49 0 0 1 4.98 3.5ZM3.5 8h3V20h-3V8Zm5 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V20h-3v-6.02c0-1.44-.02-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V20h-3V8Z" />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">LinkedIn</span>
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={`${iconButtonClass} h-9 w-9 text-[#111] md:hidden sm:h-10 sm:w-10`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A1.49 1.49 0 1 1 5 6.48 1.49 1.49 0 0 1 4.98 3.5ZM3.5 8h3V20h-3V8Zm5 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V20h-3v-6.02c0-1.44-.02-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V20h-3V8Z" />
              </svg>
            </a>
            <a href="mailto:rasikekulawela@gmail.com" aria-label="Email" className={`${iconButtonClass} h-9 w-9 text-[#111] sm:h-10 sm:w-10`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
              </svg>
            </a>
            <a href="tel:+94777284911" aria-label="Phone" className={`${iconButtonClass} h-9 w-9 text-[#111] sm:h-10 sm:w-10`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5 19.79 19.79 0 01.22 4.71 2 2 0 012.2 2.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.56-1.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>

        </div>
      </nav>

      {/* â”€â”€ HERO â”€â”€ */}
      <section id="about" className="pt-14">

        {/* Large serif heading — centered */}
        <div className={`${revealClass} max-w-4xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-6 sm:pb-10 text-center`} style={revealStyle(120)}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, 'Times New Roman', serif",
              fontWeight: 600,
              fontSize: "clamp(1.45rem, 6.2vw, 2.9rem)",
              lineHeight: 1.2,
              color: "#111",
            }}
          >
            <TypewriterHeading lines={heroHeadlineLines} />
          </h1>
        </div>
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8 pb-16">

          {/* Desktop */}
          <div
            className="hidden md:grid"
            style={{ gridTemplateColumns: "minmax(0, 1.1fr) 320px minmax(0, 0.92fr)", gap: "56px", alignItems: "center" }}
          >
            {/* LEFT */}
            <div className="justify-self-start space-y-6 pr-4 md:-ml-6 lg:-ml-10">
              <div className={`${revealClass} border-b border-[#e9e6df] pb-6`} style={revealStyle(180)}>
                <p className="text-[#999] mb-3 uppercase tracking-[0.2em]" style={{ fontSize: "9px" }}>Biography</p>
                <p className="text-[13px] text-[#555] leading-relaxed">
                  Work for clients and build long-term financial relationships. I&apos;m Rasika, a Business
                  Banking professional based in Sri Lanka, currently serving as a Relationship Manager at
                  Sampath Bank with deep experience in SME portfolio management and corporate finance.
                </p>
              </div>
              <div className={`${revealClass} border-b border-[#e9e6df] pb-6`} style={revealStyle(260)}>
                <p className="text-[#999] mb-3 uppercase tracking-[0.2em]" style={{ fontSize: "9px" }}>Contact</p>
                <div className="space-y-1 text-[13px] text-[#555]">
                  <p>Colombo 5, Sri Lanka</p>
                  <a href="mailto:rasikekulawela@gmail.com" className="block hover:text-[#111] transition-colors">rasikekulawela@gmail.com</a>
                  <a href="tel:+94777284911" className="block hover:text-[#111] transition-colors">+94 777 284 911</a>
                  <a href={linkedInUrl} target="_blank" rel="noreferrer" className={`${linkPillClass} mt-3 text-[#111]`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5A1.49 1.49 0 1 1 5 6.48 1.49 1.49 0 0 1 4.98 3.5ZM3.5 8h3V20h-3V8Zm5 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V20h-3v-6.02c0-1.44-.02-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V20h-3V8Z" />
                    </svg>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <div className={`${revealClass} pb-1`} style={revealStyle(340)}>
                <p className="text-[#999] mb-3 uppercase tracking-[0.2em]" style={{ fontSize: "9px" }}>Services</p>
                <div className="space-y-1 text-[13px] text-[#555]">
                  <p>Business Banking</p>
                  <p>SME Portfolio Management</p>
                  <p>Corporate Financial Solutions</p>
                  <p>Credit Facility Management</p>
                </div>
              </div>
            </div>

            {/* CENTER: oval photo */}
            <div className={`${revealClass} relative flex justify-center`} style={revealStyle(260, 900)}>
              <div className="absolute inset-x-5 top-6 bottom-6 rounded-full blur-3xl transition-transform duration-700 hover:scale-105" style={{ background: "radial-gradient(circle at 50% 35%, rgba(17, 17, 17, 0.09), rgba(17, 17, 17, 0) 70%)" }} />
              <div
                className="relative"
                style={{
                  flexShrink: 0,
                }}
              >
                <div
                  className="outline outline-1 outline-black/8"
                  style={{
                    width: "280px",
                    height: "380px",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Image
                    src="/profile-picture-1.png"
                    alt="Rasika Nilnuwan Kekulawela"
                    fill
                    sizes="280px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: stats */}
            <div className="justify-self-end space-y-0 text-right" style={{ width: "min(100%, 210px)" }}>
              {heroStats.map((s, index) => (
                <div key={s.label} className={`${statClass} ${revealClass} flex min-h-[102px] flex-col items-end justify-end ${index === 0 ? "border-t-0 pt-0" : ""}`} style={revealStyle(220 + index * 90)}>
                  <p
                    className="text-[#999] uppercase mb-1"
                    style={{ fontSize: "9px", letterSpacing: "0.2em", lineHeight: 1.5 }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "2.6rem",
                      fontWeight: 600,
                      lineHeight: 1,
                      color: "#111",
                    }}
                  >
                    <AnimatedStatValue
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={s.duration}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className={`${revealClass} md:hidden space-y-8`} style={revealStyle(160)}>
            <div className="mx-auto w-[240px]">
              <div
                className="outline outline-1 outline-black/8"
                style={{
                  width: "240px",
                  height: "320px",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Image src="/profile-picture-1.png" alt="Rasika Nilnuwan Kekulawela" fill sizes="240px" className="object-cover object-top" priority />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 min-[460px]:grid-cols-2 sm:gap-x-5 sm:gap-y-6">
              {heroStats.map((s, index) => (
                <div key={s.label} className={`${statClass} ${revealClass} ${index === 0 ? "border-t-0 pt-0" : ""}`} style={revealStyle(220 + index * 90)}>
                  <p className="text-[#999] text-[9px] uppercase tracking-[0.2em] mb-1">{s.label}</p>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#111" }}>
                    <AnimatedStatValue
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={s.duration}
                    />
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-1 border-t border-[#e9e6df] pt-5 text-[13px] text-[#555]">
              <p>Colombo 5, Sri Lanka</p>
              <a href="mailto:rasikekulawela@gmail.com" className="block">rasikekulawela@gmail.com</a>
              <a href="tel:+94777284911" className="block">+94 777 284 911</a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer" className={`${linkPillClass} mt-3 w-full justify-center text-[#111] min-[420px]:w-auto`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5A1.49 1.49 0 1 1 5 6.48 1.49 1.49 0 0 1 4.98 3.5ZM3.5 8h3V20h-3V8Zm5 0h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V20h-3v-6.02c0-1.44-.02-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V20h-3V8Z" />
                </svg>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">LinkedIn Profile</span>
              </a>
            </div>
            <div className="border-t border-[#e9e6df] pt-5">
              <p className="mb-3 text-[#999] uppercase tracking-[0.2em]" style={{ fontSize: "9px" }}>Biography</p>
              <p className="text-[13px] leading-relaxed text-[#555]">
                Rasika is a business banking professional focused on long-term client relationships, SME portfolio growth, and practical financial solutions.
              </p>
            </div>
            <div className="border-t border-[#e9e6df] pt-5">
              <p className="mb-3 text-[#999] uppercase tracking-[0.2em]" style={{ fontSize: "9px" }}>Services</p>
              <div className="grid grid-cols-1 gap-y-2 text-[13px] text-[#555] min-[420px]:grid-cols-2 min-[420px]:gap-x-4">
                <p>Business Banking</p>
                <p>SME Portfolio Management</p>
                <p>Corporate Financial Solutions</p>
                <p>Credit Facility Management</p>
              </div>
            </div>
          </div>

        </div>

        {/* Association strip */}
        <div className="border-t border-[#eeeeee]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 sm:py-5">
            <div className={`${softRevealClass} flex items-center justify-center gap-x-5 gap-y-3 py-3 sm:gap-8 sm:py-4 flex-wrap`} style={revealStyle(420, 1000)}>
              {["Sampath Bank", "Nations Trust Bank", "IBSL", "Relationship Management", "SME Portfolio"].map((item) => (
                <span
                  key={item}
                  className="font-semibold text-[#cccccc] transition-colors hover:text-[#777777]"
                  style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* â”€â”€ MY ADVANTAGE â”€â”€ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <h2
            className={`${revealClass} text-center mb-12 sm:mb-14`}
            style={{ ...revealStyle(120), fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.75rem", fontWeight: 500, color: "#111" }}
          >
            My Advantage
          </h2>
          <div className="flex justify-center gap-x-8 gap-y-10 sm:gap-x-20 sm:gap-y-12 flex-wrap">
            <SkillCircle
              label="Credit Management"
              pct={95}
              className={`${revealClass} flex min-w-[150px] flex-col items-center gap-3 text-center sm:min-w-[180px]`}
              style={revealStyle(200)}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              }
            />
            <SkillCircle
              label="Portfolio Management"
              pct={92}
              className={`${revealClass} flex min-w-[150px] flex-col items-center gap-3 text-center sm:min-w-[180px]`}
              style={revealStyle(280)}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              }
            />
            <SkillCircle
              label="Client Relations"
              pct={98}
              className={`${revealClass} flex min-w-[150px] flex-col items-center gap-3 text-center sm:min-w-[180px]`}
              style={revealStyle(360)}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      <div className="border-t border-[#eeeeee]" />

      {/* â”€â”€ EDUCATION & EXPERIENCE â”€â”€ */}
      <section id="experience" className="scroll-mt-14 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className={`${revealClass} max-w-3xl`} style={revealStyle(120)}>
            <p className="mb-4 text-[#999] uppercase" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
              Career Journey
            </p>
            <h2
              className="mb-5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 3rem)", fontStyle: "italic", fontWeight: 400, color: "#111", lineHeight: 1.08 }}
            >
              Education and
              <br />
              professional experience.
            </h2>
            <p className="text-[14px] leading-relaxed text-[#666]">
              Structured around academic grounding, career progression, and the relationship-led banking experience built across Sri Lanka and overseas roles.
            </p>
          </div>

          <div className={`${revealClass} mt-10 sm:mt-12 grid gap-5 border-y border-[#e9e6df] py-6 md:grid-cols-3 sm:gap-6`} style={revealStyle(180)}>
            <div>
              <p className="mb-2 text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>Current Role</p>
              <p className="text-[15px] font-semibold text-[#111]">{currentRole.title}</p>
              <p className="mt-1 text-[13px] text-[#777]">{currentRole.org} · {currentRole.period}</p>
            </div>
            <div>
              <p className="mb-2 text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>Career Span</p>
              <p className="text-[15px] font-semibold text-[#111]">2008 - Present</p>
              <p className="mt-1 text-[13px] text-[#777]">17+ years across business development, SME portfolios, and business banking.</p>
            </div>
            <div>
              <p className="mb-2 text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>Core Focus</p>
              <p className="text-[15px] font-semibold text-[#111]">Relationship-led growth</p>
              <p className="mt-1 text-[13px] text-[#777]">Client retention, credit-backed strategy, and portfolio expansion for modern banking teams.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-12 sm:mt-12 sm:gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:gap-16">
            <div className={`${revealClass}`} style={revealStyle(220)}>
              <div className="border-t border-[#e9e6df] pt-6">
                <p className="mb-6 text-[#999] uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em" }}>
                  Education
                </p>
                <div className="space-y-6">
                  {eduItems.map((item) => (
                    <div key={item.title} className="border-b border-[#f1eee8] pb-6 last:border-b-0 last:pb-0">
                      <p className="mb-2 text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>
                        {item.label}
                      </p>
                      <p className="text-[15px] font-semibold leading-snug text-[#111]">{item.title}</p>
                      <p className="mt-1 text-[13px] text-[#777]">{item.org}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${revealClass}`} style={revealStyle(280)}>
              <div className="border-t border-[#e9e6df] pt-6">
                <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-start">
                  <div>
                    <p className="text-[#999] uppercase" style={{ fontSize: "10px", letterSpacing: "0.16em" }}>
                      Professional Experience
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#777]">
                      From entry-level development roles to relationship management and business banking leadership.
                    </p>
                  </div>
                  <div>
                    <div className="border-b border-[#e9e6df] pb-6">
                      <p className="mb-2 text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>
                        Current Appointment
                      </p>
                      <div className="grid gap-3 sm:grid-cols-[130px_1fr] sm:gap-5">
                        <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>
                          {currentRole.period}
                        </p>
                        <div>
                          <p className="text-[15px] font-semibold leading-snug text-[#111]">{currentRole.title}</p>
                          <p className="mt-1 text-[13px] text-[#777]">{currentRole.org}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      {previousRoles.map((item) => (
                        <div key={`${item.period}-${item.title}`} className="grid gap-3 border-b border-[#f1eee8] py-5 sm:grid-cols-[130px_1fr] sm:gap-5">
                          <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>
                            {item.period}
                          </p>
                          <div>
                            <p className="text-[15px] font-semibold leading-snug text-[#111]">{item.title}</p>
                            <p className="mt-1 text-[13px] text-[#777]">{item.org}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-[#eeeeee]" />
        </div>
      </section>

      {/* â”€â”€ MY LATEST WORK â”€â”€ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <h2
            className={`${revealClass} text-center mb-12`}
            style={{ ...revealStyle(120), fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", fontWeight: 500, color: "#111" }}
          >
            My Latest Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: "/profile-picture-2.jpeg", alt: "Nations Trust Bank Branch Team", cat: "Team Photo", title: "Branch Team - Nations Trust Bank" },
              { src: "/profile-picture-3.jpeg", alt: "Nations Trust Bank Private Banking Team", cat: "Team Photo", title: "Private Banking Team - Nations Trust Bank" },
            ].map((item, index) => (
              <div key={item.src} className={`${revealClass} group`} style={revealStyle(180 + index * 100)}>
                <div className="relative overflow-hidden rounded-[24px]" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4">
                  <p className="text-[#999]" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.cat}</p>
                  <p className="text-[14px] font-semibold text-[#111] mt-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FOOTER / CONTACT â”€â”€ */}
      <footer id="contact" className="scroll-mt-14 border-t border-[#eeeeee] pt-16 sm:pt-20 pb-10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">

          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.9fr] gap-14 md:gap-16 mb-14 items-start">
            <div className={`${revealClass}`} style={revealStyle(160)}>
              <p className="mb-5 text-[#999] uppercase" style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
                Open for meaningful conversations
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#111",
                  lineHeight: 1.08,
                  marginBottom: "18px",
                }}
              >
                Let&apos;s shape stronger
                <br />
                financial relationships.
              </h3>
              <p className="max-w-xl text-[14px] leading-relaxed text-[#666]">
                Available for relationship-led banking, portfolio growth, and strategic client development across modern financial teams.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="mailto:rasikekulawela@gmail.com" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#111] transition-colors hover:text-[#666]">
                  Email
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="tel:+94777284911" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#111] transition-colors hover:text-[#666]">
                  Call
                  <span aria-hidden="true">↗</span>
                </a>
                <a href={linkedInUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#111] transition-colors hover:text-[#666]">
                  LinkedIn
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className={`${revealClass} md:pl-12`} style={revealStyle(220)}>
              <div className="grid grid-cols-1 gap-1 border-t border-[#e9e6df] py-4 sm:grid-cols-[96px_1fr] sm:gap-4">
                <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>Base</p>
                <p className="text-[14px] leading-relaxed text-[#111]">Colombo 5, Sri Lanka</p>
              </div>
              <div className="grid grid-cols-1 gap-1 border-t border-[#e9e6df] py-4 sm:grid-cols-[96px_1fr] sm:gap-4">
                <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>Email</p>
                <a href="mailto:rasikekulawela@gmail.com" className="text-[14px] text-[#111] transition-colors hover:text-[#666]">rasikekulawela@gmail.com</a>
              </div>
              <div className="grid grid-cols-1 gap-1 border-t border-[#e9e6df] py-4 sm:grid-cols-[96px_1fr] sm:gap-4">
                <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>Phone</p>
                <a href="tel:+94777284911" className="text-[14px] text-[#111] transition-colors hover:text-[#666]">(+94) 777 284 911</a>
              </div>
              <div className="grid grid-cols-1 gap-1 border-y border-[#e9e6df] py-4 sm:grid-cols-[96px_1fr] sm:gap-4">
                <p className="text-[#999] uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>Profile</p>
                <a href={linkedInUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[14px] text-[#111] transition-colors hover:text-[#666]">
                  LinkedIn Profile
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className={`${softRevealClass} border-t border-[#eeeeee] pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left`} style={revealStyle(300, 720)}>
            <div className="flex items-center gap-4 text-center md:text-left">
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: "#111" }}>
                Rasika
              </span>
              <span className="hidden md:inline-block text-[#c2beb6]" style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Relationship Manager, Sampath Bank
              </span>
            </div>
            <div className="flex gap-4 sm:gap-7 flex-wrap justify-center">
              {(["About", "Experience", "Contact"] as const).map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-[#111] transition-colors"
                  style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#999" }}
                >
                  {l}
                </a>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#bbb" }}>© 2025. All Rights Reserved</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
