import { Delete, Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";
import userApi from "../../../api/userApi";
import Heading from "../../../components/heading/Heading";
import Loading from "../../../components/loading/Loading";
import Table from "../../../components/table/Table";

ListCategory.propTypes = {};

function ListCategory(props) {
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const head = ["id", "tên danh mục", "người tạo", "thao tác"];

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await categoryApi.getAll();

        setLoading(false);
        setCategory(response);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [idDelete]);

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

  const handleDeleteCategory = async (id) => {
    const isDelete = window.confirm("Bạn có chắc chắn xóa");

    if (isDelete) {
      try {
        await categoryApi.remove(id);
        setIdDelete(id);

        enqueueSnackbar("Đã xóa danh mục", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } catch (error) {
        enqueueSnackbar("xóa danh mục thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const handleEditCategory = (id) => {
    navigate(`/add-edit-cat/${id}`);
  };

  return (
    <div className="category">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Heading>Danh sách danh mục</Heading>
          <Table head={head} data={category}>
            {(item) => {
              return (
                <tr key={item._id}>
                  <td style={{ maxWidth: "300px" }}>{item._id}</td>
                  <td>{item.title}</td>

                  {user &&
                    user.map((x, index) => {
                      if (x._id === item.idUser) {
                        return <td key={index}>{x.name}</td>;
                      }
                    })}
                  <td>
                    <span
                      className="btn-edit"
                      onClick={() => handleEditCategory(item._id)}
                    >
                      <Edit fontSize="16px"></Edit>
                    </span>
                    <span
                      className="btn-delete"
                      onClick={() => handleDeleteCategory(item._id)}
                    >
                      <Delete fontSize="16px"></Delete>
                    </span>
                  </td>
                </tr>
              );
            }}
          </Table>
        </>
      )}
    </div>
  );
}

export default ListCategory;
