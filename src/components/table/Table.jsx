import React from "react";
import PropTypes from "prop-types";

Table.propTypes = {};

function Table(props) {
  const { head, children, data } = props;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {data && data.length > 0 ? (
              head &&
              head.map((item, index) => {
                return <th key={index}>{item}</th>;
              })
            ) : (
              <th>Không có dữ liệu</th>
            )}
          </tr>
        </thead>

        <tbody>{data && data.length > 0 ? data.map(children) : null}</tbody>
      </table>
    </div>
  );
}

export default Table;
