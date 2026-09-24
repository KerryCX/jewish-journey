export default function TransliterationNote({ show }) {
  if (!show) return null;

  return (
    <div className='text-xs italic text-ink-soft'>
      <p>A note on transliteration:</p>
      <ul className='list-disc list-inside'>
        <li>
          ק, and כ with a dot, both make a hard k sound, written as k or c so
          you can tell which letter it came from.
        </li>
        <li>
          ח, and כ without a dot, both make a throaty kh sound, like "Bach" or
          "loch", not "ch" as in "cheddar".
        </li>
      </ul>
    </div>
  );
}
