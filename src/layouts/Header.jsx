import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import MyDivarDropdown from "components/templates/MyDivarDropdown";

function Header({ searchQuery, setSearchQuery }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // بستن منو با کلیک خارج از آن
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // پاک کردن کوکی‌ها و انتقال به صفحه اصلی
    document.cookie = "accessToken=; max-age=0; path=/";
    document.cookie = "refreshToken=; max-age=0; path=/";
    window.location.href = "/";
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} alt="دیوار" />
        </Link>
        <span className={styles.location}>
          <img src="location.svg" alt="لوکیشن" />
          <p>تهران</p>
        </span>
      </div>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="جستجو در همه آگهی‌ها"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBox}
        />
      </div>

      <div className={styles.rightSection}>
        <span
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className={styles.profileButton}
        >
          <img src="profile.svg" alt="پروفایل" />
          <p>دیوار من</p>
        </span>

        {dropdownVisible && (
          <div ref={dropdownRef}>
            <MyDivarDropdown onLogout={handleLogout} />
          </div>
        )}

        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
