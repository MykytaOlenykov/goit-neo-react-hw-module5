import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";

import Loader from "../Loader";
import css from "./SearchBar.module.css";

export default function SearchBar({
  onChangeSearchQuery,
  loading,
  initialSearchQuery = "",
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    onChangeSearchQuery(value);
    setSearchQuery(value);
  };

  return (
    <div className={css.container}>
      <div className={css["input-container"]}>
        <IoIosSearch className={css.icon} />
        <input
          className={css.input}
          type="text"
          placeholder="Movie search..."
          onChange={handleChange}
          value={searchQuery}
        />
      </div>

      <div className={css["loader-container"]}>{loading && <Loader />}</div>
    </div>
  );
}

SearchBar.propTypes = {
  onChangeSearchQuery: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  initialSearchQuery: PropTypes.string,
};
