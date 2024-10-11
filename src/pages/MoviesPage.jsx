import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isAxiosError } from "axios";

import { searchMoviesByQuery } from "../services";
import { debounce } from "../utils/debounce";

import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import ErrorFallback from "../components/ErrorFallback";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const { results } = await searchMoviesByQuery(
          { query },
          controller.signal
        );
        const newMovies = results.map(({ id, title }) => ({ id, title }));
        setMovies(newMovies);
      } catch (error) {
        if (!(isAxiosError(error) && error.code === "ERR_CANCELED")) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [query]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleChangeSearchQuery = useCallback(
    debounce((query) => {
      setSearchParams({ query: query });
      setError(null);
    }, 300),
    [setSearchParams]
  );

  if (error) {
    return <ErrorFallback helperText="Something went wrong. Try again." />;
  }

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 12 }}>
        <SearchBar
          initialSearchQuery={query}
          onChangeSearchQuery={debouncedHandleChangeSearchQuery}
          loading={loading}
        />
      </div>

      {!!movies.length && <MovieList movies={movies} />}
    </div>
  );
}
