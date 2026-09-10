// src/pages/Shorashim.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shorashim (Hebrew roots) overview page.
 * Groups common three-letter roots by core meaning, each linking to its
 * own page at /shorashim/:slug (one page per root, showing every form
 * of that root found across the siddur, cross-referenced back to Tefillot).
 *
 * Transliteration convention: kh = soft kaf, c = hard kaf/kaf-dagesh,
 * k = reserved for kuf.
 *
 * Talmud mode isn't a toggle — it's simply what desktop widths show.
 * Mobile always gets the normal bubble grid with links to each root's own
 * page. On desktop, clicking a root bubble opens a commentary-style card
 * with its full detail in one of eight positions ringing the centre
 * (clockwise, replacing the earliest-filled once all eight are taken)
 * instead of navigating away — echoing the way Rashi and Tosafot flank a
 * page of Gemara.
 */

const categories = [
  {
    title: "Movement & direction",
    emoji: "🚶",
    roots: [
      {
        slug: "hlk",
        hebrew: "ה.ל.ך",
        translit: "halakh",
        meaning: "to walk, go",
        example: { hebrew: "לֶךְ־לְךָ", translit: "lech-lecha", gloss: "go forth" },
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      },
      {
        slug: "bwa",
        hebrew: "ב.ו.א",
        translit: "bo",
        meaning: "to come, enter",
        example: { hebrew: "וַיָּבֹא", translit: "vayavo", gloss: "and he came" },
      },
      {
        slug: "ytza",
        hebrew: "י.צ.א",
        translit: "yatza",
        meaning: "to go out, exit",
        example: { hebrew: "יְצִיאַת מִצְרַיִם", translit: "yetziat mitzrayim", gloss: "the Exodus from Egypt" },
      },
      {
        slug: "alh",
        hebrew: "ע.ל.ה",
        translit: "alah",
        meaning: "to go up, ascend",
        example: { hebrew: "עֲלִיָּה", translit: "aliyah", gloss: "going up to the Torah, or to the Land" },
      },
      {
        slug: "yrd",
        hebrew: "י.ר.ד",
        translit: "yarad",
        meaning: "to go down, descend",
        example: null,
      },
      {
        slug: "shwv",
        hebrew: "ש.ו.ב",
        translit: "shuv",
        meaning: "to return, repent",
        example: { hebrew: "תְּשׁוּבָה", translit: "teshuvah", gloss: "return, repentance" },
      },
    ],
  },
  {
    title: "Communication & mind",
    emoji: "🗣️",
    roots: [
      {
        slug: "amr",
        hebrew: "א.מ.ר",
        translit: "amar",
        meaning: "to say, speak",
        example: { hebrew: "וַיֹּאמֶר", translit: "vayomer", gloss: "and he said" },
      },
      {
        slug: "dvr",
        hebrew: "ד.ב.ר",
        translit: "davar",
        meaning: "to speak, talk",
        example: { hebrew: "דְּבַר ה׳", translit: "d'var Adonai", gloss: "word of God" },
      },
      {
        slug: "kra",
        hebrew: "ק.ר.א",
        translit: "kara",
        meaning: "to call, read, summon",
        example: { hebrew: "וַיִּקְרָא", translit: "vayikra", gloss: "and He called" },
      },
      {
        slug: "shma",
        hebrew: "ש.מ.ע",
        translit: "shama",
        meaning: "to hear, listen, obey",
        example: { hebrew: "שְׁמַע יִשְׂרָאֵל", translit: "Shema Yisrael", gloss: "Hear, O Israel" },
      },
      {
        slug: "yda",
        hebrew: "י.ד.ע",
        translit: "yada",
        meaning: "to know",
        example: null,
      },
      {
        slug: "rah",
        hebrew: "ר.א.ה",
        translit: "ra'ah",
        meaning: "to see",
        example: { hebrew: "וַיַּרְא", translit: "vayar", gloss: "and he saw" },
      },
    ],
  },
  {
    title: "Action & existence",
    emoji: "🛠️",
    roots: [
      {
        slug: "ash",
        hebrew: "ע.ש.ה",
        translit: "asah",
        meaning: "to do, make",
        example: { hebrew: "מַעֲשֶׂה", translit: "ma'aseh", gloss: "deed, action" },
      },
      {
        slug: "hyh",
        hebrew: "ה.י.ה",
        translit: "hayah",
        meaning: "to be, exist",
        example: null,
      },
      {
        slug: "ntn",
        hebrew: "נ.ת.ן",
        translit: "natan",
        meaning: "to give",
        example: { hebrew: "מַתָּנָה", translit: "matanah", gloss: "gift" },
      },
      {
        slug: "lkch",
        hebrew: "ל.ק.ח",
        translit: "lakach",
        meaning: "to take, receive",
        example: null,
      },
      {
        slug: "shlch",
        hebrew: "ש.ל.ח",
        translit: "shalach",
        meaning: "to send",
        example: { hebrew: "שָׁלִיחַ", translit: "shaliach", gloss: "emissary, messenger" },
      },
    ],
  },
  {
    title: "God, sanctuary & society",
    emoji: "👑",
    roots: [
      {
        slug: "kdsh",
        hebrew: "ק.ד.ש",
        translit: "kadash",
        meaning: "to be holy, sanctify",
        example: { hebrew: "מִקְדָּשׁ", translit: "mikdash", gloss: "sanctuary" },
      },
      {
        slug: "tzvh",
        hebrew: "צ.ו.ה",
        translit: "tzivah",
        meaning: "to command",
        example: { hebrew: "מִצְוָה", translit: "mitzvah", gloss: "commandment" },
      },
      {
        slug: "brkh",
        hebrew: "ב.ר.ך",
        translit: "barakh",
        meaning: "to bless",
        example: { hebrew: "בְּרָכָה", translit: "berakhah", gloss: "blessing" },
      },
      {
        slug: "mlkh",
        hebrew: "מ.ל.ך",
        translit: "malakh",
        meaning: "to rule, reign",
        example: { hebrew: "מַלְכוּת", translit: "malkhut", gloss: "kingdom" },
      },
      {
        slug: "yshv",
        hebrew: "י.ש.ב",
        translit: "yashav",
        meaning: "to sit, dwell, settle",
        example: { hebrew: "יִשּׁוּב", translit: "yishuv", gloss: "settlement" },
      },
    ],
  },
];

