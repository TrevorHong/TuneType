
import Lyrics from '../Components/Lyrics/Lyrics'
import Template from '../Components/Template/Template'
import React, { useState } from 'react';

function MusicType() {
  const [lyrics, setLyrics] = useState<string>(''); // State to hold the lyrics string

  const handleLyricsUpdate = (newLyrics: string) => {
    setLyrics(newLyrics);
  };

  return (
    <div>
    <iframe src="https://open.spotify.com/embed/playlist/5tt9xN5v58QpXuuHWeTI44?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    <Lyrics onLyricsUpdate={handleLyricsUpdate} ></Lyrics>
    <Template paragraph={lyrics}></Template>
    </div>
  )
}

export default MusicType