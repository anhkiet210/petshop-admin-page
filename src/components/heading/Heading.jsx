import React from "react";
import PropTypes from "prop-types";
import styles from "./heading.module.css";

Heading.propTypes = {};

function Heading(props) {
  return <h2 className={styles.heading}>{props.children}</h2>;
}

export default Heading;
