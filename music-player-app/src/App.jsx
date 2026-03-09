import { MusicPlayer } from "./components/MusicPlayer"
import { AllSongs } from "./pages/AllSongs"
import { Playlists } from "./pages/Playlists"
import { Profile } from "./pages/Profile"
import { PageNotFound } from "./pages/PageNotFound"
import { BrowserRouter, Routes, Route } from "react-router"
import { MusicProvider } from "./contexts/MusicContext"
import { Navbar } from "./components/Navbar"
import { AuthProvider } from "./contexts/AuthContexts"
import { ProtectedRoute } from "./components/ProtectedRoutes"



function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <MusicProvider>
        <div className="app"> 
          <Navbar />
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute>
                    <AllSongs />
                  </ProtectedRoute>
                } />
                <Route path="/playlists" element={
                  <ProtectedRoute>
                    <Playlists />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  // <ProtectedRoute>
                    <Profile />
                  /* </ProtectedRoute> */
                }/>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App