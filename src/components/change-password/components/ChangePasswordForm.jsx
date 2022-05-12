import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../components/form-control/inputField/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../button/Button";

ChangePasswordForm.propTypes = {};

function ChangePasswordForm({ onSubmit }) {
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu cần ít nhất 6 ký tự"),
    retypePassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Nhập lại mật khẩu không đúng"),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      retypePassword: "",
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
    <div className="change_password_form">
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            type="password"
            name="password"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại..."
            id="password"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            type="password"
            name="password"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới..."
            id="password"
          ></InputField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            type="password"
            name="retypePassword"
            label="Nhập lại mật khẩu mới..."
            id="retypePassword"
            placeholder="Nhập lại mật khẩu mới..."
          ></InputField>
        </div>
        <div className="form-group">
          <Button
            name="Chỉnh sửa"
            type="submit"
            bg="var(--blue)"
            loading={isSubmitting}
          ></Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
