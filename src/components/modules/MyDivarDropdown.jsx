import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyDivarDropdown.module.css";
import { getCookie } from "utils/cookie";

function MyDivarDropdown({ onLogout, userData }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      // اگر کوکی وجود داشت به داشبورد برو
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
      <div className={styles.option} onClick={handleLoginClick}>
        ورود به حساب کاربری
      </div>
      {userData && userData.role === "ADMIN" && ( // نمایش گزینه پنل ادمین اگر نقش کاربر ادمین باشد
        <div className={styles.option} onClick={handleAdminPanelClick}>
          ورود به پنل ادمین
        </div>
      )}
      <div className={styles.option} onClick={onLogout}>
        خروج از حساب کاربری
      </div>
    </div>
  );
}

export default MyDivarDropdown;
