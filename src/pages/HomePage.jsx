import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import styles from "./HomePage.module.css";

function HomePage({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [categoryKeywords, setCategoryKeywords] = useState({});

  const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
  const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);
  // const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory,{
  //   refetchInterval :3000
  // });

  useEffect(() => {
    const loadCategoryKeywords = async () => {
      const response = await fetch("/src/assets/files/categories.json");
      const data = await response.json();
      setCategoryKeywords(data);
    };

    loadCategoryKeywords();
  }, []);

  const categoryList = categories ? [...categories.data] : [];
  if (!categoryList.some(category => category.name === "همه")) {
    categoryList.unshift({ name: "همه", slug: "all" });
  }

  const extractCategory = (title, description) => {
    const allText = (title + " " + description).toLowerCase();

    for (let category in categoryKeywords) {
      if (categoryKeywords[category].some(word => allText.includes(word.toLowerCase()))) {
        return category;
      }
    }
    return "دسته‌بندی نامشخص";
  };

  const filteredPosts = posts?.data?.posts.filter(post => {
    const title = post?.options?.title?.toLowerCase() || "";
    const description = post?.options?.description?.toLowerCase() || "";

    const category = extractCategory(title, description);

    const matchesCategory = selectedCategory === "همه" || category === selectedCategory;
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className={styles.homePage}>
      {(postLoading || categoryLoading) ? (
          <Loader />
      ) : (
        <div className={styles.pageContent}>
          <Sidebar
            categories={categoryList}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange}
          />
          <Main posts={{ data: { posts: filteredPosts } }} />
        </div>
      )}
    </div>
  );
}

export default HomePage;


