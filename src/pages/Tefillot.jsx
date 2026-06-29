import { useState } from "react";
import { Link } from "react-router-dom";
import tefillot from "../data/tefillot.json";

function Tefillot() {
  const [selectedIndex, setSelectedIndex] = useState("");
  const [showTransliteration, setShowTransliteration] = useState(false);

  const selected = selectedIndex === "" ? null : tefillot[selectedIndex];

  return (
    <>
      <header className='mb-6 text-center'>
        <h1 className='text-xl font-bold'>Tefillot</h1>
        <p className='mt-1 text-sm text-ink-soft'>
          Texts to read confidently before Beit Din
        </p>
      </header>

      <main className='space-y-4'>
        <select
          value={selectedIndex}
          onChange={(e) => {
            setSelectedIndex(e.target.value);
            setShowTransliteration(false);
          }}
          className='w-full rounded border border-line bg-surface px-3 py-2 text-center [text-align-last:center]'
        >
          <option value=''>choose a prayer</option>
          {tefillot.map((prayer, index) => (
            <option key={prayer.id} value={index}>
              {prayer.name}
            </option>
          ))}
        </select>

        {selected && (
          <div className='flex justify-end'>
            <label className='flex items-center gap-2 text-sm cursor-pointer'>
              <input
                type='checkbox'
                checked={showTransliteration}
                onChange={() => setShowTransliteration((prev) => !prev)}
                className='accent-accent'
              />
              Transliteration
            </label>
          </div>
        )}

        <div className='rounded-md border border-line bg-surface p-4 space-y-6'>
          {!selected && (
            <p className='text-center italic text-accent'>
              Select a prayer above to see its text.
            </p>
          )}

          {selected && (
            <>
              {selected.sections.map((section) => (
                <div
                  key={section.label}
                  className={
                    section.variant === "liberal"
                      ? "rounded border border-line p-3 bg-base"
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

                  {!showTransliteration && (
                    <p
                      lang='he'
                      dir='rtl'
                      className='font-hebrew text-xl leading-loose whitespace-pre-line'
                    >
                      {section.hebrew}
                    </p>
                  )}

                  {showTransliteration && section.sentences && (
                    <div className='space-y-3'>
                      {section.sentences.map((sentence, i) => (
                        <div key={i}>
                          <p
                            lang='he'
                            dir='rtl'
                            className='font-hebrew text-xl leading-loose'
                          >
                            {sentence.hebrew}
                          </p>
                          {sentence.transliteration && (
                            <p className='text-sm text-ink-soft leading-loose'>
                              {sentence.transliteration}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className='flex gap-4 text-xs text-ink-soft pt-2'>
                {selected.recordingUrl && (
                  <a
                    href={selected.recordingUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='underline underline-offset-2 hover:text-ink'
                  >
                    Listen
                  </a>
                )}
                {selected.transliterationUrl && (
                  <a
                    href={selected.transliterationUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='underline underline-offset-2 hover:text-ink'
                  >
                    Transliteration PDF
                  </a>
                )}
              </div>
            </>
          )}
        </div>
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
