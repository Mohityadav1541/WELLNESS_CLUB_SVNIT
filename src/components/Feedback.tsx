import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Heart, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Submit to FormSubmit
      const response = await fetch(
        "https://formsubmit.co/ajax/wellnessclubsvnit@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Redirect to thank you page on success
        navigate("/thankyou");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback: redirect anyway after delay
      setTimeout(() => {
        navigate("/thankyou");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 md:pt-28 pb-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
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
        <MessageCircle className="w-7 h-7 text-blue-400" />
      </div>
      <div
        className="absolute bottom-20 right-10 opacity-25 animate-float"
        style={{ animationDelay: "3s" }}
      >
        <Users className="w-5 h-5 text-green-400" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 shadow-sm">
            <MessageCircle className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-700">
              Share Your Thoughts
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 tracking-tight">
            We'd Love Your Feedback
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Your insights help us grow and serve our community better. Share
            your
            <span className="font-semibold text-blue-600"> experiences</span>,
            <span className="font-semibold text-purple-600"> suggestions</span>,
            or
            <span className="font-semibold text-green-600"> ideas</span> with
            us.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Info Card */}
            <div className="lg:col-span-2 space-y-6 animate-fade-up">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Your Voice Matters
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Help us improve together
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: Heart,
                        color: "from-pink-500 to-rose-500",
                        title: "Community Driven",
                        text: "Your feedback shapes our programs",
                      },
                      {
                        icon: Users,
                        color: "from-green-500 to-emerald-500",
                        title: "Collective Growth",
                        text: "We grow better together",
                      },
                      {
                        icon: Sparkles,
                        color: "from-purple-500 to-indigo-500",
                        title: "Continuous Improvement",
                        text: "Always striving to be better",
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 text-xs">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              className="lg:col-span-3 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-500 text-center">
                <div className="space-y-8 py-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg transform hover:scale-110 transition-transform duration-500">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Submit Your Feedback
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We use Google Forms to collect your valuable feedback securely and efficiently. Click the button below to open the form.
                    </p>
                  </div>

                  <a
                    href="https://forms.google.com/YOUR_FEEDBACK_FORM_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <span>Open Feedback Form</span>
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            {
              icon: MessageCircle,
              title: "Quick Response",
              description: "We typically respond within 24 hours",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Heart,
              title: "Valued Input",
              description: "Every suggestion helps us improve",
              color: "from-pink-500 to-rose-500",
            },
            {
              icon: Users,
              title: "Community Focused",
              description: "Your feedback benefits everyone",
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
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <style jsx>{`
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
      `}</style> */}
    </section>
  );
};

export default Feedback;
