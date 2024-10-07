import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieCredits } from "../../services";

import Loader from "../Loader";
import ErrorFallback from "../ErrorFallback";
import css from "./MovieCast.module.css";
import defaultAvatar from "../../assets/images/default_avatar.jpg";

const STATIC_URL = import.meta.env.VITE_API_STATIC_URL;

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const { cast } = await getMovieCredits(movieId);

        const newCast = cast.map(({ id, name, character, profile_path }) => ({
          id,
          name,
          character,
          profilePath: profile_path,
        }));

        setCast(newCast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorFallback helperText="Something went wrong. Try again." />;
  }

  return (
    <>
      <h2 className={css.title}>Cast</h2>
      <ul className={css.list}>
        {cast.map(({ id, name, character, profilePath }) => (
          <li key={id}>
            <div className={css.card}>
              <div className={css.thumb}>
                <img
                  className={css.image}
                  src={profilePath ? STATIC_URL + profilePath : defaultAvatar}
                  alt={name}
                  loading="lazy"
                />
              </div>

              <div className={css.info}>
                <h3 className={css.name}>{name}</h3>
                <p className={css.character}>Character: {character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
