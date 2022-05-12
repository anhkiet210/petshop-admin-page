import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import Heading from "../../../components/heading/Heading";
import ChangePasswordForm from "../components/ChangePasswordForm";

ChangePassword.propTypes = {};

function ChangePassword(props) {
  const user = useSelector((state) => state.user.currentUser);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (user) {
      try {
        await userApi.changePassword(user._id, values);

        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Đổi mật khẩu thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  return (
    <div className="change_password">
      <Heading>Đổi mật khẩu</Heading>
      <ChangePasswordForm onSubmit={handleSubmit}></ChangePasswordForm>
    </div>
  );
}

export default ChangePassword;
