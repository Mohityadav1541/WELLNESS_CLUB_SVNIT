import {
  Heart,
  Target,
  Users,
  Award,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";

const About = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser(); // Get user authentication status

  const handleJoinCommunity = () => {
    openSignIn({ redirectUrl: "/" });
  };

  const values = [
    {
      icon: Heart,
      title: "Holistic Approach",
      description:
        "We believe in nurturing every aspect of your being - mind, body, and soul - for complete wellness.",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      delay: "0s",
    },
    {
      icon: Target,
      title: "Personalized Care",
      description:
        "Every journey is unique. We create customized wellness plans tailored to your specific needs and goals.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: "0.1s",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a vibrant community of like-minded individuals on their wellness journey, supporting each other every step.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      delay: "0.2s",
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description:
        "Learn from certified professionals with years of experience in wellness, fitness, and holistic health.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      delay: "0.3s",
    },
  ];

  const stats = [
    { number: "500+", label: "Students Helped" },
    { number: "50+", label: "Workshops Conducted" },
    { number: "12+", label: "Expert Mentors" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Sparkles className="w-8 h-8 text-purple-400" />
      </div>
      <div
        className="absolute top-40 right-20 opacity-30 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Star className="w-6 h-6 text-amber-400" />
      </div>
      <div
        className="absolute bottom-40 left-20 opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Heart className="w-7 h-7 text-pink-400" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-700">
              About Our Mission
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 tracking-tight">
            About Wellness Club
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            We're more than just a wellness center - we're a community dedicated
            to transforming lives through{" "}
            <span className="font-semibold text-blue-600">holistic health</span>{" "}
            and{" "}
            <span className="font-semibold text-purple-600">
              mindful living
            </span>
            .
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/60 hover:shadow-xl hover:scale-105 transition-all duration-500">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Grid - Removed Right Arrow */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-up"
                style={{ animationDelay: value.delay }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 border border-gray-200/60" />

                {/* Content */}
                <div className="relative p-8 h-full">
                  {/* Icon Container */}
                  <div
                    className={`relative mb-6 w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Mission Statement */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />

          <div className="relative bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-10 md:p-16 text-center border border-gray-200/60 shadow-xl backdrop-blur-sm animate-fade-up">
            {/* Decorative Elements */}
            <div className="absolute top-6 left-6 w-4 h-4 bg-blue-400/20 rounded-full" />
            <div className="absolute bottom-6 right-6 w-6 h-6 bg-purple-400/20 rounded-full" />
            <div className="absolute top-6 right-10 w-3 h-3 bg-pink-400/20 rounded-full" />
            <div className="absolute bottom-10 left-10 w-5 h-5 bg-cyan-400/20 rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Our Mission
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                Transforming Lives Through Wellness
              </h3>

              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                To empower individuals to achieve{" "}
                <span className="font-semibold text-blue-600">
                  optimal health and wellness
                </span>{" "}
                through comprehensive programs, expert guidance, and a
                supportive community. We strive to make wellness{" "}
                <span className="font-semibold text-purple-600">
                  accessible, sustainable, and transformative
                </span>{" "}
                for everyone.
              </p>

              {/* Additional Mission Points */}
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                {[
                  {
                    text: "Promote mental & physical well-being",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    text: "Foster inclusive community growth",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    text: "Innovate wellness education",
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-200/60"
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${point.color} flex-shrink-0`}
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conditional CTA Section */}
        <div className="text-center mt-16 animate-fade-up">
          {isSignedIn ? (
            // Welcome Message for Logged-in Users
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-emerald-200/60 shadow-lg max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200">
                <Star className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Welcome to the Community!
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Welcome back, {user?.firstName || "Valued Member"}! 👋
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                We're glad to have you as part of our wellness community.
                Explore our programs, join upcoming events, and continue your
                wellness journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/programs"
                  className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 flex items-center gap-2"
                >
                  Explore Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ) : (
            // Join Community Button for Non-Logged-in Users
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleJoinCommunity}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 flex items-center gap-2"
              >
                Join Our Community
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          )}
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

export default About;
