import { Navigate, Route, Routes } from "react-router-dom";
import PageNoteFound from "pages/404";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import PostDetailsPage from "pages/PostDetailsPage";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "services/user";
import Loader from "components/modules/Loader";
import AdminPage from "pages/AdminPage";

function Router({ searchQuery, setSearchQuery }) {
  const {data, isLoading, error} = useQuery(["profile"], getProfile);

  if(isLoading) return <Loader/>
  
  return (
    <Routes>
      <Route
        index
        element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      />
      <Route path="/post/:id" element={<PostDetailsPage />} />
      <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to="/auth"/> } />
      <Route path="/auth" element={data ? <Navigate to="/dashboard"/> : <AuthPage />} />
      <Route path="/admin" element={data && data.data.role == "ADMIN" ? <AdminPage/> : <Navigate to="/" />} />
      <Route path="*" element={<PageNoteFound />} />
    </Routes>
  );
}

export default Router;

