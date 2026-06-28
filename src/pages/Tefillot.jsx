import { Link } from "react-router-dom";
import tefillot from "../data/tefillot.json";

function Tefillot() {
  return (
    <>
      <header className='mb-6 text-center'>
        <h1 className='text-xl font-bold'>Tefillot</h1>
        <p className='mt-1 text-sm text-ink-soft'>
          Texts to read confidently before Beit Din
        </p>
      </header>
      <main className='space-y-10'>
        {tefillot.map((prayer) => (
          <section key={prayer.id}>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-ink mb-3'>
              {prayer.name}
            </h2>
            <div className='rounded-md border border-line bg-surface p-4 space-y-6'>
              {prayer.sections.map((section) => (
                <div
                  key={section.label}
                  className={
                    section.variant === "liberal"
                      ? "rounded border border-line-soft p-3 bg-base"
                      : ""
                  }
                >
                  <p className='text-xs font-medium uppercase tracking-wide text-ink-soft mb-1'>
                    {section.label}
                  </p>
                  {section.note && (
                    <p className='text-xs italic text-ink-soft mb-2'>
                      {section.note}
                    </p>
                  )}
                  <p
                    lang='he'
                    dir='rtl'
                    className='font-hebrew text-xl leading-loose whitespace-pre-line'
                  >
                    {section.hebrew}
                  </p>
                </div>
              ))}
            </div>
            <div className='mt-2 flex gap-4 text-xs text-ink-soft'>
              {prayer.recordingUrl && (
                <a
                  href={prayer.recordingUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='underline underline-offset-2 hover:text-ink'
                >
                  Listen
                </a>
              )}
              {prayer.transliterationUrl && (
                <a
                  href={prayer.transliterationUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='underline underline-offset-2 hover:text-ink'
                >
                  Transliteration
                </a>
              )}
            </div>
          </section>
        ))}
      </main>
      <p className='mt-8 text-center text-xs text-ink-soft'>
        <Link to='/' className='underline underline-offset-2 hover:text-ink'>
          Berakhot
        </Link>
      </p>
    </>
  );
}

export default Tefillot;
