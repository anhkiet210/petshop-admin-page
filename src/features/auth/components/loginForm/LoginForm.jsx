import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-control/inputField/InputField";
import styles from "./loginform.module.css";

LoginForm.propTypes = {};

function LoginForm({ onSubmit }) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    password: yup.string().required("Please enter your password"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className={styles.login_form}>
      <h2 className={styles.login_heading}>Đăng nhập</h2>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            name="email"
            placeholder="Nhập email..."
            label="Email"
            id="email"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            name="password"
            placeholder="Nhập mật khẩu..."
            type="password"
            label="Mật khẩu"
            id="password"
          ></InputField>
        </div>
        <div className="form-group" style={{ textAlign: "right" }}>
          <button
            type="submit"
            className={styles.btn_login}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                size={16}
                sx={{ color: "#fff" }}
              ></CircularProgress>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
