import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChangeAvatarForm from "../components/ChangeAvatarForm";
import userApi from "../../../api/userApi";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import StorageKeys from "../../../constants/storage-keys";

ChangeAvatar.propTypes = {};

function ChangeAvatar(props) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  }, [user]);

  const handleSubmit = async (values, imgReview) => {
    const formData = new FormData();
    setLoading(true);
    try {
      formData.append("file", values[0]);
      await userApi.changeAvatar(formData);
      await dispatch(updateAvatar(imgReview));

      enqueueSnackbar("Đổi ảnh đại diện thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);

      enqueueSnackbar("Đổi ảnh đại diện thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="change_avatar">
      <ChangeAvatarForm
        onSubmit={handleSubmit}
        loading={loading}
        user={user}
      ></ChangeAvatarForm>
    </div>
  );
}

export default ChangeAvatar;
