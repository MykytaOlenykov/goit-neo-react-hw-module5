import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
});

export const getMoviesTrending = async () => {
  const res = await api.get("/trending/movie/day");
  return res.data;
};

export const searchMoviesByQuery = async (params, signal) => {
  const res = await api.get("/search/movie", { params, signal });
  return res.data;
};

export const getMovieDetails = async (movieId) => {
  const res = await api.get(`/movie/${movieId}`);
  return res.data;
};

export const getMovieCredits = async (movieId) => {
  const res = await api.get(`/movie/${movieId}/credits`);
  return res.data;
};

export const getMovieReviews = async (movieId) => {
  const res = await api.get(`/movie/${movieId}/reviews`);
  return res.data;
};
