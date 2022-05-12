import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import styles from "./selectfield.module.css";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function SelectField(props) {
  const { form, name, id, selectData, loading, mw } = props;
  const { control } = form;
  const {
    formState: { errors },
  } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error },
      }) => (
        <>
          <select
            name={name}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            className={styles.select}
            value={value}
            style={mw ? { minWidth: mw } : {}}
          >
            {loading && <option>Đang tải dữ liệu...</option>}
            {selectData &&
              selectData.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.title}
                  </option>
                );
              })}
          </select>
          {errors && (
            <div
              style={{
                margin: "-8px 0 8px 0",
                fontSize: "0.8rem",
                color: "red",
              }}
            >
              {error?.message}
            </div>
          )}
        </>
      )}
    ></Controller>
  );
}

export default SelectField;
