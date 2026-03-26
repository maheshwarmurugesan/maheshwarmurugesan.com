"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── data ── */
const deepCuts = [
  {
    name: "Ruflo",
    url: "https://github.com/ruvnet/ruflo",
    tag: "Agents",
    desc: "Enterprise AI agent orchestration platform for Claude Code. 60+ specialized agents, coordinated swarms, self-learning capabilities, fault-tolerant consensus (Byzantine, Raft, Gossip, CRDT), and 259 MCP tools.",
    use: "Portco eng teams can deploy agent swarms that handle refactors, security audits, and test generation in parallel.",
  },
  {
    name: "MiroFish",
    url: "https://github.com/666ghj/MiroFish",
    tag: "Prediction",
    desc: "Swarm intelligence prediction engine. Creates thousands of AI agents with independent personalities, long-term memory, and behavior logic, then simulates how they interact to predict real-world outcomes. Upload seed material, describe your prediction need, get back a report and an interactive digital world.",
    use: "A growth team could simulate how stakeholders react to a policy change or product launch before committing resources.",
  },
  {
    name: "Scrapling",
    url: "https://github.com/D4Vinci/Scrapling",
    tag: "Scraping",
    desc: "State of the art adaptive web scraping framework. The parser learns from website changes and automatically relocates elements when pages update. Fetchers bypass Cloudflare Turnstile out of the box. Spider framework scales to concurrent, multi-session crawls with pause/resume and automatic proxy rotation.",
    use: "Portco data teams can build scrapers that survive site redesigns and scale to full crawls without constant selector maintenance.",
  },
  {
    name: "New Theory",
    url: "https://www.newtheory.ai/",
    tag: "Research",
    desc: "Building foundation models that break neural scaling laws. Next-generation frontier AI built on new mathematical principles from neuroscience and geometric deep learning. Team of mathematicians, neuroscientists, and engineers from UC Berkeley and the University of Amsterdam.",
    use: "On the radar for any partner evaluating next-gen AI infrastructure bets beyond transformers.",
  },
  {
    name: "Nox RPLY",
    url: "https://www.heynox.com/",
    tag: "Messaging",
    desc: "One inbox for iMessage, WhatsApp, Slack, email, and more on macOS. Learns your voice across every conversation. Replies come pre-written. Semantic search across all platforms. Every conversation ranked by urgency and context.",
    use: "Execs managing dozens of founder relationships can have RPLY surface what needs attention and pre-draft replies.",
  },
];

const stack = [
  {
    name: "Pencil",
    url: "https://pencil.dev/",
    tag: "Design",
    desc: "Agent-driven design tool. Figma-like canvas directly in your development environment. AI agents draw components, load UI kits, apply styles, and arrange layouts via MCP. Design on canvas, land in code. Works with Claude Code, Cursor, and Windsurf.",
    use: "Portco teams can go from a text prompt to a fully editable visual prototype that converts into production code.",
  },
  {
    name: "AIDA",
    url: "https://www.knowbe4.com/products/aida",
    tag: "Security",
    desc: "AI Defense Agents from KnowBe4. Suite of AI-powered agents for phishing simulation and security awareness training. Generates realistic attack vectors, custom deepfake training content, and personalized security awareness campaigns tailored to each employee\u2019s risk profile.",
    use: "Portco security teams can run continuous AI-generated phishing simulations and awareness training personalized per employee.",
  },
  {
    name: "Exo",
    url: "https://github.com/exo-explore/exo",
    tag: "Infra",
    desc: "Run frontier AI locally. Connects all your devices into an AI cluster. Automatic device discovery, RDMA over Thunderbolt with 99% latency reduction, topology-aware auto parallel. Tensor parallelism for up to 3.2x speedup on 4 devices. Compatible with OpenAI, Claude, and Ollama APIs.",
    use: "A research team could cluster Mac Studios and run models locally for sensitive analysis without external APIs.",
  },
  {
    name: "Prism",
    url: "https://prism.co/",
    tag: "Finance",
    desc: "Loans secured by startup equity. Liquidity for founders, employees, and investors with no personal recourse. Up to $100M with up to 30% LTV. Backed by founders of Brex, Flexport, Scale AI, and Pipe.",
    use: "Portco founders and early employees sitting on illiquid equity can access cash without selling shares.",
  },
  {
    name: "Amp",
    url: "https://ampcode.com/",
    tag: "Coding Agent",
    desc: "Frontier coding agent from Sourcegraph. Autonomous reasoning, sub-agent parallelization, unconstrained token usage. VS Code extension and CLI. Multi-model by default with latest models from OpenAI, Anthropic, and Google.",
    use: "A lead engineer can hand Amp a multi-repo refactor and it spawns sub-agents to handle code, tests, and docs in parallel.",
  },
  {
    name: "Warp",
    url: "https://warp.dev/",
    tag: "Terminal",
    desc: "Terminal for building with agents. Run a team of agents from Warp\u2019s agent Oz to Claude Code, Codex, and Gemini CLI. Ranked #1 on Terminal-Bench. Multi-model, optimized for multi-repo changes. Trusted by over 500,000 engineers.",
    use: "New engineers onboarding at portcos can use Warp\u2019s AI agent to learn CLI tools and navigate codebases in real time.",
  },
  {
    name: "GSAP",
    url: "https://gsap.com/",
    tag: "Animation",
    desc: "Professional JavaScript animation library. Animate anything JS can touch. ScrollTrigger, SVG, text, and UI interaction plugins. Now free for everyone thanks to Webflow. Shopify used GSAP for their Winter \u201926 Edition site (the Renaissance Edition with 150+ features and interactive scroll animations).",
    use: "Portco design teams can add scroll-triggered animations to launch sites without a separate motion studio.",
  },
];

