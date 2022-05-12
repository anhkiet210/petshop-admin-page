import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./topmenu.module.css";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import { logout } from "../../features/auth/userSlice";

TopMenu.propTypes = {};

function TopMenu(props) {
  const [showDropdown, setShowDropDown] = useState(false);
  const [dataDropdown, setDataDropDown] = useState([
    {
      link: "edit-user",
      title: "Chỉnh sửa thông tin cá nhân",
    },
    {
      link: "/change-password",
      title: "Đổi mật khẩu",
    },
    {
      link: "/change-avatar",
      title: "Đổi ảnh đại diện",
    },
    {
      link: "/login",
      title: "Đăng xuất",
    },
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (item) => {
    setShowDropDown(!showDropdown);
    if (item.title === "Đăng xuất") {
      dispatch(logout());
    }
  };

  return (
    <>
      {user.name ? (
        <div className={styles.top_menu}>
          <div className={styles.top_menu_wrapper}>
            <span className={styles.avatar}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropDown(!showDropdown)}
              />
            </span>
            <span
              className={styles.name}
              style={{ cursor: "pointer" }}
              onClick={() => setShowDropDown(!showDropdown)}
            >
              {user.name}
            </span>
          </div>
          <Dropdown
            top="45px"
            right="17px"
            width="250px"
            background="var(--blue)"
            show={showDropdown}
          >
            {dataDropdown &&
              dataDropdown.map((item, index) => {
                return (
                  <li
                    className={styles.item}
                    key={index}
                    onClick={() => handleClick(item)}
                  >
                    <Link to={item.link}>{item.title}</Link>
                  </li>
                );
              })}
          </Dropdown>
        </div>
      ) : (
        <div className={styles.top_menu}>
          <Link to="/login">
            <Button type="button" name="Đăng nhập" bg="var(--blue)"></Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default TopMenu;
