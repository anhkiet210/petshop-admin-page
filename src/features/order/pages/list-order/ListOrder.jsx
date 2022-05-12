import { Delete } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import orderApi from "../../../../api/orderApi";
import productApi from "../../../../api/productApi";
import userApi from "../../../../api/userApi";
import Button from "../../../../components/button/Button";
import SelectField from "../../../../components/form-control/selectField/SelectField";
import Heading from "../../../../components/heading/Heading";
import Loading from "../../../../components/loading/Loading";
import Modal from "../../../../components/modal/Modal";
import Tab from "../../../../components/tab/Tab";
import Table from "../../../../components/table/Table";
import { formatPrice } from "../../../../utils/common";
import styles from "./listorder.module.css";

ListOrder.propTypes = {};

function ListOrder({ status, heading }) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [loadingDetailOrder, setLoadingDetailOrder] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [setStatus, setSetStatus] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  const [showModal, setShowModal] = useState("-100%");
  const [listUpdateQty, setListUpdateQty] = useState([])

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();

  const initialValue = { status: orderDetail.status || "Đang chờ xác nhận" };
  const form = useForm({
    defaultValues: initialValue,
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  if (orderDetail.status && !isSubmitting) {
    setValue("status", orderDetail.status);
  }

  const head = [
    "id",
    "Tên khách hàng",
    "Tổng tiền",
    "Ngày đặt hàng",
    "Trạng thái",
    "Chi tiết",
    "Thao tác",
  ];

  const orderHead = [
    "#",
    "Tên sản phẩm",
    "Ảnh sản phẩm",
    "Giá sản phẩm",
    "Số lượng",
  ];

  const orderStatus = [
    {
      _id: "Đang chờ xác nhận",
      title: "Đang chờ xác nhận",
    },
    {
      _id: "Đang chờ giao hàng",
      title: "Đang chờ giao hàng",
    },
    {
      _id: "Đã giao",
      title: "Đã giao",
    },
    {
      _id: "Hủy đơn hàng",
      title: "Hủy đơn hàng",
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await orderApi.getOrderByStatus(status);

        setOrder(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [status, setStatus, deleteId]);


  useEffect(() => {
    if (!idOrder) return;

    (async () => {
      setLoadingDetailOrder(true);
      try {
        const response = await orderApi.getById(idOrder);

        setLoadingDetailOrder(false);
        setOrderDetail(response);
      } catch (error) {
        console.log(error);
        setLoadingDetailOrder(false);
      }
    })();
  }, [idOrder, setStatus]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll();
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getAllUser();
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect( () => {
    (
      () => {
        const temp = []
        for(let i = 0; i < product?.length ; i++){
          for(let j = 0; j < orderDetail?.productDetails?.length; j ++ ){
            if(product[i]?._id === orderDetail?.productDetails[j]?.idProduct){
              const temp1 = {...product[i], ...orderDetail?.productDetails[j]}
              temp.push(temp1)
            }
          }
        }
        setListUpdateQty(temp)
      } 
    )();
  }, [orderDetail, product])

  const handleShowDetailModal = (id) => {
    setIdOrder(id);
    setShowModal("-50%");
  };

  const handleCloseModel = () => {
    setShowModal("-100%");
  };

  const handleFormSubmit = async (values) => {
    try {
      await orderApi.updateStatus(orderDetail?._id, values);
      if(values.status === "Đã giao"){
        for(let i = 0; i < listUpdateQty?.length; i++){
          const uploadData = new FormData()
          const idUpdateQty = listUpdateQty[i]
          const qty = listUpdateQty[i]?.quantity - listUpdateQty[i]?.quantityPurchased
          uploadData.append("quantity", qty)
          await productApi.update(idUpdateQty.idProduct, uploadData)
        }
      }

      enqueueSnackbar("Cập nhật trạng thái thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setSetStatus(values + Math.random());
      setShowModal("-100%");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cập nhật trạng thái thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleDeleteOrder = async (id) => {
    const isDelete = window.confirm("Bạn có chắc chắn xóa");

    if (isDelete) {
      try {
        await orderApi.remove(id);

        setDeleteId(id);
        enqueueSnackbar("Xóa đơn hàng thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Xóa đơn hàng thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  // console.log(listUpdateQty);

  return (
    <>
      <div className={styles.list_order}>
        <h3 className={styles.list_order_heading}>
          {heading ? heading : "Đơn hàng đang chờ xách nhận"}
        </h3>
        {status === "all" && (
          <Tab
            currentStatus={state || "Đang chờ xác nhận"}
            data={orderStatus}
          ></Tab>
        )}
        {loading ? (
          <div style={{ fontSize: "0.9rem" }}>
            <LinearProgress color="primary"></LinearProgress>
          </div>
        ) : (
          <Table
            head={head}
            data={
              status !== "all"
                ? order
                    .filter((x) => x.status === "Đang chờ xác nhận")
                    .reverse()
                : state
                ? order.filter((x) => x.status === state).reverse()
                : order
                    .filter((x) => x.status === "Đang chờ xác nhận")
                    .reverse()
            }
          >
            {(item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  {user &&
                    user.map((x, index) => {
                      if (x._id === item?.idCustomer) {
                        return <td key={index}>{x.name}</td>;
                      }
                    })}
                  <td>{formatPrice(item.totalCost)}</td>
                  <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                  <td>
                    <span
                      className={`${
                        item.status === "Đang chờ xác nhận"
                          ? "processing"
                          : item.status === "Đang chờ giao hàng"
                          ? "shipping"
                          : item.status === "Đã giao"
                          ? "deliverd"
                          : item.status === "Hủy đơn hàng"
                          ? "refuse"
                          : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td
                    onClick={() => handleShowDetailModal(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    chi tiết
                  </td>
                  <td>
                    <span
                      className="btn-delete"
                      onClick={() => handleDeleteOrder(item._id)}
                    >
                      <Delete fontSize="16px"></Delete>
                    </span>
                  </td>
                </tr>
              );
            }}
          </Table>
        )}
        <Modal w="900px" h="600px" show={showModal} onClose={handleCloseModel}>
          {loadingDetailOrder ? (
            <Loading></Loading>
          ) : (
            <>
              <div className="order_info">
                <Heading>Thông tin đơn hàng</Heading>
                <div className={styles.order_info_group}>
                  <h5>Mã đơn hàng</h5>
                  <span>{orderDetail?._id}</span>
                </div>
                <div className={styles.order_info_group}>
                  <h5>Địa chỉ</h5>
                  <span>{orderDetail?.address}</span>
                </div>
                <div className={styles.order_info_group}>
                  <h5>Tên Khách hàng</h5>
                  {user &&
                    user.map((item, index) => {
                      if (item._id === orderDetail?.idCustomer) {
                        return <span key={index}>{item.name}</span>;
                      }
                    })}
                </div>
                <div className={styles.order_info_group}>
                  <h5>Thông tin vận chuyển</h5>
                  <span>{orderDetail?.payments}</span>
                </div>
                <div className={styles.order_info_group}>
                  <h5>Phí ship</h5>
                  <span>{formatPrice(orderDetail?.shipCost)}</span>
                </div>
                <div className={styles.order_info_group}>
                  <h5>Trạng thái đơn hàng</h5>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <SelectField
                      form={form}
                      name="status"
                      id="status"
                      selectData={orderStatus}
                      mw="200px"
                    ></SelectField>
                    <Button
                      name="Chỉnh sửa trạng thái"
                      type="submit"
                      bg="var(--blue)"
                      loading={isSubmitting}
                      mt="0"
                    ></Button>
                  </form>
                </div>
                <div className={styles.order_info_group}>
                  <h5>Tổng tiền</h5>
                  <span>{formatPrice(orderDetail?.totalCost)}</span>
                </div>
              </div>
              <Heading>Chi tiết sản phẩm</Heading>
              <Table head={orderHead} data={product}>
                {(item) => {
                  return (
                    orderDetail.productDetails &&
                    orderDetail.productDetails.map((x, index) => {
                      if (x.idProduct === item._id) {
                        return (
                          <tr key={x._id}>
                            <td>{index + 1}</td>
                            <td style={{ maxWidth: "300px" }}>
                              {item.productName}
                            </td>
                            <td>
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
                            <td>{formatPrice(item.cost)}</td>
                            <td>{x.quantityPurchased}</td>
                          </tr>
                        );
                      }
                    })
                  );
                }}
              </Table>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}

export default ListOrder;
