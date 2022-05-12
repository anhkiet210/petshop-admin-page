import React from "react";
import PropTypes from "prop-types";
import styles from "./sidebar.module.css";
import ListItem from "./components/list-item/ListItem";
import { Link } from "react-router-dom";

SideBar.propTypes = {};

function SideBar(props) {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>
        <Link to="/">Pet Shop</Link>
      </h3>
      <ListItem></ListItem>
    </div>
  );
}

export default SideBar;
