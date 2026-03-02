import { MusicPlayer } from "./components/MusicPlayer"
import { AllSongs } from "./components/AllSongs"
import { Playlists } from "./components/Playlists"
import { Favorites } from "./components/Favorites"
import { PageNotFound } from "./components/PageNotFound"
import { BrowserRouter, Routes, Route } from "react-router"
import { MusicProvider } from "./contexts/MusicContext"
import { Navbar } from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app"> 
          <Navbar />
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
