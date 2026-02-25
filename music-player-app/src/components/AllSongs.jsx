import { useMusic } from '../hooks/useMusic' // Import the useMusic hook from the MusicContext

export const AllSongs = () => {
  const { allSongs, handlePlaySong, currentTrackIndex } = useMusic() // Get all songs and handlePlaySong from the useMusic hook

  return (
    <div className="all-songs">
      <h2>All Songs ({allSongs.length})</h2> {/* {allSongs.length} will display the number of songs in the list */}

      {/* Grid for all of the songs */}
      <div className="songs-grid">
        {/* 
        {allSongs.map} will loop through the allSongs array and render a song card for each song in 
        the list. Each song card will display the song's title, artist, and duration. 
        The key prop is used to help React identify which items have changed, are added, or are removed. 
        */}
        {allSongs.map((song, key) => (
          <div key={key} className={`song-card ${currentTrackIndex === key ? "active" : ""}`} onClick={() => handlePlaySong(song, key)}>
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              <span className="song-duration">{song.duration}</span>
            </div>
            <div className="play-button">
              {currentTrackIndex === key ? "♪" : "▶"} {/* Display "Playing..." if the current track index matches the song's index, otherwise display "Play" */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}