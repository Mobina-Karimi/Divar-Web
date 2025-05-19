import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderDropdown.module.css";
import { getCookie } from "utils/cookie";

function HeaderDropdown({ onLogout, userData, setDropdownVisible }) {
  const navigate = useNavigate();

  const handleOptionClick = (callback) => {
    callback();
    setDropdownVisible(false); // بستن دراپ داون بعد از کلیک
  };

  const handleLoginClick = () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const handleAdminPanelClick = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.option} onClick={() => handleOptionClick(handleLoginClick)}>
        ورود به حساب کاربری
      </div>
      {userData && userData.role === "ADMIN" && (
        <div className={styles.option} onClick={() => handleOptionClick(handleAdminPanelClick)}>
          ورود به پنل ادمین
        </div>
      )}
      <div className={styles.option} onClick={() => handleOptionClick(onLogout)}>
        خروج از حساب کاربری
      </div>
    </div>
  );
}

export default HeaderDropdown;
