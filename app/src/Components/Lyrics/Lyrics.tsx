import React, { useState } from "react";
import { useEffect } from 'react';
import { getLyrics } from "@fantox01/lyrics-scraper";
import axios from 'axios';

interface LyricsProps {
  onLyricsUpdate: (lyrics: string) => void; // Prop to update lyrics
}

export const fetchLyricsWithTitle = async (songName: string) => {
    
  try {
    // setError(null); // Reset error
    // const data = await getLyrics(songTitle); // Fetch lyrics using the song title
      // const songName = songTitle;
    const response = await axios.get(`/api/get-lyrics?name=${songName}`);   //this api will work from dev env, need to make the getLyrics function call this end point instead.
      // const data = axios.get(`/api/${songName}`);   //this api will work from dev env, need to make the getLyrics function call this end point instead.

    if (response && response.data) {
      const lyrics = response.data.body
      const cleanedLyrics = cleanLyrics(lyrics);
      // setLyrics(lyrics); // Display lyrics in the textarea
      // onLyricsUpdate(cleanedLyrics);
      return cleanedLyrics;
      // console.log(data);
    } else {
      // setError("Lyrics not found");
      return null;
    }
  } catch (err) {
    // setError("Failed to fetch lyrics");
    return null;
  }
};

const cleanLyrics = (lyrics: string): string => {
  // Regular expression to remove text inside [] and ()
  return lyrics.replace(/\[.*?\]|\(.*?\)/g, '').trim();
};

const LyricsFetcher: React.FC<LyricsProps> = ({onLyricsUpdate}) => {

  // useEffect(() => {
  //   // Simulate fetching lyrics (replace this with actual logic)
  //   const fetchedLyrics = "Here are the lyrics of the song...";
    
  //   // Call the prop function to update the lyrics in the parent
  //   onLyricsUpdate(fetchedLyrics);
  // }, [onLyricsUpdate]); // Only runs on mount, or when onLyricsUpdate changes


  // State to store the song title input and fetched lyrics
  const [songTitle, setSongTitle] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  
  

  // Function to handle form submission and fetch lyrics
  const fetchLyrics = async () => {
    
    try {
      setError(null); // Reset error
      // const data = await getLyrics(songTitle); // Fetch lyrics using the song title
        // const songName = songTitle;
      const response = await axios.get(`/api/get-lyrics?name=${songTitle}`);   //this api will work from dev env, need to make the getLyrics function call this end point instead.
        // const data = axios.get(`/api/${songName}`);   //this api will work from dev env, need to make the getLyrics function call this end point instead.

      if (response && response.data) {
        const lyrics = response.data.body
        const cleanedLyrics = cleanLyrics(lyrics);
        setLyrics(lyrics); // Display lyrics in the textarea
        onLyricsUpdate(cleanedLyrics);
        // console.log(data);
      } else {
        setError("Lyrics not found");
      }
    } catch (err) {
      setError("Failed to fetch lyrics");
    }
  };



  return (
    <div>
      <h1>Lyrics Fetcher</h1>
      {/* Input for song title */}
      <input
        type="text"
        placeholder="Enter song title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />

      {/* Button to fetch lyrics */}
      <button
        onClick={fetchLyrics}
        style={{ padding: "10px 20px", marginBottom: "10px" }}
      >
        Fetch Lyrics
      </button>

      {/* Display any errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Textarea to display the lyrics */}
      <textarea
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)} // Allow editing the lyrics if needed
        rows={10}
        cols={50}
        placeholder="Lyrics will appear here..."
        style={{ width: "100%", padding: "10px" }}
      />
    </div>
  );
};

export default LyricsFetcher;
