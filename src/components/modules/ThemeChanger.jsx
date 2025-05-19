import { useState } from "react";
import styles from "./ThemeChanger.module.css";

function ThemeChanger() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={styles.themeChanger}>
      <button onClick={toggleTheme}>
        تغییر تم
      </button>
    </div>
  );
}

export default ThemeChanger;
