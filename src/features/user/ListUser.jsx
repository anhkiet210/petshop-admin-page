import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Heading from "../../components/heading/Heading";
import userApi from "../../api/userApi";
import Table from "../../components/table/Table";
import { Delete } from "@mui/icons-material";
import Loading from "../../components/loading/Loading";

ListUser.propTypes = {};

function ListUser(props) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const head = ["id", "Tên người dùng", "Email", "Số điện thoại", "Thao tác"];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await userApi.getAllUser();

        setUser(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  const handleDeleteUser = (id) => {
    console.log(id);
  };

  return (
    <div className="list_user">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Heading>Danh sách người dùng</Heading>
          <Table head={head} data={user}>
            {(item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <span
                      className="btn-delete"
                      onClick={() => handleDeleteUser(item._id)}
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

export default ListUser;
