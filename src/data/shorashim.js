// src/data/shorashim.js
//
// Shared root data. Extracted here so both the Shorashim overview page and
// each individual root page (/shorashim/:slug) read from the same source
// instead of duplicating entries.
//
// Transliteration convention: kh = soft kaf, c = hard kaf/kaf-dagesh,
// k = reserved for kuf.

export const categories = [
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
        talmudDetail:
          "One of the most common roots in the siddur, appearing across blessings and Torah readings alike.",
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
        example: { hebrew: "מוֹרִיד הַגֶּשֶׁם", translit: "morid hageshem", gloss: "who makes the rain fall" },
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
        example: { hebrew: "דַּעַת", translit: "da'at", gloss: "knowledge" },
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
        example: { hebrew: "הָיָה הֹוֶה וְיִהְיֶה", translit: "hayah hoveh v'yihyeh", gloss: "He was, He is, and He will be" },
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
        example: { hebrew: "לֶקַח טוֹב", translit: "lekach tov", gloss: "a good teaching" },
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

// Flattened once so any page can look a root up without walking the
// category tree.
export const allRoots = categories.flatMap((c) => c.roots);

export const rootBySlug = Object.fromEntries(allRoots.map((r) => [r.slug, r]));

// Same rainbow palette used for the bubbles and margin cards on the
// overview page, kept here so a root's own page can match its colour.
export const rainbow = [
  { bubble: "bg-red-100 border-red-300 text-red-900", text: "text-red-700" },
  { bubble: "bg-orange-100 border-orange-300 text-orange-900", text: "text-orange-700" },
  { bubble: "bg-amber-100 border-amber-300 text-amber-900", text: "text-amber-700" },
  { bubble: "bg-green-100 border-green-300 text-green-900", text: "text-green-700" },
  { bubble: "bg-teal-100 border-teal-300 text-teal-900", text: "text-teal-700" },
  { bubble: "bg-blue-100 border-blue-300 text-blue-900", text: "text-blue-700" },
  { bubble: "bg-violet-100 border-violet-300 text-violet-900", text: "text-violet-700" },
];

export const colorForSlug = {};
allRoots.forEach((r, i) => {
  colorForSlug[r.slug] = rainbow[i % rainbow.length];
});
