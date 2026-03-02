import { use, useEffect, useRef } from 'react'
import { useMusic } from '../contexts/MusicContext'

// Create a function for the MusicPlayer component. 
// This will be the main component for the music player. 
// It will contain the player controls and the playlist.
export const MusicPlayer = () => {
  const { 
    currentTrack, 
    setCurrentTime, 
    currentTime, 
    formatTime, 
    duration, 
    setDuration, 
    nextTrack, 
    prevTrack,
    isPlaying, 
    play,
    pause,
    volume,
    setVolume,
  } = useMusic() // Get the current track and time from the useMusic hook

  const audioRef = useRef(null) // Create a ref for the audio element so we can control it programmatically

  // This function will handle the change in the progress bar when the user seeks to a different time in the track.
  const handleTimeChange = (e) => {
    const audio = audioRef.current // Get the audio element from the ref
    if (!audio) return // If the audio element is not available, return early

    const newTime = parseFloat(e.target.value) // Get the new time from the event target value
    audio.currentTime = newTime; // Set the current time of the audio element to the new time
    setCurrentTime(newTime) // Update the current time state with the new time
  }

  // This function will handle the change in the volume control when the user adjusts the volume.
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value) // Get the new volume from the event target value
    setVolume(newVolume) // Update the volume state with the new volume
  }

  useEffect(() => {
    const audio = audioRef.current // Get the audio element from the ref
    if (!audio) return // If the audio element is not available, return early

    audio.volume = volume; // Set the volume of the audio element to the current volume state
  }, [volume]) // This effect will run whenever the volume state changes, and it will update the volume of the audio element accordingly

  // This useEffect will run whenever the isPlaying state changes. It will play or pause the audio element based on the value of isPlaying.
  useEffect(() => {
    const audio = audioRef.current // Get the audio element from the ref
    if (!audio) return // If the audio element is not available, return early

    if (isPlaying) {
      audio.play().catch(err => console.error(err)); // Play the audio if isPlaying is true, and catch any errors that may occur (e.g., if the user hasn't interacted with the page yet, some browsers may block autoplay)
    } else {
      audio.pause();
    }
  }, [isPlaying])


  useEffect(() => {
    const audio = audioRef.current // Get the audio element from the ref
    if (!audio) return // If the audio element is not available, return early

    // This function will handle the loadedmetadata event, which is fired when the metadata of the audio file has been loaded.
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    }

    // This function will handle the timeupdate event, which is fired when the current time of the audio file has changed.
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    }

    // This function will handle the ended event, which is fired when the audio file has finished playing.
    const handleEnded = () => {
      nextTrack(); // When the current track ends, play the next track in the playlist
    }


    // Add event listeners to the audio element
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    // Clean up the event listeners when the component unmounts
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [setDuration, setCurrentTime, currentTrack, nextTrack]) // This effect will run whenever the setDuration, setCurrentTime, or currentTrack changes


  useEffect(() => {
    const audio = audioRef.current // Get the audio element from the ref
    if (!audio) return // If the audio element is not available, return early

    audio.load() // Load the new audio source whenever the current track changes. This will reset the current time and duration, and trigger the loadedmetadata event to update the duration state.
    setCurrentTime(0) // Reset the current time to 0 whenever the current track changes
    setDuration(0) // Reset the duration to 0 whenever the current track changes
  }, [currentTrack, setCurrentTime, setDuration]) // This useEffect will run whenever the currentTrack, setCurrentTime, or setDuration changes. It can be used to perform any additional logic that may be needed when the current track changes (e.g., resetting the current time and duration when a new track is selected).


  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0; // Calculate the progress percentage for the progress bar, and handle the case where duration is 0 to avoid division by zero

  return (
    <div className="music-player">
      <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" /> {/* This is the audio element that will play the music. You can add controls and other attributes as needed. */}

      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      {/* This is the container for the progress bar. You can add the progress bar and other controls as needed. */}
      <div className="progress-container"> 
        <span className="time">{formatTime(currentTime)}</span>
        <input 
          type="range" 
          min="0" 
          max={duration || 0} 
          step="0.1" 
          value={currentTime || 0}
          className="progress-bar"
          onChange={handleTimeChange}
          style={{"--progress": `${progressPercentage}%`}} // Set the CSS variable for the progress percentage, which can be used to style the progress bar with a gradient or other visual indicator of progress
          >

          </input>
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        {/* Add your player controls (play, pause, next, previous, etc.) here */}
        <button className="control-btn" onClick={prevTrack}>⏮</button>
        <button className="control-btn play-btn" onClick={() => isPlaying ? pause() : play()}>{isPlaying ? "⏸" : "▶"}</button>
        <button className="control-btn" onClick={nextTrack}>⏭</button>
      </div>

      <div className="volume-container">
        {/* Volume control and other features can be added here */}
        <span className="volume-icon">🔊</span>
        <input type="range" min="0" max="1" step="0.1" className="volume-bar" onChange={handleVolumeChange} value={volume} />
      </div>
    </div>
  )
}