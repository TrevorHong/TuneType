import React from "react";

interface SpotifyEmbedProps {
  uri: string;
  width?: number;
  height?: number;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ uri, width = 300, height = 380 }) => {
  const embedUrl = `https://open.spotify.com/embed/${uri}`;

  return (
    <iframe
      src={embedUrl}
      width={width}
      height={height}
      frameBorder="0"
      allow="encrypted-media"
      allowTransparency={true}
      style={{ borderRadius: "12px" }}
    />
  );
};

export default SpotifyEmbed;


