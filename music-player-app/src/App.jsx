import { MusicPlayer } from "./components/MusicPlayer"
import { AllSongs } from "./components/AllSongs"
import { Playlists } from "./components/Playlists"
import { Favorites } from "./components/Favorites"
import { BrowserRouter, Routes, Route } from "react-router"

function App() {

  return (
    <BrowserRouter>
      <div className="app"> 
        {/* <Navbar /> */}
        <main className="app-main">
          <div className="player-section">
            <MusicPlayer />
          </div>
          <div className="content-section">
            <Routes>
              <Route path="/" element={<AllSongs />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
