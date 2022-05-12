import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./tab.module.css";

Tab.propTypes = {};

function Tab({ data, currentStatus }) {
  const navigate = useNavigate();

  return (
    <ul className={styles.tab}>
      {data &&
        data.map((item, index) => {
          return (
            <li
              className={styles.tab_item}
              key={index}
              onClick={() => navigate("/list-order", { state: item?._id })}
              style={
                item?._id === currentStatus
                  ? { background: "var(--blue)", color: "var(--white)" }
                  : {}
              }
            >
              {item?.title}
            </li>
          );
        })}
    </ul>
  );
}

export default Tab;
