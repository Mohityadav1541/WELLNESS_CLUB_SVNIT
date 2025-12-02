import Navbar from "@/components/Navbar";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <Feedback />
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
