import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "../../../components/heading/Heading";
import AddEditCategoryForm from "../components/add-edit-category-from/AddEditCategoryForm";
import categoryApi from "../../../api/categoryApi";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

AddEditCategory.propTypes = {};

function AddEditCategory(props) {
  const [category, setCategory] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    (async () => {
      if (!id) return;

      try {
        const response = await categoryApi.get(id);
        setCategory(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const initialValue = {
    title: "",
    ...category,
  };

  const handleSubmit = async (values) => {
    try {
      if (!isEdit) {
        await categoryApi.add(values);

        enqueueSnackbar("Thêm danh mục thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        await categoryApi.update(id, values);

        enqueueSnackbar("Sửa mục thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
      navigate("/list-cat");
    } catch (error) {
      console.log(error);

      enqueueSnackbar(`${isEdit ? "Sửa" : "Thêm"} danh mục thất bại`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="add_edit_category">
      <Heading>Thêm danh mục</Heading>
      {(!isEdit || Boolean(category)) && (
        <AddEditCategoryForm
          onSubmit={handleSubmit}
          initialValue={initialValue}
          isEdit={isEdit}
        ></AddEditCategoryForm>
      )}
    </div>
  );
}

export default AddEditCategory;
