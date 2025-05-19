import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import ThemeChanger from "components/modules/ThemeChanger";

function Layout({ children, searchQuery, setSearchQuery }) {
  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ThemeChanger/>
      <div className={styles.main}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;

