import { useEffect, useState, useRef, Suspense } from "react";
import { useLocation, useParams, Outlet } from "react-router-dom";
import { isAxiosError } from "axios";

import { getMovieDetails } from "../services";

import MovieDetailsCard from "../components/MovieDetailsCard";
import GoBackLink from "../components/GoBackLink";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";
import ErrorFallback from "../components/ErrorFallback";
import NotFoundPage from "./NotFoundPage";

const routes = [
  {
    title: "Cast",
    path: "cast",
  },
  {
    title: "Reviews",
    path: "reviews",
  },
];

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");
  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { poster_path, title, vote_average, overview, genres } =
          await getMovieDetails(movieId);

        setMovieDetails({
          posterPath: poster_path,
          title,
          voteAverage: vote_average,
          overview,
          genres,
        });
      } catch (error) {
        if (isAxiosError(error) && error.response.status === 404) {
          setNotFound(true);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [movieId]);

  if (notFound) {
    return (
      <NotFoundPage navigateTo={backLinkLocationRef.current} text="Go back" />
    );
  }

  if (error) {
    return (
      <div style={{ padding: 12 }}>
        <div style={{ marginBottom: 12 }}>
          <GoBackLink to={backLinkLocationRef.current} />
        </div>

        <ErrorFallback helperText="Something went wrong. Try again." />
      </div>
    );
  }

  if (loading || !movieDetails) {
    return <Loader />;
  }

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 12 }}>
        <GoBackLink to={backLinkLocationRef.current} />
      </div>

      <MovieDetailsCard movieDetails={movieDetails} />

      <div
        style={{
          margin: "12px 0",
          padding: 12,
          borderTop: "2px solid #757575",
          borderBottom: "2px solid #757575",
        }}
      >
        <h2 style={{ marginBottom: 12, fontSize: 24, lineHeight: 1.5 }}>
          Additional information
        </h2>

        <Navigation routes={routes} />
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
