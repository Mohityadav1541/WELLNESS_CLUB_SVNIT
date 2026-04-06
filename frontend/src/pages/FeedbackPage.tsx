import Navbar from "@/components/Navbar";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen relative">
      <Navbar transparent />
      {/* Placeholder Dark Background for Feedback */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-purple-900" />
      <main className="relative z-10 pt-24 text-white">
        <Feedback />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default FeedbackPage;