const daily = [
  {
    name: "Poke",
    url: "https://poke.com/",
    tag: "Assistant",
    desc: "AI assistant inside iMessage, WhatsApp, and SMS. Connects to email, calendar, and files. Surfaces important messages and handles tasks through one-tap text replies. $15M seed led by General Catalyst. Built by the team that won Elon Musk\u2019s Not-a-Boring Competition.",
    use: "A partner between board meetings can have Poke surface key emails, reschedule a conflict, and draft a follow-up via text.",
  },
  {
    name: "WisprFlow / SuperWhisper",
    url: "https://wisprflow.ai/",
    tag: "Voice",
    desc: "Voice-to-text AI that turns speech into polished writing in every app. 4x faster than typing. AI auto-edits clean up filler words and typos. Personal dictionary learns your words. Different tones per app. Mac, Windows, iPhone, Android. SuperWhisper is a solid alternative for fully offline, on-device processing on macOS.",
    use: "Analysts writing deal memos can dictate directly into Notion or Docs at 4x typing speed.",
  },
  {
    name: "Granola",
    url: "https://granola.ai/",
    tag: "Notes",
    desc: "AI notepad for people in back-to-back meetings. Transcribes your computer\u2019s audio directly, no meeting bots. When the meeting ends, Granola enhances the notes you\u2019ve written. Customizable templates for discovery calls, interviews, or 1-on-1s. Raised $125M Series C at a $1.5B valuation.",
    use: "Walk out of a pitch with a structured summary, flagged concerns, and follow-ups ready for the CRM.",
  },
  {
    name: "Atlas",
    url: "https://atlas.so/",
    tag: "Support",
    desc: "AI for customer support. Autopilot responds to users instantly with multi-step actions across any channel. Copilot gives agents on-brand drafts with sources. Knowledge management auto-generates articles from tickets, chats, and SOPs. Unified inbox with session recordings.",
    use: "Early portcos scaling fast can consolidate all support channels into Atlas and let Autopilot handle first-pass resolution.",
  },
  {
    name: "Beeper",
    url: "https://www.beeper.com/",
    tag: "Messaging",
    desc: "All your messaging apps in one inbox. WhatsApp, Signal, Telegram, Slack, Instagram, and more. Acquired by Automattic in 2024, relaunched in 2025 with on-device AI.",
    use: "An operating partner talking to founders across five platforms can see every thread in one place.",
  },
  {
    name: "WHOOP & 8Sleep",
    url: "https://www.whoop.com/",
    tag: "Wellness",
    desc: "WHOOP tracks strain, recovery, and sleep quality. 8Sleep controls bed temperature all night. Together they\u2019ve changed how I rest and train.",
    use: "Any exec on a high-output schedule can know when to push and when to pull back.",
  },
  {
    name: "Cursor",
    url: "https://cursor.com/",
    tag: "Editor",
    desc: "AI-first code editor, a fork of VS Code. Inline generation, codebase-aware chat, multi-file edits.",
    use: "Portco eng teams see immediate velocity gains on boilerplate, tests, and codebase navigation.",
  },
  {
    name: "Raycast",
    url: "https://www.raycast.com/",
    tag: "Launcher",
    desc: "Productivity tools in an extendable launcher. Clipboard history, snippets, quicklinks, hotkeys, window management, thousands of extensions. Built-in AI across the OS.",
    use: "Anyone on the team can search Notion, pull CRM records, convert timezones, and manage snippets without opening a browser.",
  },
  {
    name: "Nugget",
    url: "https://github.com/leminlimez/Nugget",
    tag: "iOS",
    desc: "Customize your iPhone without jailbreaking. Animated wallpapers, disable daemons, enable hidden features. Works on iOS 17.0 through 26.1 using Sparserestore and BookRestore exploits. Open source, 6.3k GitHub stars.",
    use: "Personalize your device, enable hidden iOS features, and tweak system behavior.",
  },
];

