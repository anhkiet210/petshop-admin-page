import React from "react";
import PropTypes from "prop-types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styles from "./modal.module.css";

Modal.propTypes = {};

function Modal(props) {
  const { children, w, h, show, onClose } = props;

  return (
    <div
      className={styles.modal}
      style={
        show === "-50%"
          ? {
              opacity: "1",
              visibility: "visible",
              transform: `translate(-50%,${show})`,
            }
          : {}
      }
    >
      <div className={styles.modal_content} style={{ width: w, height: h }}>
        <div>{children}</div>
        <span className={styles.close_icon}>
          <CloseOutlinedIcon onClick={onClose}></CloseOutlinedIcon>
        </span>
      </div>
    </div>
  );
}

export default Modal;
