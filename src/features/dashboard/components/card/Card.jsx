import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";

Card.propTypes = {};

function Card({ item }) {
  return (
    <div className={styles.card}>
      <div className="card_icon">{item.icon}</div>
      <div className="info">
        <h2 className={styles.info_count}>{item.count}</h2>
        <h3 className={styles.info_name}>{item.name}</h3>
      </div>
    </div>
  );
}

export default Card;
