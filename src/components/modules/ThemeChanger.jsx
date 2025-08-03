// import { useState } from "react";
// import styles from "./ThemeChanger.module.css";

// function ThemeChanger() {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//   };

//   return (
//     <div className={styles.themeChanger}>
//       <button onClick={toggleTheme}>
//         تغییر تم
//       </button>
//     </div>
//   );
// }

// export default ThemeChanger;

import { useEffect, useState } from "react";
import styles from "./ThemeChanger.module.css";

function ThemeChanger() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles.toggleWrapper}>
      <button onClick={toggleTheme} className={`${styles.toggleButton} ${theme === "dark" ? styles.dark : ""}`}>
        <span className={styles.icon}>{theme === "dark" ? "☀️" : "🌙"}</span>
        <span className={styles.circle}></span>
      </button>
    </div>
  );
}

export default ThemeChanger;

