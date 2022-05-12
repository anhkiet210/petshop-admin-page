import React, { useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-control/inputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

AddEditCategoryForm.propTypes = {};

function AddEditCategoryForm({ onSubmit, initialValue, isEdit }) {
  const schema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tên danh mục"),
  });

  const form = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (isEdit) {
      setValue("title", initialValue.title);
    } else {
      setValue("title", "");
    }
  }, [isEdit, initialValue.title]);

  const handleFormsubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div className="add_edit_category_form">
      <form onSubmit={form.handleSubmit(handleFormsubmit)}>
        <div className="form-group">
          <InputField
            form={form}
            name="title"
            id="title"
            placeholder="Nhập tên danh mục..."
            label="Nhập danh mục"
          ></InputField>
        </div>
        <div className="form-group">
          <Button
            name={isEdit ? "Chỉnh sửa" : "Thêm danh mục"}
            type="submit"
            bg="var(--blue)"
            loading={isSubmitting}
          ></Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCategoryForm;
