import React from "react";
import PropTypes from "prop-types";
import styles from "./dropdown.module.css";

Dropdown.propTypes = {};

function Dropdown({ children, top, right, width, background, show }) {
  return (
    <div
      className={styles.dropdown}
      style={
        top && right && width
          ? {
              top,
              right,
              width,
              background,
              opacity: show ? "1" : "0",
              visibility: show ? "visible" : "hidden",
              transform: show ? "translateY(0)" : "translateY(100%)",
            }
          : {}
      }
    >
      <div className={styles.dropdown_content}>{children}</div>
    </div>
  );
}

export default Dropdown;
