// src/utils/spotifyAuth.ts
import axios from "axios";

const CLIENT_ID = '0c2f4db87f0d4e32aba7365b8b783556';
const CLIENT_SECRET = '5b9db9f00019412292609f42c83f310c';
const REDIRECT_URI = "http://localhost:5173/MusicType";

export const getAuthUrl = () => {
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
  ].join(" ");
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
};

export const getAccessToken = async (code: string): Promise<string> => {
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
  };
  try {
      const response = await axios.post(tokenUrl, params, { headers });
      return response.data.access_token;
  } catch (error: any) {
    console.error('Failed to fetch access token:', error.response?.data || error.message);
    throw error;
  }
};
