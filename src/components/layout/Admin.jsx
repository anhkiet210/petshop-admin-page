import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEditCategory from "../../features/category/page/AddEditCategory";
import ListCategory from "../../features/category/page/ListCategory";
import Dashboard from "../../features/dashboard/Dashboard";
import ListOrder from "../../features/order/pages/list-order/ListOrder";
import AddEditProduct from "../../features/product/add-edit-product/AddEditProduct";
import ListProduct from "../../features/product/list-product/ListProduct";
import EditUser from "../../features/user/EditUser";
import ListUser from "../../features/user/ListUser";
import ChangeAvatar from "../change-avatar/pages/ChangeAvatar";
import ChangePassword from "../change-password/pages/ChangePassword";
import SideBar from "../sidebar/SideBar";
import TopMenu from "../top-menu/TopMenu";

Admin.propTypes = {};

function Admin(props) {
  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <div style={{ flex: "1", padding: "24px" }}>
        <TopMenu></TopMenu>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/add-edit-product"
            element={<AddEditProduct></AddEditProduct>}
          ></Route>
          <Route
            path="/add-edit-product/:id"
            element={<AddEditProduct></AddEditProduct>}
          ></Route>
          <Route
            path="/list-product"
            element={<ListProduct></ListProduct>}
          ></Route>
          <Route
            path="/add-edit-cat"
            element={<AddEditCategory></AddEditCategory>}
          ></Route>
          <Route
            path="/add-edit-cat/:id"
            element={<AddEditCategory></AddEditCategory>}
          ></Route>
          <Route
            path="/list-cat"
            element={<ListCategory></ListCategory>}
          ></Route>
          <Route path="/list-user" element={<ListUser></ListUser>}></Route>
          <Route path="/edit-user" element={<EditUser></EditUser>}></Route>
          <Route
            path="/change-password"
            element={<ChangePassword></ChangePassword>}
          ></Route>
          <Route
            path="/change-avatar"
            element={<ChangeAvatar></ChangeAvatar>}
          ></Route>
          <Route
            path="/list-order"
            element={
              <ListOrder heading="Danh sách đơn hàng" status="all"></ListOrder>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
