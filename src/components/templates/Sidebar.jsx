// import styles from "./Sidebar.module.css";

// function Sidebar({ categories, selectedCategory, onCategorySelect }) {
//   // بررسی وجود دسته‌بندی‌ها
//   if (!categories || categories.length === 0) {
//     return <p>دسته‌بندی‌ای یافت نشد</p>;
//   }

//   return (
//     <div className={styles.sidebar}>
//       <h3>دسته بندی ها</h3>
//       <ul className={styles.categoryList}>
//         {/* نمایش گزینه "همه"   */}
//         <li>
//           <a
//             href="#"
//             className={selectedCategory === "همه" ? styles.active : ""}
//             onClick={(e) => {
//               e.preventDefault();
//               onCategorySelect("همه"); // انتخاب دسته‌بندی "همه"
//             }}
//           >
//             نمایش همه
//           </a>
//         </li>
        
//         {categories.filter(category => category.name !== "همه").map((category) => (
//           <li key={category._id || category.slug}>
//             <a
//               href="#"
//               className={selectedCategory === category.name ? styles.active : ""}
//               onClick={(e) => {
//                 e.preventDefault();
//                 onCategorySelect(category.name); // انتخاب دسته‌بندی مشخص
//               }}
//             >
//               <img src={`${category.icon}.svg`} alt={category.name} className={styles.icon} /> {/* آیکون دسته‌بندی */}
//               {category.name}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;


import styles from "./Sidebar.module.css";

function Sidebar({ categories, selectedCategory, onCategorySelect }) {
  if (!categories || categories.length === 0) {
    return <p>دسته‌بندی‌ای یافت نشد</p>;
  }

  return (
    <div className={styles.sidebar}>
      <h3>دسته بندی ها</h3>

      <ul className={styles.categoryList}>
        <li>
          <a
            href="#"
            className={selectedCategory === "همه" ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              onCategorySelect("همه");
            }}
          >
            نمایش همه
          </a>
        </li>

        {categories.map((category) => (
          <li key={category._id}>
            <a
              href="#"
              className={
                selectedCategory === category._id ? styles.active : ""
              }
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect(category._id);
              }}
            >
              <img
                src={`${category.icon}.svg`}
                alt={category.name}
                className={styles.icon}
              />
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