// Flattened once so bubbles and margin cards can share the same colour per
// root, regardless of which mode is drawing them.
const allRoots = categories.flatMap((c) => c.roots);

const rainbow = [
  { bubble: "bg-red-100 border-red-300 text-red-900", text: "text-red-700" },
  { bubble: "bg-orange-100 border-orange-300 text-orange-900", text: "text-orange-700" },
  { bubble: "bg-amber-100 border-amber-300 text-amber-900", text: "text-amber-700" },
  { bubble: "bg-green-100 border-green-300 text-green-900", text: "text-green-700" },
  { bubble: "bg-teal-100 border-teal-300 text-teal-900", text: "text-teal-700" },
  { bubble: "bg-blue-100 border-blue-300 text-blue-900", text: "text-blue-700" },
  { bubble: "bg-violet-100 border-violet-300 text-violet-900", text: "text-violet-700" },
];
const colorForSlug = {};
allRoots.forEach((r, i) => {
  colorForSlug[r.slug] = rainbow[i % rainbow.length];
});

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
    <div className={`rounded-lg border p-4 text-left shadow-sm ${color.bubble}`}>
      <div className='flex items-start justify-between gap-2'>
        <span className='text-xl' dir='rtl' lang='he'>
          {root.hebrew}
        </span>
        <button
          type='button'
          onClick={onClose}
          aria-label={`Close ${root.translit}`}
          className='text-xs opacity-60 hover:opacity-100'
        >
          ✕
        </button>
      </div>
      <p className='mt-1 text-sm font-medium'>{root.translit}</p>
      <p className='mt-2 text-sm'>{root.meaning}</p>
      {root.detail && (
        <p className='mt-3 text-xs leading-relaxed opacity-80'>{root.detail}</p>
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
    </div>
  );
}

// The eight positions a margin card can occupy, in clockwise order starting
// from top-left. New roots fill the ring in this order; once all eight are
// taken, the next click overwrites whichever position is next in sequence
// (so the first-filled goes, then the second, and so on).
const RING_POSITIONS = [
  "top-left",
  "top",
  "top-right",
  "right",
  "bottom-right",
  "bottom",
  "bottom-left",
  "left",
];

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

  const rootBySlug = Object.fromEntries(allRoots.map((r) => [r.slug, r]));

  const renderSlot = (position) => {
    const slug = ring.bySlot[position];
    if (!slug) return null;
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
        <div className='mt-4 space-y-6'>
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className='mb-2 text-lg font-medium text-ink'>
                {category.title}
              </h2>
              <ul className='flex flex-wrap gap-x-4 gap-y-2'>
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

      <p className='mt-4 mb-8 text-sm text-ink-soft'>
        Want to practice? Pick a line from any Tefillah and see how many of
        these roots you can spot in it.
      </p>
    </div>
  );

  return (
    <main
      className={`text-center ${
        talmudOn
          ? "flex h-screen flex-col overflow-hidden px-4 md:px-8"
          : "mx-auto max-w-6xl px-4"
      }`}
    >
      <div className={talmudOn ? "shrink-0" : undefined}>
        <h1 className='text-xl font-bold text-ink'>Shorashim</h1>
        <p className='mt-1 text-sm text-ink-soft'>Roots</p>
      </div>

      {talmudOn ? (
        <div className='flex min-h-0 flex-1 items-center justify-center overflow-hidden'>
          <div
            className='grid max-h-full gap-3'
            style={{
              gridTemplateAreas:
                '"top-left top top-right" "left center right" "bottom-left bottom bottom-right"',
              gridTemplateColumns: "minmax(160px, 220px) minmax(300px, 560px) minmax(160px, 220px)",
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            {RING_POSITIONS.map((position) => (
              <div
                key={position}
                style={{ gridArea: position }}
                className='max-h-[26vh] overflow-y-auto'
              >
                {renderSlot(position)}
              </div>
            ))}
            <div
              style={{ gridArea: "center" }}
              className='max-h-[48vh] overflow-y-auto px-1'
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
