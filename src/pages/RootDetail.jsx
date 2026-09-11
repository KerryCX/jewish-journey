// src/pages/RootDetail.jsx
import { Link, useParams } from "react-router-dom";
import { rootBySlug } from "../data/shorashim";

// A box's content, transparent by default — the outer parchment
// container (see the return below) carries the actual background,
// overlay, and border for the whole page, so these are just windows
// onto it. `bordered` marks a box out as a satellite result; the centre
// (root) box passes `bordered={false}` since it isn't one of the
// four surrounding results.
function AgedBox({ as: Tag = "div", className = "", bordered = true, children }) {
  return (
    <Tag
      className={`text-parchment-ink relative h-full overflow-hidden rounded-lg p-4 ${
        bordered ? "border border-line" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export default function RootDetail() {
  const { slug } = useParams();
  const root = rootBySlug[slug];

  if (!root) {
    return (
      <main className='text-center'>
        <p className='text-sm text-ink-soft'>
          Couldn't find that root.
        </p>
        <Link
          to='/shorashim'
          className='mt-2 inline-block text-sm text-accent underline underline-offset-2'
        >
          ← Back to Shorashim
        </Link>
      </main>
    );
  }

  const header = (
    <AgedBox
      as='header'
      bordered={false}
      className='flex flex-col items-center justify-center text-center'
    >
      <p className='text-4xl' dir='rtl' lang='he'>
        {root.hebrew}
      </p>
      <h1 className='mt-2 text-xl font-bold'>{root.translit}</h1>
      <p className='mt-1 text-sm opacity-80'>{root.meaning}</p>
    </AgedBox>
  );

  const exampleSection = (
    <AgedBox as='section'>
      <h2 className='mb-2 text-sm font-medium'>Example</h2>
      {root.example ? (
        <>
          <p className='text-lg' dir='rtl' lang='he'>
            {root.example.hebrew}
          </p>
          <p className='mt-1 text-sm opacity-80'>
            {root.example.translit} — "{root.example.gloss}"
          </p>
        </>
      ) : (
        <p className='text-sm opacity-80'>No example recorded yet.</p>
      )}
    </AgedBox>
  );

  // TODO: replace with real content once available — currently just the
  // same placeholder text used in the Talmud-mode margin card, and only
  // halakh has one so far.
  const detailSection = (
    <AgedBox as='section'>
      <h2 className='mb-2 text-sm font-medium'>About this root</h2>
      {root.detail ? (
        <p className='text-sm leading-relaxed opacity-80'>{root.detail}</p>
      ) : (
        <p className='text-sm opacity-80'>No extended notes yet for this root.</p>
      )}
    </AgedBox>
  );

  // TODO: this is the actual point of the page per the original concept —
  // every form of this root found across the siddur, cross-referenced
  // back to the Tefillot page it appears in. Needs the transliterated
  // prayers gone through and tagged by root before this can be filled in
  // for real.
  const formsSection = (
    <AgedBox as='section'>
      <h2 className='mb-2 text-sm font-medium'>Forms in the siddur</h2>
      <p className='text-sm opacity-80'>
        Not yet catalogued. Every occurrence of this root across the
        Tefillot will appear here, each linking back to where it's used.
      </p>
    </AgedBox>
  );

  // TODO: placeholder for now — once roots are cross-referenced to each
  // other (shared themes, roots that commonly appear together in the same
  // line), they'll be linked here.
  const relatedSection = (
    <AgedBox as='section'>
      <h2 className='mb-2 text-sm font-medium'>Related roots</h2>
      <p className='text-sm opacity-80'>
        Not yet linked. Roots that share a theme or often appear alongside
        this one will show up here.
      </p>
    </AgedBox>
  );

  return (
    <main className='mx-auto max-w-md px-4 text-left sm:max-w-5xl'>
      {/*
        Entrance animation: each box scales/rotates in from slightly off
        its resting place, staggered clockwise (centre settles first, then
        top → right → bottom → left) so the whole thing reads as spiralling
        into place on load. `backwards` fill mode keeps each box invisible
        until its own delay elapses, rather than flashing visible early.
        Gated behind motion-safe: so anyone with reduced-motion enabled
        just sees the boxes appear in place, no animation at all.
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

      <Link
        to='/shorashim'
        className='text-xs text-ink-soft underline underline-offset-2'
      >
        ← Shorashim
      </Link>

      {/*
        Mobile: everything stacks in document order (header, example,
        detail, forms, related) — the grid properties below are inert
        until `sm:grid` switches display to grid, so on mobile this is
        just a plain parchment card wrapping a simple stack.

        Desktop: pinwheels around the centred root, same shape as the
        Shorashim overview page — example runs the full left column, forms
        sits top-right (its left edge flush with the centre column, not
        the page edge), about-this-root runs the full right column, and
        related roots sits bottom-left (its right edge flush with the
        centre column). All five boxes are transparent windows onto this
        one outer parchment container, bordered only for the four
        satellite results — not the centre. Static on load — nothing here
        is interactive or fills in over time, unlike the overview page's
        Talmud mode.
      */}
      <div className='bg-parchment relative mt-4 overflow-hidden rounded-xl border border-line p-6 shadow-sm'>
        <div
          aria-hidden='true'
          className='bg-parchment-overlay pointer-events-none absolute inset-0'
        />
        <div
          className='relative space-y-4 sm:grid sm:gap-6 sm:space-y-0'
          style={{
            gridTemplateAreas: '"left top top" "left center right" "bottom bottom right"',
            gridTemplateColumns: "minmax(240px, 320px) minmax(320px, 480px) minmax(240px, 320px)",
            gridTemplateRows: "auto auto auto",
          }}
        >
          <div
            style={{ gridArea: "center", animationDelay: "0ms" }}
            className='motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
          >
            {header}
          </div>
          <div
            style={{ gridArea: "top", animationDelay: "120ms" }}
            className='motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
          >
            {formsSection}
          </div>
          <div
            style={{ gridArea: "right", animationDelay: "240ms" }}
            className='motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
          >
            {detailSection}
          </div>
          <div
            style={{ gridArea: "bottom", animationDelay: "360ms" }}
            className='motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
          >
            {relatedSection}
          </div>
          <div
            style={{ gridArea: "left", animationDelay: "480ms" }}
            className='motion-safe:animate-[spiral-in_0.6s_ease-out_backwards]'
          >
            {exampleSection}
          </div>
        </div>
      </div>
    </main>
  );
}
