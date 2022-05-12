import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../button/Button";

ChangeAvatarForm.propTypes = {};

function ChangeAvatarForm({ onSubmit, loading, user }) {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [urlFile, setUrlFile] = useState([]);
  const imgRef = useRef();

  const handleClickImg = () => {
    imgRef.current.click();
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(images, imagesPreview);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
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
          {imagesPreview.length === 0 && (
            <img
              style={{
                width: "120px",
                marginRight: "24px",
                borderRadius: "5px",
                marginBottom: "16px",
              }}
              src={user?.avatar}
              alt=""
            />
          )}
        </div>
        <div className="form-group">
          <Button
            name="Chỉnh sửa"
            type="submit"
            bg="var(--blue)"
            loading={loading}
          ></Button>
        </div>
      </form>
    </>
  );
}

export default ChangeAvatarForm;
