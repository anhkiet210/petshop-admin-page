import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddEditProductForm from "./components/add-edit-product-form/AddEditProductForm";
import productApi from "../../../api/productApi";
import { useSnackbar } from "notistack";
import categoryApi from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

AddEditProduct.propTypes = {};

function AddEditProduct(props) {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [loadingCat, setLoadingCat] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = Boolean(id);

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      const response = await productApi.getById(id);
      setProduct(response);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      setLoadingCat(true);
      try {
        const response = await categoryApi.getAll();

        setLoadingCat(false);
        setCategory(response);
      } catch (error) {
        setLoadingCat(false);
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async (values, images, ckData) => {
    const uploadData = new FormData();

    if (images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        uploadData.append("file", images[i]);
      }
    }

    uploadData.append("productName", values.productName);
    uploadData.append("description", ckData);
    uploadData.append("quantity", values.quantity);
    uploadData.append("cost", values.cost);
    uploadData.append("idCategory", values.idCategory);

    try {
      if (!isEdit) {
        await productApi.add(uploadData);

        enqueueSnackbar("Thêm sản phẩm thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/list-product");
      } else {
        await productApi.update(id, uploadData);

        enqueueSnackbar("Sửa sản phẩm thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/list-product");
      }
    } catch (error) {
      enqueueSnackbar(
        `${!isEdit ? "Thêm sản phẩm thất bại" : "Sửa sản phẩm thất bại"}`,
        {
          variant: "error",
          autoHideDuration: 2000,
        }
      );
    }
  };

  return (
    <div>
      {(!isEdit || Boolean(product)) && (
        <AddEditProductForm
          product={isEdit && product}
          cat={category}
          onSubmit={handleSubmit}
          loading={loadingCat}
          isEdit={isEdit}
        ></AddEditProductForm>
      )}
    </div>
  );
}

export default AddEditProduct;
