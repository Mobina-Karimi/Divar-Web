// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Main from "components/templates/Main";
// import Sidebar from "components/templates/Sidebar";
// import { getAllPosts } from "services/user";
// import Loader from "components/modules/Loader";
// import { getCategory } from "services/admin";
// import Header from "layouts/Header";

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
//     const matchesTitle = post.options.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = 
//       selectedCategory === "همه" || 
//       post.category === selectedCategory || 
//       post.options.title.toLowerCase().includes(selectedCategory.toLowerCase());
//     return matchesTitle && matchesCategory;
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

const style = { display: "flex" };

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  // دریافت داده‌های آگهی‌ها و دسته‌بندی‌ها
  const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
  const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

  // لیست دسته‌بندی‌ها
  const categoryList = categories ? [...categories.data] : [];

  // بررسی وجود "همه" در لیست دسته‌بندی‌ها
  if (!categoryList.some(category => category.name === "همه")) {
    categoryList.unshift({ name: "همه", slug: "all" });
  }

  // فیلتر آگهی‌ها براساس جستجو و دسته‌بندی انتخاب‌شده
  const filteredPosts = posts?.data?.posts.filter(post => {
    const matchesTitle = post?.options?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "همه" ||
      post.category === selectedCategory ||
      post?.options?.title?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesTitle && matchesCategory;
  });

  // تابع تغییر دسته‌بندی
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {(postLoading || categoryLoading) ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar
            categories={categoryList}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
          />
          <Main posts={{ data: { posts: filteredPosts } }} />
        </div>
      )}
    </>
  );
}

export default HomePage;


