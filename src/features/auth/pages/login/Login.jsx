import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "../../components/loginForm/LoginForm";
import { login } from "../../userSlice";
import styles from "./login.module.css";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const resultAction = await dispatch(login(values));
      unwrapResult(resultAction);

      if (unwrapResult) {
        navigate("/");
      }
      enqueueSnackbar("Đăng nhập thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      console.log("Đăng nhập thất bại", error);
      enqueueSnackbar("Sai email hoặc mật khẩu", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className={styles.login}>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </div>
  );
}

export default Login;
