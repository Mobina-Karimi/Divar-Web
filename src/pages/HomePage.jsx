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

  const { data: posts, isLoading: postLoading } = useQuery(
    ["post-list"],
    getAllPosts
  );

  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );

  // دریافت دسته‌بندی‌ها از API
  const categoryList = Array.isArray(categories?.data)
    ? categories.data
    : [];

  // دریافت آگهی‌ها از API
  const postsList = Array.isArray(posts?.data?.posts)
    ? posts.data.posts
    : [];

  // آماده‌سازی متن جست‌وجو
  const normalizedSearch = String(searchQuery ?? "")
    .trim()
    .toLowerCase();

  // تشخیص دسته‌بندی آگهی با استفاده از فایل categories.json
  const extractCategory = (title, description) => {
    const allText = `${title} ${description}`.toLowerCase();

    for (const category in categoryKeywords) {
      const keywords = categoryKeywords[category];

      if (
        Array.isArray(keywords) &&
        keywords.some((word) =>
          allText.includes(String(word).toLowerCase())
        )
      ) {
        return category;
      }
    }

    return "دسته‌بندی نامشخص";
  };

  // فیلتر آگهی‌ها بر اساس دسته‌بندی و جست‌وجو
  const filteredPosts = postsList.filter((post) => {
    const title = post?.options?.title?.toLowerCase() || "";
    const description = post?.options?.content?.toLowerCase() || "";

    const category = extractCategory(title, description);

    const matchesCategory =
      selectedCategory === "همه" ||
      category === selectedCategory;

    const matchesSearch =
      !normalizedSearch ||
      title.includes(normalizedSearch) ||
      description.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.homePage}>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className={styles.pageContent}>
          <Sidebar
            categories={categoryList}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <Main posts={{ data: { posts: filteredPosts } }} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
