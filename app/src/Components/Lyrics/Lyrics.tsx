import React, { useState } from "react";
import { getLyrics } from "@fantox01/lyrics-scraper";
// import axios from 'axios';


const LyricsFetcher: React.FC = () => {
  // State to store the song title input and fetched lyrics
  const [songTitle, setSongTitle] = useState<string>("");
  const [lyrics, setLyrics] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Function to handle form submission and fetch lyrics
  const fetchLyrics = async () => {
    try {
      setError(null); // Reset error
      const data = await getLyrics(songTitle); // Fetch lyrics using the song title
        // const data = axios.get(`https://cors-anywhere.herokuapp.com/https://genius.com/api/search/multi?per_page=1&q=$happy`);   this api will work from dev env, need to make the getLyrics function call this end point instead.
      if (data) {
        setLyrics(data); // Display lyrics in the textarea
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
