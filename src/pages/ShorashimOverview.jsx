// src/pages/Shorashim.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shorashim (Hebrew roots) overview page.
 * Groups common three-letter roots by core meaning, each linking to its
 * own page at /shorashim/:slug (one page per root, showing every form
 * of that root found across the siddur, cross-referenced back to Tefillot).
 *
 * Transliteration convention: kh = soft kaf, c = hard kaf/kaf-dagesh,
 * k = reserved for kuf.
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

// Cycled across all roots in render order so neighbouring bubbles land on
// different hues, roughly following the colour spectrum.
const rainbow = [
  "bg-red-100 border-red-300 text-red-900",
  "bg-orange-100 border-orange-300 text-orange-900",
  "bg-amber-100 border-amber-300 text-amber-900",
  "bg-green-100 border-green-300 text-green-900",
  "bg-teal-100 border-teal-300 text-teal-900",
  "bg-blue-100 border-blue-300 text-blue-900",
  "bg-violet-100 border-violet-300 text-violet-900",
];

const neutralBubble = "bg-surface border-line text-ink";

function RootBubble({ root, colorClasses }) {
  return (
    <li className='list-none'>
      <Link
        to={`/shorashim/${root.slug}`}
        title={
          root.example
            ? `e.g. ${root.example.translit} — "${root.example.gloss}"`
            : undefined
        }
        className={`flex flex-col items-center gap-1 rounded-2xl border px-4 py-3 text-center no-underline transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 ${colorClasses}`}
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

export default function Shorashim() {
  // Rainbow bubbles are the default everywhere. The toggle to switch them
  // off is desktop-only (see the button's `hidden sm:inline-flex` below),
  // so on mobile this stays true and the control never renders.
  const [rainbowOn, setRainbowOn] = useState(true);

  // A single counter running across every root on the page, so the colour
  // cycle continues smoothly from one category into the next rather than
  // restarting (and clashing) at the top of each card.
  let colorIndex = 0;

  return (
    <main className='text-center'>
      <h1 className='text-xl font-bold text-ink'>Shorashim</h1>
      <p className='mt-1 text-sm text-ink-soft'>Roots</p>

      <button
        type='button'
        onClick={() => setRainbowOn((on) => !on)}
        aria-pressed={rainbowOn}
        className='mt-4 hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-ink-soft sm:inline-flex'
      >
        <span aria-hidden='true'>🌈</span>
        {rainbowOn ? "Rainbow mode on" : "Rainbow mode off"}
      </button>

      <div className='mt-8 rounded-lg border border-line bg-surface p-4 text-left'>
        <p className='text-sm leading-relaxed text-ink-soft'>
          Most Hebrew words build outward from a three-letter root. The
          roots below appear hundreds, sometimes thousands, of times across
          the Tanach and the siddur, so mastering even a small selection
          means you'll start recognizing them everywhere. Tap a root to see
          every form of it that appears in the prayers, with links back to
          where each one is used.
        </p>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-4 text-left sm:grid-cols-2'>
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
              {category.roots.map((root) => {
                const colorClasses = rainbow[colorIndex % rainbow.length];
                colorIndex += 1;
                return (
                  <RootBubble
                    key={root.slug}
                    root={root}
                    colorClasses={rainbowOn ? colorClasses : neutralBubble}
                  />
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <section className='mt-4 rounded-lg border border-line bg-surface p-4 text-left'>
        <h2 className='mb-2 flex items-center gap-2 text-lg font-medium text-ink'>
          <span aria-hidden='true'>💡</span>
          Spotting the root in a word
        </h2>
        <p className='mb-3 text-sm leading-relaxed text-ink-soft'>
          A word is rarely just its root. Prefixes and suffixes get added
          for tense, pronoun, and number, so a word can look longer and less
          familiar than the three-letter root underneath. To find it,
          mentally strip away:
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

      <p className='mt-4 mb-8 text-sm text-ink-soft'>
        Want to practice? Pick a line from any Tefillah and see how many of
        these roots you can spot in it.
      </p>
    </main>
  );
}
