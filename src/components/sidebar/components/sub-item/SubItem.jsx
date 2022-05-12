import React from "react";
import PropTypes from "prop-types";
import styles from "./subitem.module.css";
import { Link } from "react-router-dom";

SubItem.propTypes = {
  onClose: PropTypes.func,
  onShow: PropTypes.bool,
  item: PropTypes.object,
};

function SubItem(props) {
  const { onShow, onClose, item } = props;

  return (
    <>
      <div
        className={`${styles.subItem}`}
        style={
          onShow
            ? {
                height: "auto",
                transform: "translateY(0)",
                display: "block",
              }
            : {}
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className={styles.subItem__item} onClick={onClose}>
            <Link to={item.add_link}>{item?.add}</Link>
          </span>
          <span className={styles.subItem__item} onClick={onClose}>
            <Link to={item.list_link}>{item?.list}</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default SubItem;
