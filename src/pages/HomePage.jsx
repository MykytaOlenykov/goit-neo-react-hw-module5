import { useState, useEffect } from "react";

import { getMoviesTrending } from "../services";

import MovieList from "../components/MovieList";
import Loader from "../components/Loader";
import ErrorFallback from "../components/ErrorFallback";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { results } = await getMoviesTrending();
        const newMovies = results.map(({ id, title }) => ({ id, title }));
        setMovies(newMovies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <ErrorFallback helperText="Something went wrong. Try again." />;
  }

  return (
    <div style={{ padding: 12 }}>
      <h1 style={{ marginBottom: 12, fontSize: 28, lineHeight: 1.5 }}>
        Trending today
      </h1>

      {!!movies.length && <MovieList movies={movies} />}
      {loading && <Loader />}
    </div>
  );
}
