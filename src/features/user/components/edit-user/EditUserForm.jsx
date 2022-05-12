import React from "react";
import PropTypes from "prop-types";
import Heading from "../../../../components/heading/Heading";
import InputField from "../../../../components/form-control/inputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/Button";
import { useSelector } from "react-redux";

EditUserForm.propTypes = {};

function EditUserForm({ onSubmit }) {
  const user = useSelector((state) => state.user.currentUser);
  const isEdit = undefined;

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ...user,
    },
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
    <div className="edit_user">
      <Heading>Cập nhật thông tin cá nhân</Heading>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            label="Tên người dùng"
            name="name"
            id="name"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            label="Email"
            name="email"
            id="email"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            label="Số điện thoại"
            name="phone"
            id="phone"
          ></InputField>
        </div>
        <Button
          name="Chỉnh sửa"
          type="submit"
          bg="var(--blue)"
          loading={isSubmitting}
        ></Button>
      </form>
    </div>
  );
}

export default EditUserForm;
