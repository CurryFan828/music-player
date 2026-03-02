import { useState } from "react"
import { useMusic } from "../contexts/MusicContext"

export const Playlists = () => {
  const [newPlaylistName, setNewPlaylistName] = useState("") // State to track the name of the new playlist being created
  const [selectedPlaylist, setSelectedPlaylist] = useState(null) // State to track the currently selected playlist for adding songs
  const [searchQuery, setSearchQuery] = useState("") // State to track the search query for filtering songs when adding to a playlist
  const [showDropdown, setShowDropdown] = useState(false) // State to track whether the dropdown for adding songs to a playlist is visible or not 

  const { playlists, createPlaylist, allSongs, addSongToPlaylist, currentTrackIndex, handlePlaySong, deletePlaylist} = useMusic();

  {/* Filter Variable */}
  const filteredSongs = allSongs.filter((song) => {
    const matches = 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the song title or artist includes the search query (case-insensitive);
    

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some(
      (playlistSong) => playlistSong.id === song.id
    ) // Check if the song is already in the selected playlist
    return matches && !isAlreadyInPlaylist;
  })

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };


  const handleAddSong = (song) => {
    if (selectedPlaylist) {
      addSongToPlaylist(selectedPlaylist.id, song);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  const handlePlayFromPlaylist = (song) => {
    const globalIndex = allSongs.findIndex((s) => s.id === song.id); // Find the index of the song in the global allSongs array
    handlePlaySong(song, globalIndex); // Call the handlePlaySong function with the selected song and its global index
  }


  const deletePlaylistConfirmation = (playlist) => {
    if (window.confirm(`Are you sure you want to delete "${playlist.name}" playlist?`)) {
      deletePlaylist(playlist.id);
    }
  }

  return (
    <div className="playlists">
      <h2>Playlists</h2>

      {/* Create New Playlist Section */}
      <div className="create-playlist">
        {/* Create New Playlist Section */}
        <h3>Create New Playlist</h3>
        <div className="playlist-form">
          {/* Input field for new playlist name */}
          <input 
        type="text" 
        placeholder="Playlist Name..." 
        className="playlist-input"
        onChange={(e) => setNewPlaylistName(e.target.value)}
        value={newPlaylistName}
          />
          {/* Button to trigger playlist creation */}
          <button className="create-btn" onClick={handleCreatePlaylist}>Create</button>
        </div>
      </div>

      {/* Playlists List - displays all user playlists */}
      <div className="playlists-list">
        {playlists.length === 0 ? (
          <p className="empty-message">No playlists created yet.</p>): 
          playlists.map((playlist, key) => (
            <div key={key} className="playlist-item">
              <div className="playlist-header">
                <h3>{playlist.name}</h3>
                <div className="playlist-actions">
                  <button 
                    className="delete-playlist-btn" 
                    onClick={() => deletePlaylistConfirmation(playlist)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Add Song Search */}
              <div className="add-song-section">
                <div className="search-container">
                  <input 
                  type="text" 
                  placeholder="Search songs to add..." 
                  value={selectedPlaylist?.id === playlist.id ? searchQuery : ""} 
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedPlaylist(playlist);
                    setShowDropdown(e.target.value.length > 0); // Show dropdown only when there is a search query

                  }}
                  onFocus={(e) => {
                    setSelectedPlaylist(playlist);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  className="song-search-input" />

                  {/* Dropdown for adding songs to the playlist */}
                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className="song-dropdown">
                      {filteredSongs.length === 0 ? (
                        <div className="dropdown-item no-results">
                          No songs found
                        </div>
                      ) : (
                        filteredSongs.slice(0, 5).map((song, key) => (
                        <div key={key} className="dropdown-item" onClick={() => handleAddSong(song)}>
                          <span className="song-title">{song.title}</span>
                          <span className="song-artist">{song.artist}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="playlist-songs"> 
                  {playlist.songs.length === 0 ? (
                    <p className="empty-playlist">No songs in this playlist.</p>
                  ) : (
                    playlist.songs.map((song, key) => (
                      <div 
                        key={key} 
                        className={`playlist-song ${
                          currentTrackIndex === 
                          allSongs.findIndex((s => s.id === song.id))
                           ? "active" 
                           : ""
                        }`}
                        onClick={() => handlePlayFromPlaylist(song, playlist.id, key)}
                      >
                        <div className="song-info">
                          <span className="song-title">{song.title}</span>
                          <span className="song-artist">{song.artist}</span>
                        </div>
                        <span className="song-duration">{song.duration}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}














// ----------------------- New Version --------------------
// import React, { useState } from "react";
// import { useMusic } from "../contexts/MusicContext";

// const Playlists = () => {
//   const {
//     playlists,
//     createPlaylist,
//     allSongs,
//     addSongToPlaylist,
//     setCurrentSong,
//   } = useMusic();

//   const [newPlaylistName, setNewPlaylistName] = useState("");
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredSongs = allSongs.filter(
//     (song) =>
//       song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       song.artist.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCreatePlaylist = () => {
//     if (newPlaylistName.trim()) {
//       createPlaylist(newPlaylistName.trim());
//       setNewPlaylistName("");
//     }
//   };

//   const handleAddSong = (song) => {
//     if (selectedPlaylist) {
//       addSongToPlaylist(selectedPlaylist.id, song);
//       setSearchQuery("");
//       setSelectedPlaylist(null);
//     }
//   };

//   return (
//     <div className="playlists">
//       <h2>Playlists</h2>
//       <div className="create-playlist">
//         <input
//           type="text"
//           placeholder="Playlist Name..."
//           value={newPlaylistName}
//           onChange={(e) => setNewPlaylistName(e.target.value)}
//         />
//         <button onClick={handleCreatePlaylist}>Create</button>
//       </div>

//       <div className="playlists-list">
//         {playlists.map((pl) => (
//           <div key={pl.id} className="playlist-item">
//             <h3>{pl.name}</h3>
//             <input
//               type="text"
//               placeholder="Search songs..."
//               value={selectedPlaylist?.id === pl.id ? searchQuery : ""}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setSelectedPlaylist(pl);
//               }}
//             />
//             {selectedPlaylist?.id === pl.id &&
//               searchQuery &&
//               filteredSongs.slice(0, 5).map((song) => (
//                 <div
//                   key={song.id}
//                   className="dropdown-item"
//                   onClick={() => handleAddSong(song)}
//                 >
//                   <img src={song.image} alt={song.album} className="song-cover-small" />
//                   <span>{song.title}</span> - <span>{song.artist}</span>
//                 </div>
//               ))}

//             <div className="playlist-songs">
//               {pl.songs.map((song) => (
//                 <div
//                   key={song.id}
//                   className="playlist-song"
//                   onClick={() => setCurrentSong(song)}
//                 >
//                   <img src={song.image} alt={song.album} className="song-cover-small" />
//                   <span>{song.title}</span> - <span>{song.artist}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Playlists;