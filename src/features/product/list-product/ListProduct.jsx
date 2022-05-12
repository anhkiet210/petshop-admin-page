import React, { useState, useEffect, useRef } from "react";
import productApi from "../../../api/productApi";
import PropTypes from "prop-types";
import Loading from "../../../components/loading/Loading";
import styles from "./listproduct.module.css";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";
import Pagination from "../../../components/pagination/Pagination";
import { Delete, Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import Heading from "../../../components/heading/Heading";
import { formatPrice } from "../../../utils/common";

ListProduct.propTypes = {};

function ListProduct(props) {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [idDelete, setIdDelete] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const timerRef = useRef();
  const count = 6;
  const currentIndex = (page - 1) * count;

  const head = [
    "#",
    "danh mục",
    "tên sản phẩm",
    "giá",
    "số lượng",
    "hình ảnh",
    "thao tác",
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await productApi.getAll();
        setProduct(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [idDelete]);

  useEffect(() => {
    (async () => {
      const response = await categoryApi.getAll();
      setCategory(response);
    })();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
    setLoading(true);

    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDeleteProduct = async (id) => {
    const isDelete = window.confirm("Bạn có chắc chắn xóa");

    if (isDelete) {
      try {
        await productApi.remove(id);
        setIdDelete(id);

        enqueueSnackbar("xóa sản phẩm thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        
      } catch (error) {
        enqueueSnackbar("xóa sản phẩm thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/add-edit-product/${id}`);
  };

  return (
    <div className={styles.product__wrapper}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Heading>Danh sách sản phẩm</Heading>
          <Table head={head} data={product.slice(currentIndex, count * page)}>
            {(item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  {category.map((x, index) => {
                    if (x._id === item.idCategory) {
                      return <td key={index}>{x.title}</td>;
                    }
                  })}

                  <td style={{ maxWidth: "300px" }}>{item.productName}</td>
                  <td>{formatPrice(item.cost)}</td>
                  <td>{item.quantity}</td>
                  <td style={{ height: "64px" }}>
                    <img
                      width="40px"
                      style={{
                        borderRadius: "var(--radius)",
                        objectFit: "cover",
                      }}
                      src={item?.images[0]?.url}
                      alt=""
                    />
                  </td>
                  <td>
                    <span
                      className="btn-edit"
                      onClick={() => handleEditProduct(item._id)}
                    >
                      <Edit fontSize="16px"></Edit>
                    </span>
                    <span
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      <Delete fontSize="16px"></Delete>
                    </span>
                  </td>
                </tr>
              );
            }}
          </Table>
          <Pagination
            total={product && product.length}
            count={count}
            onChangePage={handlePageChange}
            currentPage={page}
            mgt="20px"
          ></Pagination>
        </>
      )}
    </div>
  );
}

export default ListProduct;
