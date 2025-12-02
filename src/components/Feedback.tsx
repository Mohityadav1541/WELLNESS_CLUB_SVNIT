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
              <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-500"
              >
                <div className="space-y-6">
                  {/* Name & Contact */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Topic */}
                  <div className="space-y-3">
                    <label
                      htmlFor="topic"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      What would you like to share? *
                    </label>
                    <Input
                      id="topic"
                      name="topic"
                      placeholder="e.g., Program feedback, suggestion, or question..."
                      required
                      className="h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 px-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    >
                      <option value="">Select a category</option>
                      <option value="feedback">General Feedback</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="program">Program Feedback</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please share your detailed feedback, suggestions, or thoughts here..."
                      required
                      rows={6}
                      className="rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all duration-300"
                    />
                  </div>

                  {/* Hidden FormSubmit options */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Feedback from Wellness Club"
                  />
                  <input
                    type="text"
                    name="_honey"
                    style={{ display: "none" }}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full h-14 text-base rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Your Feedback...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Feedback
                        <Sparkles className="w-4 h-4 text-white/80" />
                      </>
                    )}
                  </Button>

                  {/* Privacy Note */}
                  <p className="text-center text-gray-500 text-sm mt-4">
                    We respect your privacy and will never share your
                    information with third parties.
                  </p>
                </div>
              </form>
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

export default Feedback;
