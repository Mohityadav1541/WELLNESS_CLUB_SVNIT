import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar transparent />
      {/* Placeholder Dark Background for Team */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-emerald-900" />
      <main className="relative z-10 pt-24 text-white">
        <Team />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default TeamPage;
