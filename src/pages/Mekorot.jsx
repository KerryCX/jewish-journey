// src/pages/Mekorot.jsx
const resources = [
  {
    title: "The Dots That Hold the Sound: Learning Niqqud",
    description:
      "How consonants, ancient cousins, and a system of dots are helping me read biblical Hebrew.",
    file: "https://kerryclements.substack.com/p/the-dots-that-hold-the-sound-learning",
    type: "article",
  },
  {
    title: "Niqqud Guide",
    description:
      "A handy reference to the vowel marks in Hebrew, including the kamatz gadol/katan distinction most beginner guides skip.",
    file: "/niqqud-guide.pdf",
    preview: "/niqqud-guide.png",
    type: "pdf",
  },
  {
    title: "Niqqud Sound Reference Tables",
    description:
      "Every niqqud symbol grouped by the sound it makes, including yud variants and the double-duty kamatz gadol/katan symbols.",
    file: "/niqqud-sound-reference-tables.pdf",
    preview: "/niqqud-sound-reference-tables.png",
    type: "pdf",
  },
  {
    title: "The Hebrew Alefbet and the English Alphabet",
    description:
      "Shared descent from Phoenician, via Greek and Latin (English) or Paleo-Hebrew and Ketav Ashuri (Hebrew).",
    file: "/alefbet-alphabet-comparison-table.pdf",
    preview: "/alefbet-alphabet-comparison-table.png",
    type: "pdf",
  },
];

export default function Mekorot() {
  return (
    <main className='text-center'>
      <h1 className='mt-1 text-sm text-ink-soft'>Resources</h1>

      <ul className='mt-8 space-y-4 text-left'>
        {resources.map((r) => (
          <li
            key={r.title}
            className='rounded-lg border border-line bg-surface p-4'
          >
            <h2 className='text-lg font-medium text-ink'>{r.title}</h2>
            <p className='mt-1 text-sm text-ink-soft'>{r.description}</p>

            {r.preview && (
              <a href={r.file} target='_blank' rel='noopener noreferrer'>
                <img
                  src={r.preview}
                  alt={r.title}
                  className='mt-3 w-full rounded border border-line'
                />
              </a>
            )}

            <a
              href={r.file}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-3 inline-block text-accent underline underline-offset-2'
            >
              {r.type === "article" ? "Read article" : "View PDF"}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
