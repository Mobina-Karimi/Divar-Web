import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./404.module.css";

function PageNoteFound() {
  const navigate = useNavigate(); 
  const imageRef = useRef(null);

  const handleNavigateHome = () => {
    navigate("/"); 
  };

  useEffect(() => {
    const imageElement = imageRef.current;
    let playCount = 0;

    const handleAnimationEnd = () => {
      playCount += 1;
      if (playCount >= 3) {
        imageElement.style.animation = "none"; // توقف انیمیشن پس از 3 بار تکرار
      }
    };

    imageElement.addEventListener("animationend", handleAnimationEnd);

    return () => {
      imageElement.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img ref={imageRef} className={styles.image} src="/404img.png" alt="" loading="lazy" />
      <h3>این صفحه حذف شده یا وجود ندارد، برای دیدن  آگهی ها به صفحه اصلی دیوار برگردید.</h3>
      <button onClick={handleNavigateHome} className={styles.button}>صفحه اصلی دیوار</button>
    </div>
  );
}

export default PageNoteFound;
