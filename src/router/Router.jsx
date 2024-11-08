// import { Navigate, Route, Routes } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import PageNoteFound from "pages/404";
// import AdminPage from "pages/AdminPage";
// import AuthPage from "pages/AuthPage";
// import DashboardPage from "pages/DashboardPage";
// import HomePage from "pages/HomePage";
// import SearchResultsPage from "components/templates/SearchResultsPage";
// import { getProfile } from "services/user";
// import Loader from "components/modules/Loader";
// import PostDetailsPage from '../pages/PostDetailsPage';

// function Router() {
//   const { data, isLoading } = useQuery(["profile"], getProfile);

//   if (isLoading) return <Loader />;

//   return (
//     <Routes>
//       <Route index element={<HomePage />} />
//       <Route path="/post/:id" element={<PostDetailsPage />} />
//       <Route path="/search" element={<SearchResultsPage />} />
//       <Route path='/dashboard' element={data ? <DashboardPage /> : <Navigate to="/auth" />} />
//       <Route path='/auth' element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />
//       <Route path='/admin' element={
//         data && data.data.role === "ADMIN" ? (
//           <AdminPage />
//         ) : (
//           <Navigate to="/" />
//         )
//       } />
//       <Route path='*' element={<PageNoteFound />} />
//     </Routes>
//   );
// }

// export default Router;



import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageNoteFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import SearchResultsPage from "components/templates/SearchResultsPage";
import { getProfile } from "services/user";
import Loader from "components/modules/Loader";
import PostDetailsPage from '../pages/PostDetailsPage';

function Router() {
  const { data, isLoading } = useQuery(["profile"], getProfile);

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/post/:id" element={<PostDetailsPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route 
        path='/dashboard' 
        element={data && data.data.role === "ADMIN" ? <Navigate to="/" /> : <DashboardPage />} 
      />
      <Route path='/auth' element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />
      <Route path='/admin' element={
        data && data.data.role === "ADMIN" ? (
          <AdminPage />
        ) : (
          <Navigate to="/" />
        )
      } />
      <Route path='*' element={<PageNoteFound />} />
    </Routes>
  );
}

export default Router;

