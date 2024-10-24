// components/templates/SearchResultsPage.jsx
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTitlePosts } from "services/user";
import Loader from "components/modules/Loader";
import Main from "components/templates/Main";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || "";

  const { data: posts, isLoading } = useQuery(
    ["search-posts", query],
    () => getTitlePosts(query),
    {
      enabled: !!query, // جستجو فقط وقتی فعال می‌شود که کاربر متنی را تایپ کرده باشد
    }
  );

  return (
    <div>
      <h1>نتایج جستجو برای: {query}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Main posts={posts} />
      )}
    </div>
  );
}

export default SearchResultsPage;
