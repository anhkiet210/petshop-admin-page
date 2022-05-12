import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import styles from "./input.module.css";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disable, placeholder, type, id } = props;

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
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <input
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            name={name}
            value={value}
            disabled={disable}
            placeholder={placeholder}
            type={type ? type : "text"}
            className={styles.input}
          />
          {errors && (
            <div
              style={{
                margin: "-16px 0 8px 0",
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

export default InputField;
