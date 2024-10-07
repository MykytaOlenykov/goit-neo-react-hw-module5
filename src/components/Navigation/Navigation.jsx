import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import css from "./Navigation.module.css";

export default function Navigation({ routes }) {
  return (
    <nav>
      <ul className={css.list}>
        {routes.map(({ path, title }) => (
          <li key={path}>
            <NavLink className={css.link} to={path}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
