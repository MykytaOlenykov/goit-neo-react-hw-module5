import PropTypes from "prop-types";

import Loader from "../Loader";
import css from "./SearchBar.module.css";

export default function SearchBar({ onChangeSearchQuery, loading }) {
  const handleChange = (e) => {
    onChangeSearchQuery(e.target.value.trim());
  };

  return (
    <div className={css.container}>
      <input
        className={css.input}
        type="text"
        placeholder="Movie search..."
        onChange={handleChange}
      />
      <div className={css["loader-container"]}>{loading && <Loader />}</div>
    </div>
  );
}

SearchBar.propTypes = {
  onChangeSearchQuery: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
