// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Main from "components/templates/Main";
// import Sidebar from "components/templates/Sidebar";
// import { getAllPosts } from "services/user";
// import Loader from "components/modules/Loader";
// import { getCategory } from "services/admin";
// import styles from "./HomePage.module.css";

// function HomePage({ searchQuery, setSearchQuery }) {
//   const [selectedCategory, setSelectedCategory] = useState("همه");
//   const [categoryKeywords, setCategoryKeywords] = useState({});

//   const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
//   const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);
//   // const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory,{
//   //   refetchInterval :3000
//   // });

//   useEffect(() => {
//     const loadCategoryKeywords = async () => {
//       const response = await fetch("/src/assets/files/categories.json");
//       const data = await response.json();
//       setCategoryKeywords(data);
//     };

//     loadCategoryKeywords();
//   }, []);

//   const categoryList = categories ? [...categories.data] : [];
//   if (!categoryList.some(category => category.name === "همه")) {
//     categoryList.unshift({ name: "همه", slug: "all" });
//   }

//   const extractCategory = (title, description) => {
//     const allText = (title + " " + description).toLowerCase();

//     for (let category in categoryKeywords) {
//       if (categoryKeywords[category].some(word => allText.includes(word.toLowerCase()))) {
//         return category;
//       }
//     }
//     return "دسته‌بندی نامشخص";
//   };

//   const filteredPosts = posts?.data?.posts.filter(post => {
//     const title = post?.options?.title?.toLowerCase() || "";
//     const description = post?.options?.description?.toLowerCase() || "";

//     const category = extractCategory(title, description);

//     const matchesCategory = selectedCategory === "همه" || category === selectedCategory;
//     const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());

//     return matchesCategory && matchesSearch;
//   });

//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//   };

//   return (
//     <div className={styles.homePage}>
//       {(postLoading || categoryLoading) ? (
//           <Loader />
//       ) : (
//         <div className={styles.pageContent}>
//           <Sidebar
//             categories={categoryList}
//             selectedCategory={selectedCategory}
//             onCategorySelect={handleCategoryChange}
//           />
//           <Main posts={{ data: { posts: filteredPosts } }} />
//         </div>
//       )}
//     </div>
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

import categoryKeywords from "../assets/files/categories.json";

import styles from "./HomePage.module.css";

function HomePage({ searchQuery = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("همه");

  // دریافت آگهی‌ها از Backend
  const {
    data: posts,
    isLoading: postLoading,
  } = useQuery(["post-list"], getAllPosts);

  // دریافت دسته‌بندی‌ها از Backend
  const {
    data: categories,
    isLoading: categoryLoading,
  } = useQuery(["get-categories"], getCategory);

  // آماده‌سازی لیست دسته‌بندی‌ها
  const categoryList = Array.isArray(categories?.data)
    ? [...categories.data]
    : [];

  if (!categoryList.some((category) => category.name === "همه")) {
    categoryList.unshift({
      name: "همه",
      slug: "all",
    });
  }

  // تشخیص دسته‌بندی آگهی براساس عنوان و توضیحات
  const extractCategory = (title, content) => {
    const allText = `${title} ${content}`.toLowerCase();

    for (const category in categoryKeywords) {
      const keywords = categoryKeywords[category];

      if (
        keywords.some((word) =>
          allText.includes(word.toLowerCase())
        )
      ) {
        return category;
      }
    }

    return "دسته‌بندی نامشخص";
  };

  // دریافت لیست آگهی‌ها
  const postsList = posts?.data?.posts ?? [];

  // آماده‌سازی عبارت جست‌وجو
  const normalizedSearch = String(searchQuery ?? "")
    .trim()
    .toLowerCase();

  // فیلتر آگهی‌ها براساس دسته‌بندی و جست‌وجو
  const filteredPosts = postsList.filter((post) => {
    const title = post?.options?.title?.toLowerCase() || "";

    // در دیتابیس نام فیلد توضیحات content است
    const content = post?.options?.content?.toLowerCase() || "";

    // تشخیص دسته‌بندی آگهی
    const category = extractCategory(title, content);

    // بررسی دسته‌بندی انتخاب‌شده
    const matchesCategory =
      selectedCategory === "همه" ||
      category === selectedCategory;

    // بررسی عبارت جست‌وجو
    const matchesSearch =
      !normalizedSearch ||
      title.includes(normalizedSearch) ||
      content.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  // تغییر دسته‌بندی انتخاب‌شده
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className={styles.homePage}>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className={styles.pageContent}>
          <Sidebar
            categories={categoryList}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
          />

          <Main
            posts={{
              data: {
                posts: filteredPosts,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;

