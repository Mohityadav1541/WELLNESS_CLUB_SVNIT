import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

const ProgramsPage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar transparent />
      {/* Placeholder Dark Background for Programs */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-blue-900" />
      <main className="relative z-10 pt-24 text-white">
        <Programs />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ProgramsPage;
