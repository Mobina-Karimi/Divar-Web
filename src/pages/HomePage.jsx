// // import { useState } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import Main from "components/templates/Main";
// // import Sidebar from "components/templates/Sidebar";
// // import { getAllPosts } from "services/user";
// // import Loader from "components/modules/Loader";
// // import { getCategory } from "services/admin";
// // import Header from "layouts/Header";

// // const style = { display: "flex" };

// // function HomePage() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("همه");

// //   // دریافت داده‌های آگهی‌ها و دسته‌بندی‌ها
// //   const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
// //   const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

// //   // لیست دسته‌بندی‌ها
// //   const categoryList = categories ? [...categories.data] : [];

// //   // بررسی وجود "همه" در لیست دسته‌بندی‌ها
// //   if (!categoryList.some(category => category.name === "همه")) {
// //     categoryList.unshift({ name: "همه", slug: "all" });
// //   }

// //   // فیلتر آگهی‌ها براساس جستجو و دسته‌بندی انتخاب‌شده
// //   const filteredPosts = posts?.data?.posts.filter(post => {
// //     const matchesTitle = post?.options?.title?.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesCategory =
// //       selectedCategory === "همه" ||
// //       post.category === selectedCategory ||
// //       post?.options?.title?.toLowerCase().includes(selectedCategory.toLowerCase());
// //     return matchesTitle && matchesCategory;
// //   });

// //   // تابع تغییر دسته‌بندی
// //   const handleCategoryChange = (categoryName) => {
// //     setSelectedCategory(categoryName);
// //   };

// //   return (
// //     <>
// //       <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
// //       {(postLoading || categoryLoading) ? (
// //         <Loader />
// //       ) : (
// //         <div style={style}>
// //           <Sidebar
// //             categories={categoryList}
// //             selectedCategory={selectedCategory}
// //             onCategorySelect={handleCategoryChange}
// //           />
// //           <Main posts={{ data: { posts: filteredPosts } }} />
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default HomePage;



// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Main from "components/templates/Main";
// import Sidebar from "components/templates/Sidebar";
// import { getAllPosts } from "services/user";
// import Loader from "components/modules/Loader";
// import { getCategory } from "services/admin";
// import Header from "layouts/Header";

// // تعریف کلمات کلیدی برای هر دسته‌بندی
// const categoryKeywords = {
//   "املاک": ["خانه", "ملک", "مسکن"],
//   "خودرو": ["ماشین", "خودرو","موتور"],
//   "کالای دیجیتال": ["ساعت", "موبایل","تلفن همراه","گوشی","تلویزیون","tv","laptop","لپتاپ","کامپیوتر","رایانه","هوشمند","لپ تاپ","لبتاب","لب تاب"],
//   "وسایل شخصی": ["ساعت", "لباس"," پیراهن","شلوار","کفش","کیف","مانتو","ارابشی","انگشتر","گردنبند","گوشواره"],
//   "سرگرمی": ["تور", "دوچرخه"," موسیقی","ورزش","اسباب بازی","بلیط"],
//   "خدمات": ["شرکت", "اموزش"," تعمیرات","تعمیر","نصب","سرویس","مدل","نظافت","کار","استخدام"],
// };

// const style = { display: "flex" };

// function HomePage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("همه");

//   // دریافت داده‌های آگهی‌ها و دسته‌بندی‌ها
//   const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
//   const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

//   // لیست دسته‌بندی‌ها
//   const categoryList = categories ? [...categories.data] : [];
  
//   // بررسی وجود "همه" در لیست دسته‌بندی‌ها
//   if (!categoryList.some(category => category.name === "همه")) {
//     categoryList.unshift({ name: "همه", slug: "all" });
//   }

//   // فیلتر آگهی‌ها براساس جستجو و دسته‌بندی انتخاب‌شده
//   const filteredPosts = posts?.data?.posts.filter(post => {
//     const title = post?.options?.title?.toLowerCase() || "";
//     const description = post?.options?.description?.toLowerCase() || ""; // بررسی وجود description

//     const matchesKeywords = Object.entries(categoryKeywords).some(([category, keywords]) => {
//       return selectedCategory === category && 
//              keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
//     });

//     const matchesSearch = title.includes(searchQuery.toLowerCase()) ||
//                           description.includes(searchQuery.toLowerCase());

//     return (selectedCategory === "همه" || matchesKeywords) && matchesSearch;
//   });

//   // تابع تغییر دسته‌بندی
//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//   };

//   return (
//     <>
//       <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//       {(postLoading || categoryLoading) ? (
//         <Loader />
//       ) : (
//         <div style={style}>
//           <Sidebar
//             categories={categoryList}
//             selectedCategory={selectedCategory}
//             onCategorySelect={handleCategoryChange}
//           />
//           <Main posts={{ data: { posts: filteredPosts } }} />
//         </div>
//       )}
//     </>
//   );
// }

// export default HomePage;






import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import Header from "layouts/Header";
import styles from "./HomePage.module.css"; // مطمئن شوید که این import درست است

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [isDropdownOpen, setDropdownOpen] = useState(false); // برای کنترل منوی کشویی
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // دریافت داده‌های آگهی‌ها و دسته‌بندی‌ها
  const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
  const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

  // لیست دسته‌بندی‌ها
  const categoryList = categories ? [...categories.data] : [];

  if (!categoryList.some(category => category.name === "همه")) {
    categoryList.unshift({ name: "همه", slug: "all" });
  }

  // فیلتر آگهی‌ها براساس جستجو و دسته‌بندی انتخاب‌شده
  const filteredPosts = posts?.data?.posts.filter(post => {
    const title = post?.options?.title?.toLowerCase() || "";
    const description = post?.options?.description?.toLowerCase() || "";
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());

    return (selectedCategory === "همه" || title.includes(selectedCategory) || description.includes(selectedCategory)) && matchesSearch;
  });

  // تابع تغییر دسته‌بندی
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setDropdownOpen(false); // بستن منو پس از انتخاب دسته‌بندی
  };

  // برای به‌روزرسانی وضعیت موبایل/دسکتاپ هنگام تغییر اندازه پنجره
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // اضافه کردن event listener برای تغییر اندازه پنجره
  window.addEventListener("resize", handleResize);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {(postLoading || categoryLoading) ? (
        <Loader />
      ) : (
        <div className={styles.homePage}>
          {isMobile ? (
            /* حالت موبایل */
            <div className={styles.mobileView}>
              <div className={styles.categoryDropdown}>
                <select
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  value={selectedCategory}
                  className={styles.select}
                >
                  {categoryList.map((category) => (
                    <option key={category.slug} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={styles.icon} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                  {/* <img src="dropdown-icon.svg" alt="Open dropdown" /> */}
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {categoryList.map((category) => (
                      <div key={category.slug} onClick={() => handleCategoryChange(category.name)}>
                        {category.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.postsGrid}>
                <Main posts={{ data: { posts: filteredPosts } }} />
              </div>
            </div>
          ) : (
            /* حالت کامپیوتر */
            <div style={{ display: "flex" }}>
              <Sidebar
                categories={categoryList}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategoryChange}
              />
              <Main posts={{ data: { posts: filteredPosts } }} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
