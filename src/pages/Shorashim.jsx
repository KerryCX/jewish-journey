// src/pages/Shorashim.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categories, rootBySlug, colorForSlug } from "../data/shorashim";

/**
 * Shorashim (Hebrew roots) overview page.
 * Groups common three-letter roots by core meaning, each linking to its
 * own page at /shorashim/:slug (one page per root, showing every form
 * of that root found across the siddur, cross-referenced back to Tefillot).
 *
 * Root data (Hebrew, transliteration, meaning, example, detail,
 * talmudDetail) lives in src/data/shorashim.js — this file and
 * RootDetail.jsx both read from that same source rather than keeping
 * their own copies.
 *
 * Talmud mode isn't a toggle — it's simply what desktop widths show.
 * Mobile always gets the normal bubble grid with links to each root's own
 * page. On desktop, clicking a root bubble opens a commentary-style card
 * with its full detail in one of eight positions ringing the centre
 * (clockwise, replacing the earliest-filled once all eight are taken)
 * instead of navigating away — echoing the way Rashi and Tosafot flank a
 * page of Gemara.
 */

// Margin-card preview text is meant to stay short — this is a safeguard in
// case a talmudDetail ever runs long, not the primary way length gets
// controlled (that should happen when the content is written).
const TALMUD_DETAIL_MAX_LENGTH = 150;

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function RootBubble({ root, color, talmudOn, isOpen, onToggle }) {
  if (talmudOn) {
    // Talmud mode: just the Hebrew, no bubble shape — the bubble treatment
    // is reserved for the detail card that appears in the margin once
    // clicked.
    return (
      <li className='list-none'>
        <button
          type='button'
          onClick={() => onToggle(root.slug)}
          aria-pressed={isOpen}
          className={`rounded px-1 py-0.5 text-xl font-medium transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 ${
            color.text
          } ${isOpen ? "underline" : ""}`}
          dir='rtl'
          lang='he'
        >
          {root.hebrew}
          <span className='sr-only'>
            {" "}
            — {isOpen ? "hide" : "show"} this root's detail in the margin
          </span>
        </button>
      </li>
    );
  }

  const bubbleClasses = `flex flex-col items-center gap-1 rounded-2xl border px-4 py-3 text-center no-underline transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 ${color.bubble}`;

  return (
    <li className='list-none'>
      <Link
        to={`/shorashim/${root.slug}`}
        title={
          root.example
            ? `e.g. ${root.example.translit} — "${root.example.gloss}"`
            : undefined
        }
        className={bubbleClasses}
      >
        <span className='text-lg' dir='rtl' lang='he'>
          {root.hebrew}
        </span>
        <span className='text-xs font-medium'>{root.translit}</span>
        <span className='text-xs opacity-80'>{root.meaning}</span>
        <span className='sr-only'> — view every form of this root in the siddur</span>
      </Link>
    </li>
  );
}

function MarginCard({ root, color, onClose }) {
  return (
    <Link
      to={`/shorashim/${root.slug}`}
      className={`block h-full rounded-lg border p-4 text-left no-underline shadow-sm transition hover:shadow-md ${color.bubble}`}
    >
      <div className='flex items-start justify-between gap-2'>
        <span className='text-xl' dir='rtl' lang='he'>
          {root.hebrew}
        </span>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          aria-label={`Close ${root.translit}`}
          className='text-xs opacity-60 hover:opacity-100'
        >
          ✕
        </button>
      </div>
      <p className='mt-1 text-sm font-medium'>{root.translit}</p>
      <p className='mt-2 text-sm'>{root.meaning}</p>
      {root.talmudDetail && (
        <p className='mt-3 text-xs leading-relaxed opacity-80'>
          {truncate(root.talmudDetail, TALMUD_DETAIL_MAX_LENGTH)}
        </p>
      )}
      {root.example && (
        <div className='mt-3 border-t border-current/20 pt-3'>
          <p className='text-xs opacity-70'>Example</p>
          <p className='mt-1 text-sm' dir='rtl' lang='he'>
            {root.example.hebrew}
          </p>
          <p className='mt-1 text-xs opacity-80'>
            {root.example.translit} — "{root.example.gloss}"
          </p>
        </div>
      )}
    </Link>
  );
}

