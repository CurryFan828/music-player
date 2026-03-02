import { createContext, useContext, useEffect, useState} from 'react' // Import the createContext function from React to create a new context for the music player

const MusicContext = createContext() // Create a new context for the music player

// Song Database
const songs = [
    {
        id: 1,
        title: "Anthem",
        artist: "The Grand Affair",
        url: "/songs/Anthem.mp3",
        duration: "3:04",
    },
    {
        id: 2,
        title: "As You Fade Away",
        artist: "NEFFEX",
        url: "/songs/As-You-Fade-Away.mp3",
        duration: "4:16",
    }, 
    {
        id: 3,
        title: "Golden Empire",
        artist: "The 126ers",
        url: "/songs/Golden-Empire.mp3",
        duration: "3:41",
    }, 
    {
        id: 4,
        title: "Oceanside Bonfire",
        artist: "The Great North Sound Society",
        url: "/songs/Oceanside-Bonfire.mp3",
        duration: "2:53",
    },
    {
        id: 5,
        title: "Sign of the Vibration",
        artist: "South London HiFi",
        url: "/songs/Sign-of-the-Vibration.mp3",
        duration: "3:55",
    },
    {
        id: 6,
        title: "Window Shopping",
        artist: "Jeremy Black",
        url: "/songs/Window-Shopping.mp3",
        duration: "3:56",
    },
    {
        id: 7,
        title: "Blue",
        artist: "Night Drift",
        url: "/songs/blue-night-drift.mp3",
        duration: "1:42",
    },
    {
        id: 8,
        title: "Tokyo Spring(Wooll Remix)",
        artist: "Yawnathan",
        url: "/songs/tokyo-spring-wooll-remix.mp3",
        duration: "3:12",
    }
]

export const MusicProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState(songs); // State to hold all songs
    const [currentTrack, setCurrentTrack] = useState(songs[0]); // State to hold the currently playing track
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // State to hold the index of the currently playing track
    const [currentTime, setCurrentTime] = useState(0); // State to hold the current time of the track (for progress bar)
    const [duration, setDuration] = useState(0); // State to hold the duration of the track (for progress bar)
    const [isPlaying, setIsPlaying] = useState(false); // State to hold whether the track is currently playing or not
    const [volume, setVolume] = useState(1); // State to hold the volume level (for volume control)
    const [playlists, setPlaylists] = useState([]) // State to hold user-created playlists


    useEffect(() => {
        const savedPlaylists = localStorage.getItem("musicPlayerPlaylists"); // Get the saved playlists from local storage
        if (savedPlaylists) {
            const playlists = JSON.parse(savedPlaylists); // If there are saved playlists, parse them and set them to the playlists state
            setPlaylists(playlists);
        }
    }, [])

    useEffect(() => {
        if (playlists.length > 0) {
            localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists)); // Save the playlists to local storage whenever they change
        } else {
            localStorage.removeItem("musicPlayerPlaylists"); // If there are no playlists, remove the item from local storage
        }
    }, [playlists])

    const handlePlaySong = (song, index) => {
        setCurrentTrack(song) // Set the current track to the selected song
        setCurrentTrackIndex(index) // Set the current track index to the index of the selected song
        setIsPlaying(false) // Pause the current track before playing the new one
    }

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length // Calculate the index of the next track, and wrap around to the beginning if it exceeds the length of the songs array
            setCurrentTrack(allSongs[nextIndex]) // Set the current track to the next track
            return nextIndex
        });
        setIsPlaying(false) // Pause the current track before playing the next one
        //  audio.play()() // Call the play function to start playing the next track
    }

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1 // Calculate the index of the previous track, and wrap around to the end if it goes below 0
            setCurrentTrack(allSongs[nextIndex]) // Set the current track to the previous track
            return nextIndex
        });
        setIsPlaying(false) // Pause the current track before playing the previous one
    }

    const formatTime = (time) => {
        if (isNaN(time) || time === undefined) return "0:00" // If the time is not a number, return "0:00"

        const minutes = Math.floor(time / 60) // Get the minutes by dividing the time by 60, and make sure it's not in decimal form by using Math.floor
        const seconds = Math.floor(time % 60) // Get the seconds by using the modulus operator to get the remainder of the time divided by 60, and make sure it's not in decimal form by using Math.floor

        return `${minutes}:${seconds.toString().padStart(2, "0")}` // Return the formatted time as a string in the format "minutes:seconds", and use padStart to ensure that seconds are always displayed with two digits (e.g., "3:05" instead of "3:5")
    }

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now(), // Generate a unique id using the current timestamp
            name,
            songs: [], // Each playlist starts with an empty songs array
        }
        setPlaylists((prev) => [...prev, newPlaylist]); // Add the new playlist to the existing playlists array
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId)); // Remove the playlist with the matching id from the playlists array
    }

    const addSongToPlaylist = (playlistId, song) => {
        setPlaylists((prev) => 
            prev.map((playlist) => {
                if (playlist.id === playlistId) {
                    return {...playlist, songs: [...playlist.songs, song] } // If the playlist id matches the provided playlistId, return a new playlist object with the new song added to the songs array
                } else {
                    return playlist;
                }
            })
        );
    }

    const play = () => setIsPlaying(true); // Set isPlaying to true when play is triggered
    const pause = () => setIsPlaying(false); // Set isPlaying to false when pause is triggered

    return (
        <MusicContext.Provider
            value={{
                allSongs,
                handlePlaySong,
                currentTrack,
                currentTrackIndex,
                currentTime,
                setCurrentTime,
                formatTime,
                duration,
                setDuration,
                nextTrack,
                prevTrack,
                play,
                pause,
                isPlaying,
                volume,
                setVolume,
                playlists,
                createPlaylist,
                addSongToPlaylist,
                setCurrentTrack,
                deletePlaylist
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const contextValue = useContext(MusicContext) // Get the context value from the MusicContext using the useContext hook
    if (!contextValue) { // If the context value is not available, throw an error to indicate that the useMusic hook must be used within a MusicProvider
        throw new Error("useMusic must be used within a MusicProvider")
    }
    
    return contextValue // Return the context value so that it can be used in other components
}