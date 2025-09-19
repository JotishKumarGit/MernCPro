import Header from "./Header";
import Footer from "./Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
