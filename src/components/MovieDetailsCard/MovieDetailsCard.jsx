import PropTypes from "prop-types";

import css from "./MovieDetailsCard.module.css";
import defaultMoviePoster from "../../assets/images/default_movie.jpg";

const STATIC_URL = import.meta.env.VITE_API_STATIC_URL;

export default function MovieDetailsCard({ movieDetails }) {
  const { posterPath, title, voteAverage, overview, genres } =
    movieDetails ?? {};

  const userScore = Math.round(voteAverage);

  return (
    <div className={css.container}>
      <div className={css.thumb}>
        <img
          className={css.image}
          src={posterPath ? STATIC_URL + posterPath : defaultMoviePoster}
          alt={title}
        />
      </div>

      <div>
        <h1 className={css.title}>{title}</h1>

        <p className={css["user-score"]}>User score: {userScore}</p>

        {overview && (
          <>
            <h2 className={css["overview-title"]}>Overview</h2>
            <p className={css.overview}>{overview}</p>
          </>
        )}

        <h2 className={css["genres-title"]}>Genres</h2>
        <ul className={css["genres-list"]}>
          {genres.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

MovieDetailsCard.propTypes = {
  movieDetails: PropTypes.exact({
    posterPath: PropTypes.string,
    title: PropTypes.string.isRequired,
    voteAverage: PropTypes.number.isRequired,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};
