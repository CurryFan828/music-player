import { useState } from 'react'

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
    }
]

// Use Music hook
export const useMusic = () => {
    const [allSongs, setAllSongs] = useState(songs) // State to hold all songs
    const [currentTrack, setCurrentTrack] = useState(null) // State to hold the currently playing track
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0) // State to hold the index of the currently playing track

    // Function to handle playing a song (this is just a placeholder, you can implement the actual logic later)
    const handlePlaySong = (song, index) => {
        setCurrentTrack(song) // Set the current track to the selected song
        setCurrentTrackIndex(index) // Set the current track index to the index of the selected song 
    }

    return {
        allSongs,
        handlePlaySong,
        currentTrack,
        currentTrackIndex
    }
}