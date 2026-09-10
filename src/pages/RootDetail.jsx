// src/pages/RootDetail.jsx
import { Link, useParams } from "react-router-dom";
import { rootBySlug, colorForSlug } from "../data/shorashim";

export default function RootDetail() {
  const { slug } = useParams();
  const root = rootBySlug[slug];
  const color = colorForSlug[slug];

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

  return (
    <main className='text-left'>
      <Link
        to='/shorashim'
        className='text-xs text-ink-soft underline underline-offset-2'
      >
        ← Shorashim
      </Link>

      <header
        className={`mt-4 rounded-lg border p-6 text-center ${color.bubble}`}
      >
        <p className='text-4xl' dir='rtl' lang='he'>
          {root.hebrew}
        </p>
        <h1 className='mt-2 text-xl font-bold'>{root.translit}</h1>
        <p className='mt-1 text-sm opacity-80'>{root.meaning}</p>
      </header>

      {/* TODO: replace with real content once available — currently just
          the same detail placeholder text used in the Talmud-mode margin
          card, if this root has one. */}
      {root.detail && (
        <section className='mt-4 rounded-lg border border-line bg-surface p-4'>
          <p className='text-sm leading-relaxed text-ink-soft'>
            {root.detail}
          </p>
        </section>
      )}

      {root.example && (
        <section className='mt-4 rounded-lg border border-line bg-surface p-4'>
          <h2 className='mb-2 text-sm font-medium text-ink'>Example</h2>
          <p className='text-lg' dir='rtl' lang='he'>
            {root.example.hebrew}
          </p>
          <p className='mt-1 text-sm text-ink-soft'>
            {root.example.translit} — "{root.example.gloss}"
          </p>
        </section>
      )}

      {/* TODO: this is the actual point of the page per the original
          concept — every form of this root found across the siddur,
          cross-referenced back to the Tefillot page it appears in.
          Needs the transliterated prayers gone through and tagged by
          root before this can be filled in for real. */}
      <section className='mt-4 rounded-lg border border-line bg-surface p-4'>
        <h2 className='mb-2 text-sm font-medium text-ink'>
          Forms in the siddur
        </h2>
        <p className='text-sm text-ink-soft'>
          Not yet catalogued. Every occurrence of this root across the
          Tefillot will appear here, each linking back to where it's used.
        </p>
      </section>
    </main>
  );
}
