import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

import css from "./GoBackLink.module.css";

export default function GoBackLink({ to }) {
  return (
    <Link className={css.link} to={to}>
      <HiArrowNarrowLeft />
      Go back
    </Link>
  );
}

GoBackLink.propTypes = {
  to: PropTypes.any.isRequired,
};
