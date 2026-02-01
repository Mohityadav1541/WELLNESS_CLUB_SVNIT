import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <IntroOverlay />
      <Navbar transparent />
      <main>
        <Hero />
        <HomeSections />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
