// src/components/Demo.jsx
import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";

export const Demo = () => {
  const { searchSongs, allSongs, setCurrentSong } = useMusic();
  const [loading, setLoading] = useState(false);

  const handleLoadDemoSongs = async () => {
    setLoading(true);
    try {
      await searchSongs("pop"); // fetch 20 demo pop songs
    } catch (err) {
      console.error("Failed to load demo songs:", err);
    }
    setLoading(false);
  };

  return (
    <div className="demo-page">
      <h2>Demo Page</h2>
      <p>Click the button below to load demo songs into the player:</p>

      <button onClick={handleLoadDemoSongs} disabled={loading}>
        {loading ? "Loading..." : "Load Demo Songs"}
      </button>

      <div className="demo-songs-grid">
        {allSongs.length === 0 ? (
          <p>No demo songs loaded yet.</p>
        ) : (
          allSongs.map((song) => (
            <div
              key={song.id}
              className="demo-song-card"
              onClick={() => setCurrentSong(song)}
            >
              <img
                src={song.image}
                alt={song.album}
                className="demo-song-cover"
              />
              <div className="demo-song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
                <span className="song-duration">{song.duration}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};