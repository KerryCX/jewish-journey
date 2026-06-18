import BlessingLookup from "./components/BlessingLookup";

function App() {
  return (
    <div className='min-h-screen bg-base text-ink'>
      <div className='mx-auto max-w-md px-5 py-10'>
        <header className='mb-6 text-center'>
          <h1 className='text-xl font-bold'>Berakhot</h1>
          <p className='mt-1 text-sm text-ink-soft'>
            Blessings to Know by Heart
          </p>
        </header>

        <main>
          <BlessingLookup />
        </main>
      </div>
    </div>
  );
}

export default App;