// Four boxes, pinwheeling clockwise around the centre — each one a
// rectangle spanning two grid cells, its inner edge running flush along
// the centre column:
//   top:    top row,    centre column → right edge
//   right:  right col,  middle row → bottom edge
//   bottom: bottom row, left edge → centre column
//   left:   left col,   top row → middle row
// New roots fill in this order; once all four are taken, the next click
// overwrites whichever was filled first, then the second, and so on.
const RING_POSITIONS = ["top", "right", "bottom", "left"];

export default function Shorashim() {
  // Talmud mode isn't a manual toggle — it's simply what desktop widths
  // show. Mobile always gets the normal bubble/card view. This mirrors
  // Tailwind's `sm` breakpoint (640px) so it lines up with the CSS.
  const [talmudOn, setTalmudOn] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
  );

  // `bySlot` maps a ring position to whichever root slug currently occupies
  // it. `next` is a rotating cursor into RING_POSITIONS: it only advances
  // when a genuinely new root is opened, so replacement always proceeds in
  // the same clockwise order regardless of what's been closed manually.
  const [ring, setRing] = useState({ bySlot: {}, next: 0 });

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const handleChange = (e) => setTalmudOn(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const toggleRoot = (slug) => {
    setRing((prev) => {
      const openPosition = Object.keys(prev.bySlot).find(
        (pos) => prev.bySlot[pos] === slug
      );
      // Already open — close it, freeing that position without touching
      // the rotation cursor.
      if (openPosition) {
        const bySlot = { ...prev.bySlot };
        delete bySlot[openPosition];
        return { ...prev, bySlot };
      }
      // Not open — claim the next position in clockwise order, evicting
      // whatever (if anything) was already sitting there.
      const position = RING_POSITIONS[prev.next % RING_POSITIONS.length];
      return {
        bySlot: { ...prev.bySlot, [position]: slug },
        next: prev.next + 1,
      };
    });
  };

  const isRootOpen = (slug) => Object.values(ring.bySlot).includes(slug);

  const renderSlot = (position) => {
    const slug = ring.bySlot[position];
    if (!slug) {
      return <div className='h-full rounded-lg border border-dashed border-line' />;
    }
    return (
      <MarginCard
        root={rootBySlug[slug]}
        color={colorForSlug[slug]}
        onClose={() => toggleRoot(slug)}
      />
    );
  };

  const centerContent = (
    <div className='text-left'>
      {!talmudOn && (
        <div className='rounded-lg border border-line bg-surface p-4'>
          <p className='text-sm leading-relaxed text-ink-soft'>
            Most Hebrew words build outward from a three-letter root. The
            roots below appear hundreds, sometimes thousands, of times
            across the Tanach and the siddur, so mastering even a small
            selection means you'll start recognizing them everywhere. Tap a
            root to see every form of it that appears in the prayers, with
            links back to where each one is used.
          </p>
        </div>
      )}

      {talmudOn ? (
        <div className='space-y-2 text-center'>
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className='text-lg font-medium text-ink'>
                {category.title}
              </h2>
              <ul className='flex flex-wrap justify-center gap-x-3 gap-y-0'>
                {category.roots.map((root) => (
                  <RootBubble
                    key={root.slug}
                    root={root}
                    color={colorForSlug[root.slug]}
                    talmudOn={talmudOn}
                    isOpen={isRootOpen(root.slug)}
                    onToggle={toggleRoot}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {categories.map((category) => (
            <section
              key={category.title}
              className='rounded-lg border border-line bg-surface p-4'
            >
              <h2 className='mb-3 flex items-center gap-2 text-lg font-medium text-ink'>
                <span aria-hidden='true'>{category.emoji}</span>
                {category.title}
              </h2>
              <ul className='flex flex-wrap gap-3'>
                {category.roots.map((root) => (
                  <RootBubble
                    key={root.slug}
                    root={root}
                    color={colorForSlug[root.slug]}
                    talmudOn={talmudOn}
                    isOpen={isRootOpen(root.slug)}
                    onToggle={toggleRoot}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {!talmudOn && (
        <section className='mt-4 rounded-lg border border-line bg-surface p-4'>
          <h2 className='mb-2 flex items-center gap-2 text-lg font-medium text-ink'>
            <span aria-hidden='true'>💡</span>
            Spotting the root in a word
          </h2>
          <p className='mb-3 text-sm leading-relaxed text-ink-soft'>
            A word is rarely just its root. Prefixes and suffixes get added
            for tense, pronoun, and number, so a word can look longer and
            less familiar than the three-letter root underneath. To find
            it, mentally strip away:
          </p>
          <ol className='list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft'>
            <li>
              <span className='text-ink'>Pronoun prefixes:</span>{" "}
              <span dir='rtl' lang='he'>י</span> (he),{" "}
              <span dir='rtl' lang='he'>ת</span> (you/she),{" "}
              <span dir='rtl' lang='he'>א</span> (I),{" "}
              <span dir='rtl' lang='he'>נ</span> (we)
            </li>
            <li>
              <span className='text-ink'>Grammatical prefixes:</span>{" "}
              <span dir='rtl' lang='he'>ה</span> (the, or causative),{" "}
              <span dir='rtl' lang='he'>ו</span> (and),{" "}
              <span dir='rtl' lang='he'>ב</span> (in),{" "}
              <span dir='rtl' lang='he'>כ</span> (like),{" "}
              <span dir='rtl' lang='he'>ל</span> (to),{" "}
              <span dir='rtl' lang='he'>מ</span> (from)
            </li>
            <li>
              <span className='text-ink'>Suffixes:</span>{" "}
              <span dir='rtl' lang='he'>וֹת</span> /{" "}
              <span dir='rtl' lang='he'>ִים</span> (plurals),{" "}
              <span dir='rtl' lang='he'>ָה</span> /{" "}
              <span dir='rtl' lang='he'>וֹ</span> /{" "}
              <span dir='rtl' lang='he'>ךָ</span> (possessive endings, e.g.
              "her", "his", "your")
            </li>
          </ol>
        </section>
      )}
    </div>
  );

  return (
    <main
      className={`text-center ${
        talmudOn
          ? "flex h-full flex-col overflow-hidden px-4 md:px-8"
          : "mx-auto max-w-6xl px-4"
      }`}
    >
      {talmudOn ? (
        <div className='flex min-h-0 flex-1 items-center justify-center overflow-hidden'>
          {/*
            Entrance animation: same spiral-in used on the individual root
            pages, staggered clockwise (centre settles first, then top →
            right → bottom → left). Runs once on load, including for the
            empty dashed placeholder boxes — since these wrapper divs stay
            mounted across re-renders, filling a box later (clicking a
            bubble) swaps its inner content without re-triggering the
            animation. motion-safe: skips it entirely for anyone with
            reduced-motion enabled.
          */}
          <style>{`
            @keyframes spiral-in {
              from {
                opacity: 0;
                transform: scale(0.82) rotate(-8deg);
              }
              to {
                opacity: 1;
                transform: scale(1) rotate(0deg);
              }
            }
          `}</style>
          <div
            className='grid max-h-full gap-3 transition-all duration-300 ease-in-out'
            style={{
              gridTemplateAreas: '"left top top" "left center right" "bottom bottom right"',
              gridTemplateColumns: "minmax(160px, 220px) minmax(300px, 560px) minmax(160px, 220px)",
              gridTemplateRows: "minmax(140px, auto) 1fr minmax(140px, auto)",
            }}
          >
            {RING_POSITIONS.map((position) => (
              <div
                key={position}
                style={{
                  gridArea: position,
                  animationDelay: `${(RING_POSITIONS.indexOf(position) + 1) * 120}ms`,
                }}
                className='h-full overflow-y-auto motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
              >
                {renderSlot(position)}
              </div>
            ))}
            <div
              style={{ gridArea: "center", animationDelay: "0ms" }}
              className='px-1 motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
            >
              {centerContent}
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-8'>{centerContent}</div>
      )}
    </main>
  );
}
