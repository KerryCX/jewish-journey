// src/components/Nav.jsx
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/",
    hebrew: "בְּרָכוֹת",
    transliteration: "B'rakhot",
    english: "Blessings",
  },
  {
    to: "/tefillot",
    hebrew: "תְּפִלּוֹת",
    transliteration: "Tefillot",
    english: "Prayers",
  },
  {
    to: "/shorashim",
    hebrew: "שָׁרָשִׁים",
    transliteration: "Shorashim",
    english: "Roots",
  },
  {
    to: "/mekorot",
    hebrew: "מְקוֹרוֹת",
    transliteration: "Mekorot",
    english: "Sources",
  },
];

export default function Nav() {
  const { pathname } = useLocation();

  // Matches "/shorashim/:slug" to the Shorashim nav item too, not just the
  // exact "/shorashim" path.
  const currentItem =
    navItems.find((item) =>
      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)
    ) ?? navItems[0];

  return (
    <nav className='w-full border-b border-line bg-surface'>
      <div className='relative flex w-full flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:py-4'>
        <span
          lang='he'
          dir='rtl'
          className='font-hebrew text-2xl font-bold leading-none text-ink sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:text-5xl'
        >
          {currentItem.hebrew}
          <span className='sr-only'> ({currentItem.transliteration})</span>
        </span>

        <ul className='flex gap-6 sm:ml-auto'>
          {navItems.map(({ to, hebrew, transliteration, english }) => (
            <li key={to} className='group relative'>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0 border-b-2 pb-1 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 sm:flex-row sm:items-baseline sm:gap-1.5 ${
                    isActive ? "border-accent" : "border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      lang='he'
                      dir='rtl'
                      className='font-hebrew text-lg text-ink'
                    >
                      {hebrew}
                    </span>
                    <span aria-hidden='true' className='hidden text-ink-soft sm:inline'>
                      -
                    </span>
                    <span
                      aria-hidden='true'
                      className={`mt-0.5 text-xs sm:mt-0 ${
                        isActive ? "text-accent" : "text-ink-soft"
                      }`}
                    >
                      {transliteration}
                    </span>
                    <span className='sr-only'>
                      {" "}
                      ({transliteration}, {english})
                    </span>
                  </>
                )}
              </NavLink>
              <span
                aria-hidden='true'
                className='pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100'
              >
                {english}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
