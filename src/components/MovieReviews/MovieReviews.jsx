import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieReviews } from "../../services";

import ErrorFallback from "../ErrorFallback";
import Loader from "../Loader";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const isNotFound = reviews.length === 0;

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        const { results } = await getMovieReviews(movieId);

        const newReviews = results.map(({ id, author, content }) => ({
          id,
          author,
          content,
        }));

        setReviews(newReviews);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorFallback helperText="Something went wrong. Try again." />;
  }

  return (
    <>
      <h2 className={css.title}>Reviews</h2>
      {isNotFound ? (
        <p className={css.empty}>We don`t have any reviews for this movie.</p>
      ) : (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <div className={css.card}>
                <h3 className={css.author}>Author: {author}</h3>
                <p className={css.review}>{content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