/* ── star field ── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let W: number, H: number;
    let stars: {
      x: number;
      y: number;
      r: number;
      phase: number;
      speed: number;
      driftX: number;
      driftY: number;
      gold: boolean;
    }[] = [];
    let raf: number;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      c!.width = W * dpr;
      c!.height = H * dpr;
      c!.style.width = W + "px";
      c!.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < 90; i++) {
        const g = Math.random() < 0.55;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: g ? Math.random() * 1.3 + 0.5 : Math.random() * 0.7 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.004,
          driftX: (Math.random() - 0.5) * 0.035,
          driftY: (Math.random() - 0.5) * 0.015,
          gold: g,
        });
      }
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(s.phase + t * s.speed);
        const a = 0.1 + 0.6 * tw;
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -5) s.x = W + 5;
        if (s.x > W + 5) s.x = -5;
        if (s.y < -5) s.y = H + 5;
        if (s.y > H + 5) s.y = -5;
        if (s.gold) {
          const gl = s.r * 3.5 * (0.5 + 0.5 * tw);
          const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, gl);
          gr.addColorStop(0, `rgba(240,214,138,${a * 0.85})`);
          gr.addColorStop(0.35, `rgba(212,168,75,${a * 0.3})`);
          gr.addColorStop(1, `rgba(212,168,75,0)`);
          ctx.fillStyle = gr;
          ctx.beginPath();
          ctx.arc(s.x, s.y, gl, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(255,240,195,${a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * (0.5 + 0.5 * tw), 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(237,228,212,${a * 0.3})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* ── entry component ── */
function Entry({
  num,
  name,
  url,
  tag,
  desc,
  use,
}: {
  num: number;
  name: string;
  url: string;
  tag: string;
  desc: string;
  use: string;
}) {
  return (
    <div
      className="a16z-entry"
      style={{
        padding: "2.4rem 0",
        borderBottom: "1px solid rgba(212,168,75,.15)",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: ".85rem",
          fontWeight: 500,
          color: "#a07a34",
          marginBottom: ".6rem",
        }}
      >
        {String(num).padStart(2, "0")}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: ".7rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.5rem,3.2vw,2.1rem)",
            fontWeight: 500,
          }}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener"
            style={{
              color: "#6cacf0",
              textDecoration: "underline",
              textDecorationColor: "rgba(108,172,240,.4)",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1px",
              transition: "color .25s, text-shadow .3s, text-decoration-color .25s",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.color = "#9dc4f8";
              t.style.textShadow =
                "0 0 14px rgba(108,172,240,.35), 0 0 30px rgba(108,172,240,.15)";
              t.style.textDecorationColor = "rgba(108,172,240,.7)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.color = "#6cacf0";
              t.style.textShadow = "none";
              t.style.textDecorationColor = "rgba(108,172,240,.4)";
            }}
          >
            {name}
          </a>
        </div>
        <span className="a16z-arrow" style={{ fontSize: ".85rem", color: "#6cacf0", opacity: 0, transition: "opacity .25s, transform .25s", transform: "translateX(-4px)" }}>
          ↗
        </span>
        <span
          style={{
            fontSize: ".6rem",
            fontWeight: 500,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#d4a84b",
            background: "rgba(212,168,75,.1)",
            border: "1px solid rgba(212,168,75,.25)",
            padding: ".2rem .6rem",
            borderRadius: "2px",
          }}
        >
          {tag}
        </span>
      </div>
      <p
        style={{
          marginTop: ".5rem",
          fontSize: ".9rem",
          fontWeight: 300,
          color: "#fff",
          lineHeight: 1.7,
          maxWidth: "720px",
        }}
      >
        {desc}
      </p>
      <p
        style={{
          marginTop: ".6rem",
          fontSize: ".82rem",
          fontWeight: 400,
          lineHeight: 1.6,
          maxWidth: "720px",
          paddingLeft: ".8rem",
          borderLeft: "2px solid rgba(212,168,75,.3)",
          background: "linear-gradient(135deg, #f5e5a0, #fff1c2, #f5e5a0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "brightness(1.1)",
        }}
      >
        {use}
      </p>
    </div>
  );
}

