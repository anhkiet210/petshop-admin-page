import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../../components/form-control/inputField/InputField";
import Button from "../../../../../components/button/Button";
import SelectField from "../../../../../components/form-control/selectField/SelectField";
import styles from "./addeditform.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

AddEditProductForm.propTypes = {};

function AddEditProductForm({ onSubmit, cat, loading, product, isEdit }) {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [ckData, setCkData] = useState();
  const [urlFile, setUrlFile] = useState([]);
  const imgRef = useRef();

  useEffect(() => {
    const ckEditors = document.querySelectorAll(
      ".ck.ck-reset.ck-editor.ck-rounded-corners"
    );

    ckEditors &&
      ckEditors.forEach((item, index) => {
        if (index !== 0) {
          item.style.display = "none";
        }
      });
  });

  useEffect(() => {
    if (product) {
      setValue("productName", product.productName);
      setValue("cost", product.cost);
      setValue("quantity", product.quantity);
      setValue("idCategory", product.idCategory);
    }

    if (!isEdit) {
      setValue("productName", "");
      setValue("cost", 0);
      setValue("quantity", 0);
      setValue("idCategory", "624702df787498345e8966bd");
    }
  }, [product]);

  const schema = yup.object().shape({
    productName: yup.string().required("Vui lòng nhập tên sản phẩm"),
  });

  const defaultValues = {
    productName: "",
    quantity: 0,
    cost: 0,
    idCategory: "624702df787498345e8966bd",
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const handleChangeImages = (e) => {
    setImages(e.target.files);
    const urlArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      urlArray.push(URL.createObjectURL(e.target.files[i]));
    }
    setUrlFile(urlArray);

    setImagesPreview([]);

    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values, images, ckData);
    }
  };

  const handleClickImg = () => {
    imgRef.current.click();
  };

  return (
    <div className="add_edit_product">
      <h2 className={styles.heading}>
        {!product ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
      </h2>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <InputField
            form={form}
            name="productName"
            label="Nhập tên sản phẩm"
            id="productName"
            placeholder="Nhập tên sản phẩm..."
          ></InputField>
        </div>

        <div className="ck-wrapper">
          <label htmlFor="#" className={styles.label}>
            Nhập mô tả
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={product ? product.description : "Nhập mô tả..."}
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            // }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCkData(data);
            }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </div>

        <div className="form-group">
          <InputField
            form={form}
            name="quantity"
            label="Nhập số lượng"
            id="quantity"
            placeholder="Nhập số lượng"
          ></InputField>
        </div>
        <div className="form-group">
          <SelectField
            form={form}
            name="idCategory"
            id="idCategory"
            selectData={cat}
            loading={loading}
          ></SelectField>
        </div>
        <div className="form-group">
          <InputField
            form={form}
            name="cost"
            label="Nhập giá"
            id="cost"
            placeholder="Nhập giá..."
          ></InputField>
        </div>
        <div className="form-group" style={{ marginBottom: "24px" }}>
          <input
            ref={imgRef}
            type="file"
            name="file"
            onChange={handleChangeImages}
            hidden
            multiple
          />
          <Button
            type="button"
            name="Chọn ảnh"
            bg="var(--blue)"
            clickImg={handleClickImg}
          ></Button>
        </div>
        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
          {imagesPreview &&
            imagesPreview.map((item, index) => {
              return (
                <img
                  style={{
                    width: "120px",
                    marginRight: "24px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                  }}
                  src={item}
                  key={index}
                  alt=""
                />
              );
            })}
        </div>
        {isEdit &&
          product &&
          imagesPreview.length === 0 &&
          product.images?.map((item, index) => {
            return (
              <img
                style={{
                  width: "120px",
                  marginRight: "24px",
                  borderRadius: "5px",
                  marginBottom: "16px",
                }}
                src={item.url}
                key={index}
                alt=""
              />
            );
          })}
        {imagesPreview.length === 0 && !isEdit && (
          <img
            style={{
              width: "120px",
              marginRight: "24px",
              borderRadius: "5px",
              marginBottom: "16px",
            }}
            src="https://via.placeholder.com/150"
            alt=""
          />
        )}
        <div className="form-group">
          <Button
            name={isEdit ? "Chỉnh sửa" : "Thêm sản phẩm"}
            type="submit"
            bg="var(--blue)"
            loading={isSubmitting}
          ></Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditProductForm;
