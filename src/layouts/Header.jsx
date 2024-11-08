// import { Link } from "react-router-dom";
// import styles from "./Header.module.css";
// import MyDivarDropdown from "components/templates/MyDivarDropdown";
// // import UserMenu from "components/templates/UserMenu";

// function Header({ searchQuery, setSearchQuery }) {
//   return (
//     <header className={styles.header}>
//       <div>
//         <Link to="/">
//           <img src="divar.svg" className={styles.logo} />
//         </Link>
//         <span>
//           <img src="location.svg" />
//           <p>تهران</p>
//         </span>
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="جستجو در همه آگهی ها"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className={styles.searchBox}
//         />
//       </div>
//       <div>
//       <Link to="/auth">
//           <span>
//             <img src="profile.svg" />
//             <p>دیوار من</p>
//           </span>
//           {/* <MyDivarDropdown/> */}
//         </Link>
//         <Link to="/dashboard" className={styles.button}>ثبت آگهی</Link>
//       </div>
//     </header>
//   );
// }

// export default Header;



import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import MyDivarDropdown from "components/templates/MyDivarDropdown";

function Header({ searchQuery, setSearchQuery }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    // پاک کردن کوکی‌ها
    document.cookie = "accessToken=; max-age=0; path=/"; // پاک کردن کوکی
    document.cookie = "refreshToken=; max-age=0; path=/"; // پاک کردن کوکی
    window.location.href = "/"; // انتقال به صفحه اصلی
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <input
          type="text"
          placeholder="جستجو در همه آگهی ها"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBox}
        />
      </div>
      <div>
        <span onClick={() => setDropdownVisible(!dropdownVisible)}>
          <img src="profile.svg" />
          <p>دیوار من</p>
        </span>
        {dropdownVisible && (
          <MyDivarDropdown onLogout={handleLogout} />
        )}
        <Link to="/dashboard" className={styles.button}>ثبت آگهی</Link>
      </div>
    </header>
  );
}

export default Header;
