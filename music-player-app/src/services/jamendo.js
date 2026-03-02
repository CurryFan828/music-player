const API_KEY = import.meta.env.VITE_MUSIC_PLAYER_API_KEY; // your Jamendo client ID
const BASE_URL = "https://api.jamendo.com/v3.0/tracks/";

/**
 * Fetch songs from Jamendo by search query
 * @param {string} query - search term, e.g., "pop"
 * @param {number} limit - number of songs to fetch
 * @returns {Array} - array of song objects
 */
export const getSongs = async (query = "pop", limit = 20) => {
  const response = await fetch(
    `${BASE_URL}?client_id=${API_KEY}&format=json&limit=${limit}&namesearch=${encodeURIComponent(
      query
    )}&audioformat=mp31`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch songs from Jamendo");
  }

  const data = await response.json();

  // Map to a simpler format your app can use
  return data.results.map((song) => ({
    id: song.id,
    title: song.name,
    artist: song.artist_name,
    album: song.album_name,
    image: song.image,     // album cover
    audio: song.audio,     // mp3 preview URL
    duration:
      Math.floor(song.duration / 60) +
      ":" +
      (song.duration % 60).toString().padStart(2, "0"),
  }));
};