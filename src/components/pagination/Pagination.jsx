import React from "react";
import PropTypes from "prop-types";
import styles from "./pagination.module.css";

Pagination.propTypes = {};

function Pagination(props) {
  const { total, count, currentPage, onChangePage, mgt } = props;
  const countPage = Math.ceil(total / count);

  const handleChangePage = (page) => {
    if (onChangePage) {
      onChangePage(page);
    }
  };

  return (
    <div className={styles.pagination} style={mgt && { marginTop: mgt }}>
      <ul className={styles.list}>
        {countPage &&
          Array.from(new Array(countPage)).map((_, index) => {
            return (
              <li
                key={index}
                className={styles.item}
                onClick={() => handleChangePage(index + 1)}
                style={
                  index + 1 === currentPage
                    ? {
                        color: "var(--black)",
                        background: "var(--white)",
                        border: "1px solid var(--blue)",
                      }
                    : {}
                }
              >
                {index + 1}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Pagination;
