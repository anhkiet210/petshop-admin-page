import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import styles from "./button.module.css";

Button.propTypes = {};

function Button(props) {
  const { name, color, type, loading, bg, clickImg, mt } = props;

  return (
    <button
      className={styles.btn}
      type={type}
      style={{
        color: color || "var(--white)",
        background: bg,
        marginTop: mt || "",
      }}
      onClick={clickImg && clickImg}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={16} sx={{ color: "#fff" }}></CircularProgress>
      ) : (
        name
      )}
    </button>
  );
}

export default Button;
