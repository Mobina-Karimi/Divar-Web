// import { sp } from "utils/numbers";
// import styles from "./Main.module.css";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function Main({ posts }) {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const navigate = useNavigate();

//   const ShowDetailsHandler = (postId) => {
//     navigate(`/post/${postId}`);
//   };

//   return (
//     <div className={styles.container}>
//       {posts.data.posts.length > 0 ? (
//         posts.data.posts.map(post => (
//           <motion.div 
//             key={post._id} 
//             className={styles.card}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.1 }} 
//           >
//             <div className={styles.info}>
//               <div>
//                 <p>{post.options.title}</p>
//                 <span>قیمت: {sp(post.amount)} تومان</span>
//               </div>
//               <button onClick={() => ShowDetailsHandler(post._id)}>نمایش جزییات</button>
//             </div>
//             <img src={`${baseUrl}${post.images[0]}`} alt={post.options.title} loading="lazy"/>
//           </motion.div>
//         ))
//       ) : (
//         <p>هیچ آگهی‌ای مطابق با جستجوی شما پیدا نشد.</p>
//       )}
//     </div>
//   );
// }

// export default Main;



import { useState } from "react";
import { sp } from "utils/numbers";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PostImage({ src }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.imageWrapper}>
      {(!loaded || failed || !src) && (
        <div className={styles.imagePlaceholder}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>

          <span>
            {failed
              ? "تصویر در دسترس نیست"
              : src
                ? "در حال بارگذاری"
                : "تصویری موجود نیست"}
          </span>
        </div>
      )}

      {src && !failed && (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={loaded ? styles.loadedImage : styles.hiddenImage}
        />
      )}
    </div>
  );
}

function Main({ posts }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const ShowDetailsHandler = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={styles.container}>
      {posts.data.posts.length > 0 ? (
        posts.data.posts.map((post) => (
          <motion.div
            key={post._id}
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <div className={styles.info}>
              <div>
                <p>{post.options.title}</p>
                <span>قیمت: {sp(post.amount)} تومان</span>
              </div>

              <button onClick={() => ShowDetailsHandler(post._id)}>
                نمایش جزییات
              </button>
            </div>

            <PostImage
              src={
                post.images?.[0]
                  ? `${baseUrl}${post.images[0]}`
                  : ""
              }
            />
          </motion.div>
        ))
      ) : (
        <p>هیچ آگهی‌ای مطابق با جستجوی شما پیدا نشد.</p>
      )}
    </div>
  );
}

export default Main;
