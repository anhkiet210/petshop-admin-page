import React, { useEffect } from "react";
import PropTypes from "prop-types";
import userApi from "../../api/userApi";
import EditUserForm from "./components/edit-user/EditUserForm";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../auth/userSlice";
import { useNavigate } from "react-router-dom";
import StorageKeys from "../../constants/storage-keys";

EditUser.propTypes = {};

function EditUser(props) {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  }, [user]);

  console.log("re render");

  const handleSubmit = async (values) => {
    try {
      await userApi.updateProfile(values);

      await dispatch(updateUser(values));

      enqueueSnackbar("Chỉnh sửa thông tin cá nhân thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Chỉnh sửa thông tin cá nhân thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div>
      <EditUserForm onSubmit={handleSubmit}></EditUserForm>
    </div>
  );
}

export default EditUser;
