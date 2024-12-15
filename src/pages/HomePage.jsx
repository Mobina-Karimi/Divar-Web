import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import Header from "layouts/Header";
import styles from "./HomePage.module.css";

// تعریف کلمات کلیدی برای هر دسته‌بندی
const categoryKeywords = {
  "املاک": ["خانه", "ملک", "مسکن"],
  "خودرو": ["ماشین", "خودرو", "موتور"],
  "کالای دیجیتال": ["ساعت", "موبایل", "تلفن همراه", "گوشی", "تلویزیون", "tv", "laptop", "لپتاپ", "کامپیوتر", "رایانه", "هوشمند", "لپ تاپ", "لبتاب", "لب تاب"],
  "وسایل شخصی": ["ساعت", "لباس", "پیراهن", "شلوار", "کفش", "کیف", "مانتو", "ارابشی", "انگشتر", "گردنبند", "گوشواره"],
  "سرگرمی": ["تور", "دوچرخه", "موسیقی", "ورزش", "اسباب بازی", "بلیط"],
  "خدمات": ["شرکت", "اموزش", "تعمیرات", "تعمیر", "نصب", "سرویس", "مدل", "نظافت", "کار", "استخدام"],
};

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // دریافت داده‌ها
  const { data: posts, isLoading: postLoading } = useQuery(["post-list"], getAllPosts);
  const { data: categories, isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

  // به‌روزرسانی وضعیت موبایل در تغییر اندازه پنجره
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // آماده‌سازی لیست دسته‌بندی‌ها
  const categoryList = categories ? [...categories.data] : [];
  if (!categoryList.some(category => category.name === "همه")) {
    categoryList.unshift({ name: "همه", slug: "all" });
  }

  // فیلتر آگهی‌ها بر اساس جستجو و دسته‌بندی
  const filteredPosts = posts?.data?.posts.filter(post => {
    const title = post?.options?.title?.toLowerCase() || "";
    const description = post?.options?.description?.toLowerCase() || "";
    const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());

    const matchesKeywords = Object.entries(categoryKeywords).some(([category, keywords]) => {
      return selectedCategory === category &&
             keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
    });

    return (selectedCategory === "همه" || matchesKeywords) && matchesSearch;
  });

  // تغییر دسته‌بندی
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setDropdownOpen(false);
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {(postLoading || categoryLoading) ? (
        <Loader />
      ) : (
        <div className={styles.homePage}>
          {isMobile ? (
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
                  {/* آیکون کشویی */}
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
