import { useState } from "react";
import blessings from "../data/blessings.json";

const TOGGLE_LABELS = [
  { key: "nikkud", label: "Nikkud" },
  { key: "transliteration", label: "Transliteration" },
  { key: "translation", label: "Translation" },
  { key: "recording", label: "Recording" },
];

function BlessingLookup() {
  const [selectedIndex, setSelectedIndex] = useState("");
  const [toggles, setToggles] = useState({
    nikkud: false,
    transliteration: false,
    translation: false,
    recording: false,
  });

  const selected = selectedIndex === "" ? null : blessings[selectedIndex];

  function toggle(key) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className='space-y-4'>
      <select
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(e.target.value)}
        className='w-full rounded border border-line bg-surface px-3 py-2 text-center [text-align-last:center]'
      >
        <option value=''>choose a blessing</option>
        {blessings.map((item, index) => (
          <option key={item.name} value={index}>
            {item.name}
          </option>
        ))}
      </select>

      {selected && (
        <div className='flex flex-wrap justify-center gap-4 text-sm'>
          {TOGGLE_LABELS.map(({ key, label }) => (
            <label key={key} className='flex items-center gap-1 cursor-pointer'>
              <input
                type='checkbox'
                checked={toggles[key]}
                onChange={() => toggle(key)}
              />
              {label}
            </label>
          ))}
        </div>
      )}

      <div className='rounded-md border border-line bg-surface p-4 min-h-[40px]'>
        {!selected && (
          <p className='text-center italic text-accent'>
            Select a blessing above to see its text.
          </p>
        )}

        {selected && (
          <>
            <p
              lang='he'
              dir='rtl'
              className='font-hebrew text-2xl font-medium mb-2'
            >
              {toggles.nikkud ? selected.hebrewNikkud : selected.hebrewPlain}
            </p>

            {toggles.transliteration && (
              <p lang='en' dir='ltr' className='mb-2'>
                {selected.transliteration}
              </p>
            )}

            {toggles.translation && (
              <p lang='en' dir='ltr' className='mb-2'>
                {selected.translation}
              </p>
            )}

            {toggles.recording &&
              (selected.youtubeId ? (
                <div className='mt-3 aspect-video overflow-hidden rounded-md'>
                  <iframe
                    className='h-full w-full'
                    src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}`}
                    title={`Recording: ${selected.name}`}
                    allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className='text-center italic text-accent mt-2'>
                  No recording added for this blessing yet.
                </p>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BlessingLookup;
