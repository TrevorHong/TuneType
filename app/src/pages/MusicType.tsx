import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuthUrl, getAccessToken } from "../utils/spotifyAuth";
import Lyrics from '../Components/Lyrics/Lyrics';
import Template from '../Components/Template/Template';

function MusicType() {
  const [lyrics, setLyrics] = useState<string>(''); // State to hold the lyrics string
  const [accessToken, setAccessToken] = useState<string | null>(null); // State for the access token
  const [player, setPlayer] = useState<any>(null); // Spotify Player instance
  const [deviceId, setDeviceId] = useState<string | null>(null); // Device ID for playback
  const location = useLocation(); // Get URL parameters
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);


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
        });

        newPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Player ready with device ID', device_id);
          setDeviceId(device_id);
        });

        newPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Player not ready with device ID', device_id);
        });

        newPlayer.addListener('player_state_changed', (state: any) => {
          console.log('Player state changed', state);
        });
        newPlayer.addListener('player_state_changed', ( (state: any) => {

          if (!state) {
              return;
          }
      
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
      
      
          newPlayer.getCurrentState().then( (state: any) => { 
              (!state)? setActive(false) : setActive(true) 
          });
      
      }));
      

        newPlayer.connect();
        setPlayer(newPlayer);
      };

      loadSpotifySDK();
    }
  }, [accessToken, player]);

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
      <Lyrics onLyricsUpdate={handleLyricsUpdate} />
      <Template paragraph={lyrics} />
      <>
        <div className="container">
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url} 
                     className="now-playing__cover" alt="" />

                <div className="now-playing__side">
                    <div className="now-playing__name">{
                                  current_track.name
                                  }</div>

                    <div className="now-playing__artist">{
                                  current_track.artists[0].name
                                  }</div>
                </div>
            </div>
        </div>
     </>
      <button onClick={() => playSong('spotify:track:3n3Ppam7vgaVa1iaRUc9Lp')}>Play Song</button>
    </div>
  );
}

export default MusicType;

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}

