import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