/* ── section header ── */
function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div
      className="a16z-section"
      style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 3rem 1rem" }}
    >
      <p
        className="a16z-section-label"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1rem,2vw,1.15rem)",
          fontWeight: 500,
          letterSpacing: ".25em",
          textTransform: "uppercase",
          color: "#d4a84b",
          marginBottom: ".6rem",
        }}
      >
        {label}
      </p>
      <h2
        className="a16z-section-title"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.8rem,4vw,2.6rem)",
          fontWeight: 400,
          color: "#fff",
          letterSpacing: "-.01em",
          marginBottom: ".5rem",
        }}
      >
        {title}
      </h2>
      <div
        className="a16z-section-line"
        style={{
          width: 60,
          height: 1,
          background: "linear-gradient(90deg,#d4a84b,transparent)",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />
    </div>
  );
}

/* ── main page ── */
export default function A16ZPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero entrance
      gsap.from(".a16z-presents", { opacity: 0, y: 30, duration: 1, delay: 0.2 });
      gsap.from(".a16z-hero-name", { opacity: 0, y: 40, duration: 1, delay: 0.4 });
      gsap.from(".a16z-blurb", { opacity: 0, y: 30, duration: 1, delay: 0.65 });
      gsap.from(".a16z-scroll-cue", { opacity: 0, y: 20, duration: 0.8, delay: 1.1 });

      // Scroll cue breathe animation (replaces CSS @keyframes breathe)
      gsap.to(".a16z-breathe-bar", {
        opacity: 0.9,
        scaleY: 1,
        duration: 1.25,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Plaque
      gsap.from(".a16z-plaque-wrap", {
        scrollTrigger: { trigger: ".a16z-plaque-wrap", start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });

      // Section headers
      document.querySelectorAll(".a16z-section").forEach((sec) => {
        const label = sec.querySelector(".a16z-section-label");
        const title = sec.querySelector(".a16z-section-title");
        const line = sec.querySelector(".a16z-section-line");
        if (label)
          gsap.from(label, {
            scrollTrigger: { trigger: sec, start: "top 80%" },
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: "power2.out",
          });
        if (title)
          gsap.from(title, {
            scrollTrigger: { trigger: sec, start: "top 80%" },
            opacity: 0,
            y: 25,
            duration: 0.7,
            delay: 0.1,
            ease: "power2.out",
          });
        if (line)
          gsap.from(line, {
            scrollTrigger: { trigger: sec, start: "top 80%" },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            delay: 0.25,
            ease: "power2.out",
          });
      });

      // Entry groups
      document.querySelectorAll(".a16z-entries").forEach((g) => {
        gsap.from(g.querySelectorAll(".a16z-entry"), {
          scrollTrigger: { trigger: g, start: "top 85%" },
          opacity: 0,
          y: 35,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        });
      });

      // Entry hover arrow (GSAP-driven)
      document.querySelectorAll(".a16z-entry").forEach((entry) => {
        const arrow = entry.querySelector(".a16z-arrow") as HTMLElement;
        if (!arrow) return;
        entry.addEventListener("mouseenter", () => {
          gsap.to(arrow, { opacity: 1, x: 0, duration: 0.25, overwrite: true });
        });
        entry.addEventListener("mouseleave", () => {
          gsap.to(arrow, { opacity: 0, x: -4, duration: 0.25, overwrite: true });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div
        ref={containerRef}
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background: "#1a0c10",
          color: "#fff",
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
          minHeight: "100vh",
        }}
      >
        <StarCanvas />

        {/* Noise overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Hero */}
          <section
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "2rem 3rem 4rem",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Hero radial bg */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(107,29,42,.2) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,168,75,.07) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <p
              className="a16z-presents"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(.9rem,1.8vw,1.2rem)",
                fontWeight: 400,
                letterSpacing: ".35em",
                textTransform: "uppercase",
                color: "#d4a84b",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              Mahesh Presents
            </p>
            <h1
              className="a16z-hero-name"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem,5.5vw,4.5rem)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-.02em",
                color: "#fff",
                padding: "0 1.5rem",
                position: "relative",
              }}
            >
              Tools for{" "}
              <em
                style={{
                  fontWeight: 400,
                  fontStyle: "italic",
                  display: "inline",
                  background: "linear-gradient(135deg,#d4a84b,#f5e5a0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                A16Z
              </em>
            </h1>
            <p
              className="a16z-blurb"
              style={{
                maxWidth: 560,
                fontSize: "clamp(.92rem,1.6vw,1.08rem)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "#f5f0ea",
                marginTop: "2.2rem",
                position: "relative",
              }}
            >
              This is a collection of tools I&apos;ve used in the last month and have
              been integrating into my lifestyle. I think you&apos;d find them
              interesting.
            </p>
            <div
              className="a16z-scroll-cue"
              style={{
                marginTop: "2.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".6rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: ".85rem",
                  fontWeight: 500,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#d4a84b",
                  opacity: 0.8,
                }}
              >
                Scroll for the sauce
              </span>
              <div
                className="a16z-breathe-bar"
                style={{
                  width: 1,
                  height: 40,
                  background: "linear-gradient(to bottom,#d4a84b,transparent)",
                  opacity: 0.25,
                  transform: "scaleY(0.7)",
                }}
              />
            </div>
          </section>

          {/* Plaque */}
          <div
            className="a16z-plaque-wrap"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "4rem 2rem 3rem",
            }}
          >
            <div
              style={{
                position: "relative",
                maxWidth: 440,
                textAlign: "center",
                padding: "1.5rem 2.4rem",
                borderRadius: 4,
                background:
                  "linear-gradient(145deg, rgba(212,168,75,.1), rgba(212,168,75,.04))",
                border: "1px solid rgba(212,168,75,.22)",
                boxShadow:
                  "0 0 40px rgba(212,168,75,.05), inset 0 1px 0 rgba(212,168,75,.15)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: ".8rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: ".55rem",
                  color: "#a07a34",
                  opacity: 0.6,
                }}
              >
                ✦
              </span>
              <span
                style={{
                  position: "absolute",
                  right: ".8rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: ".55rem",
                  color: "#a07a34",
                  opacity: 0.6,
                }}
              >
                ✦
              </span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: ".95rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#d4a84b",
                  lineHeight: 1.6,
                }}
              >
                You made hyperlinks blue.
              </p>
            </div>
          </div>

          {/* Deep Cuts */}
          <SectionHeader label="01" title="Deep Cuts" />
          <div
            className="a16z-entries"
            style={{ maxWidth: 960, margin: "0 auto", padding: "0 3rem 2rem" }}
          >
            {deepCuts.map((t, i) => (
              <Entry key={t.name} num={i + 1} {...t} />
            ))}
          </div>

          {/* The Stack */}
          <SectionHeader label="02" title="The Stack" />
          <div
            className="a16z-entries"
            style={{ maxWidth: 960, margin: "0 auto", padding: "0 3rem 2rem" }}
          >
            {stack.map((t, i) => (
              <Entry key={t.name} num={i + 1 + deepCuts.length} {...t} />
            ))}
          </div>

          {/* Daily Drivers */}
          <SectionHeader label="03" title="Personal Daily Drivers for Myself" />
          <div
            className="a16z-entries"
            style={{ maxWidth: 960, margin: "0 auto", padding: "0 3rem 2rem" }}
          >
            {daily.map((t, i) => (
              <Entry
                key={t.name}
                num={i + 1 + deepCuts.length + stack.length}
                {...t}
              />
            ))}
          </div>

          {/* Footer */}
          <footer
            style={{
              textAlign: "center",
              padding: "4rem 2rem 2.5rem",
              fontSize: ".72rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "#f5f0ea",
            }}
          >
            Curated by <span style={{ color: "#d4a84b" }}>Mahesh</span> · 2026
          </footer>
        </div>
      </div>
    </>
  );
}
