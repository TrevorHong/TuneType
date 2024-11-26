import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuthUrl, getAccessToken } from "../utils/spotifyAuth";
import Lyrics from '../Components/Lyrics/Lyrics';
import Template from '../Components/Template/Template';
import {fetchLyricsWithTitle} from "../Components/Lyrics/Lyrics";

function MusicType() {
  const [lyrics, setLyrics] = useState<string>(''); // State to hold the lyrics string
  const [accessToken, setAccessToken] = useState<string | null>(null); // State for the access token
  const [player, setPlayer] = useState<any>(null); // Spotify Player instance
  const [deviceId, setDeviceId] = useState<string | null>(null); // Device ID for playback
  const [songName, setSongName] = useState<string>(''); // Store song name to search for
  const [currentTrack, setCurrentTrack] = useState<any>(null); // Current track info
  const location = useLocation(); // Get URL parameters
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);

  const handleLyricsUpdate = (newLyrics: string) => {
    setLyrics(newLyrics);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code'); // Retrieve the authorization code from the URL

    if (!accessToken) {
      if (code) {
        (async () => {
          const token = await getAccessToken(code);
          setAccessToken(token);
          window.history.replaceState({}, document.title, window.location.pathname);
        })();
      } else {
        window.location.href = getAuthUrl();
      }
    }
  }, [accessToken, location.search]);

  useEffect(() => {
    if (accessToken && !player) {
      const loadSpotifySDK = () => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = () => initializeSpotifyPlayer();
        document.body.appendChild(script);
      };

      const initializeSpotifyPlayer = () => {
        const { Spotify } = window as any;

        if (!Spotify) {
          console.error("Spotify SDK not loaded");
          return;
        }

        const newPlayer = new Spotify.Player({
          name: 'Spotify Web Player',
          getOAuthToken: (cb: (token: string) => void) => {
            cb(accessToken);
          },
          volume: 0.1
        });

        newPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Player ready with device ID', device_id);
          setDeviceId(device_id);
        });

        newPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Player not ready with device ID', device_id);
        });

        newPlayer.addListener('player_state_changed', (state: any) => {
          if (state) {
            setCurrentTrack(state.track_window.current_track);
            setPaused(state.paused);
            newPlayer.getCurrentState().then((state: any) => {
              setActive(state ? true : false);
            });
          }
        });

        newPlayer.connect();
        setPlayer(newPlayer);
      };

      loadSpotifySDK();
    }
  }, [accessToken, player]);

  const searchSong = async (name: string) => {
    if (!accessToken) return;

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const fetchedLyrics = await fetchLyricsWithTitle(name);
    if (fetchedLyrics) {
      setLyrics(fetchedLyrics);
      console.log("Lyrics fetched successfully");
    }
    

    const data = await response.json();
    if (data.tracks.items.length > 0) {
      const track = data.tracks.items[0];
      console.log('Found track:', track);
      playSong(track.uri);
      
    } else {
      console.log('Track not found');
    }
  };

  const playSong = async (uri: string) => {
    if (!deviceId || !accessToken) return;
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongName(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchSong(songName);
  };

  if (!accessToken) {
    return <p>Authenticating with Spotify...</p>;
  }

  return (
    <div>
      <iframe
        src="https://open.spotify.com/embed/playlist/5tt9xN5v58QpXuuHWeTI44?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      {/* <Lyrics onLyricsUpdate={handleLyricsUpdate} /> */}

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={songName}
          onChange={handleSearchChange}
          placeholder="Search for a song"
        />
        <button type="submit">Search</button>
      </form>

      <div className="container">
        {currentTrack && (
          <div className="main-wrapper">
            <img
              src={currentTrack.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />
            <div className="now-playing__side">
              <div className="now-playing__name">{currentTrack.name}</div>
              <div className="now-playing__artist">{currentTrack.artists[0].name}</div>
            </div>
          </div>
        )}
      </div>
      <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
      &lt;&lt;
      </button>

      <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
          { isPaused ? "PLAY" : "PAUSE" }
      </button>

      <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
            &gt;&gt;
      </button>

      <button onClick={() => playSong('spotify:track:3n3Ppam7vgaVa1iaRUc9Lp')}>Play Song</button>
      <Template paragraph={lyrics} />

    </div>
    
  );
}

export default MusicType;
