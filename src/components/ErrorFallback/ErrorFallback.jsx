import PropTypes from "prop-types";

import css from "./ErrorFallback.module.css";
import ErrorSVG from "../../assets/images/error.svg?react";

export default function ErrorFallback({ helperText }) {
  return (
    <div style={{ margin: "0 auto", maxWidth: "640px" }}>
      <ErrorSVG width="100%" height="100%" />
      {helperText && <p className={css.text}>{helperText}</p>}
    </div>
  );
}

ErrorFallback.propTypes = {
  helperText: PropTypes.node,
};
