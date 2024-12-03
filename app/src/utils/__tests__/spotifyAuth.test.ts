import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAuthUrl, getAccessToken } from "../spotifyAuth";

const mockAxios = new MockAdapter(axios);

describe("Spotify Authentication Utility Functions", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  describe("getAuthUrl", () => {
    it("should generate the correct authorization URL", () => {
      const expectedUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=0c2f4db87f0d4e32aba7365b8b783556&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2FMusicType`;

      const url = getAuthUrl();
      expect(url).toBe(expectedUrl);
    });
  });

  describe("getAccessToken", () => {
    it("should fetch access token successfully", async () => {
      const mockCode = "mockAuthorizationCode";
      const mockAccessToken = "mockAccessToken123";

      mockAxios.onPost("https://accounts.spotify.com/api/token").reply(200, {
        access_token: mockAccessToken,
      });

      const token = await getAccessToken(mockCode);
      expect(token).toBe(mockAccessToken);
    });

    it("should throw an error when the API request fails", async () => {
        const mockCode = "mockAuthorizationCode";
        const mockErrorResponse = {
          error: {
            status: 400,
            message: "Invalid request",
          },
        };
      
        mockAxios.onPost("https://accounts.spotify.com/api/token").reply(400, mockErrorResponse);
      
        try {
          await getAccessToken(mockCode);
        } catch (error: any) {
          // Check if the error has the expected response structure
          expect(error.response?.status).toBe(400);
          expect(error.response?.data?.error?.message).toBe("Invalid request");
        }
      });
  });
});
