import { Routes, Route } from "react-router-dom";
import BlessingLookup from "./components/BlessingLookup";
import Tefillot from "./pages/Tefillot";
import Shorashim from "./pages/Shorashim";
import RootDetail from "./pages/RootDetail";
import Mekorot from "./pages/Mekorot";
import Nav from "./components/Nav";

function App() {
  return (
    <div className='flex h-screen flex-col overflow-hidden bg-base text-ink'>
      <Nav />

      <div className='min-h-0 flex-1 overflow-y-auto'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='mx-auto max-w-md px-5 py-10'>
                <header className='mb-6 text-center'>
                  <h1 className='mt-1 text-sm text-ink-soft'>
                    Blessings to Know by Heart
                  </h1>
                </header>
                <main>
                  <BlessingLookup />
                </main>
              </div>
            }
          />
          <Route
            path='/tefillot'
            element={
              <div className='mx-auto max-w-md px-5 py-10'>
                <Tefillot />
              </div>
            }
          />
          <Route
            path='/mekorot'
            element={
              <div className='mx-auto max-w-md px-5 py-10'>
                <Mekorot />
              </div>
            }
          />
          {/* Shorashim manages its own responsive width (max-w-6xl
              normally, full viewport width in desktop Talmud mode), so it
              gets no wrapper at all — nothing else renders alongside it to
              steal space from its own h-full sizing. */}
          <Route path='/shorashim' element={<Shorashim />} />
          <Route path='/shorashim/:slug' element={<RootDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
