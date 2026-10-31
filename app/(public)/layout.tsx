import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />

      {children}

      <Footer />
    </>
  );
}
