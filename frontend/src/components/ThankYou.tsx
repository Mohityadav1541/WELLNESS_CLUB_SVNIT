import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles, Heart, Home } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Sparkles className="w-8 h-8 text-purple-400" />
      </div>
      <div
        className="absolute top-40 right-20 opacity-30 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Heart className="w-6 h-6 text-pink-400" />
      </div>
      <div
        className="absolute bottom-40 left-20 opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <CheckCircle className="w-7 h-7 text-green-400" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="relative mb-8 animate-fade-up">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            {/* Animated Ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-green-200 rounded-full animate-ping opacity-20 mx-auto -m-4"></div>
          </div>

          {/* Header */}
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 shadow-sm animate-fade-up">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700">
              Feedback Received
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 bg-clip-text text-transparent mb-6 tracking-tight animate-fade-up">
            Thank You!
          </h1>

          {/* Message */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60 mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-6">
              We truly appreciate you taking the time to share your valuable
              feedback with us. Your insights help us grow and serve our
              community better.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Our team will review your message and we'll get back to you if
              needed. Together, we're building a better wellness community. 🌿
            </p>
          </div>

          {/* Additional Info Cards */}
          <div
            className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              {
                icon: Heart,
                title: "Community First",
                description: "Your voice shapes our programs",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: Sparkles,
                title: "Continuous Growth",
                description: "We learn from every feedback",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: CheckCircle,
                title: "Quality Focus",
                description: "Striving for excellence together",
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/60 hover:shadow-xl hover:scale-105 transition-all duration-500">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              onClick={() => navigate("/")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 flex items-center gap-3"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Back to Home
            </Button>

            <Button
              onClick={() => navigate("/programs")}
              variant="outline"
              className="group border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-105 flex items-center gap-3"
            >
              Explore Programs
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </div>

          {/* Footer Note */}
          <p
            className="text-gray-400 text-sm mt-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            With gratitude, The Wellness Club Team 💫
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ThankYou;
