import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NotFoundSVG from "../assets/images/not_found.svg?react";

export default function NotFoundPage({ navigateTo, text = "Home page" }) {
  return (
    <div style={{ margin: "0 auto", maxWidth: "640px" }}>
      <NotFoundSVG width="100%" height="100%" />
      {navigateTo && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            style={{ display: "inline-block", fontSize: 24, color: "#212121" }}
            to={navigateTo}
          >
            {text}
          </Link>
        </div>
      )}
    </div>
  );
}

NotFoundPage.propTypes = {
  navigateTo: PropTypes.any,
  text: PropTypes.string,
};
