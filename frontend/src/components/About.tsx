import {
  Heart,
  Target,
  Users,
  Award,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import meditationBg from "@/assets/meditation-bg.jpg";

const CountUp = ({ end, duration = 2000 }: { end: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extract number and suffix
  const numberMatch = end.match(/\d+/);
  const number = numberMatch ? parseInt(numberMatch[0]) : 0;
  const suffix = end.replace(/\d+/, "");
  // Handle special case like 24/7 or text only
  const isComplex = end.includes("/");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isComplex) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(ease * number));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, number, duration, isComplex]);

  if (isComplex) return <span ref={countRef}>{end}</span>;

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {

  // MOCK AUTH
  const isSignedIn = false;
  const user = { firstName: "Guest" };
  const openSignIn = (options?: any) => { console.log(options) };

  const handleJoinCommunity = () => {
    openSignIn({ redirectUrl: "/" });
  };

  const values = [
    {
      icon: Heart,
      title: "Holistic Approach",
      description:
        "We believe in nurturing every aspect of your being - mind, body, and soul - for complete wellness.",
      // Soft amber/gold gradients
      gradient: "from-amber-400 to-yellow-500",
      delay: "0s",
    },
    {
      icon: Target,
      title: "Personalized Care",
      description:
        "Every journey is unique. We create customized wellness plans tailored to your specific needs and goals.",
      gradient: "from-amber-400 to-yellow-500",
      delay: "0.1s",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a vibrant community of like-minded individuals on their wellness journey, supporting each other every step.",
      gradient: "from-amber-400 to-yellow-500",
      delay: "0.2s",
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description:
        "Learn from certified professionals with years of experience in wellness, fitness, and holistic health.",
      gradient: "from-amber-400 to-yellow-500",
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
      className="py-20 md:py-32 relative overflow-hidden text-slate-100"
    >
      {/* Background Image with Fixed Attachment for Parallax Effect */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${meditationBg})` }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-[#0a0a1a]/80 backdrop-blur-[1px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-100 tracking-wide uppercase">
              Our Essence
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-100 mb-6 tracking-tight drop-shadow-sm">
            About Wellness Club
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            We're more than just a wellness center - we're a sanctuary dedicated
            to transforming lives through{" "}
            <span className="font-medium text-amber-400">holistic health</span>{" "}
            and{" "}
            <span className="font-medium text-amber-400">
              mindful living
            </span>
            .
          </p>
        </div>

        {/* Stats Section with New Theme */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-amber-400/80 font-medium tracking-[0.2em] uppercase text-xs">
              Milestones
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-3 mb-6">
              Numbers That Tell <span className="italic text-amber-400">Our Story</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group p-6 relative"
              >
                <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative">
                  <div className="text-5xl md:text-6xl font-serif text-amber-400 mb-4 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <CountUp end={stat.number} />
                  </div>
                  <div className="text-slate-400 font-medium tracking-wide uppercase text-xs border-t border-white/10 pt-4 mx-auto w-12 group-hover:w-24 group-hover:border-amber-400/50 transition-all duration-500">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Grid - Glassmorphism */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-up h-full"
                style={{ animationDelay: value.delay }}
              >
                {/* Glass Card */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 transition-all duration-500 group-hover:bg-white/10 group-hover:border-amber-500/20 group-hover:-translate-y-2" />

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col items-center text-center">
                  <div
                    className={`mb-6 w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-full flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7 text-black/80" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-amber-200 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm font-light">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] p-10 md:p-20 text-center border border-white/10 backdrop-blur-md animate-fade-up">

            <div className="inline-flex items-center gap-2 mb-8 opacity-70">
              <span className="h-px w-12 bg-amber-400"></span>
              <Target className="w-5 h-5 text-amber-400" />
              <span className="h-px w-12 bg-amber-400"></span>
            </div>

            <h3 className="text-3xl md:text-5xl font-serif font-medium text-white mb-10 leading-tight">
              Transforming Lives Through <br />
              <span className="italic text-amber-400">Mindful Wellness</span>
            </h3>

            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              To empower individuals to achieve{" "}
              <span className="text-white font-medium">
                optimal health
              </span>{" "}
              through comprehensive programs, expert guidance, and a
              supportive community. We strive to make wellness{" "}
              <span className="text-white font-medium">
                accessible, sustainable, and transformative
              </span>{" "}
              for everyone.
            </p>

            {/* Additional Mission Points */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Mental & Physical Harmony",
                "Inclusive Growth",
                "Holistic Education"
              ].map((text, index) => (
                <div
                  key={index}
                  className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-slate-300 font-medium hover:bg-white/10 transition-colors"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-up">
          {isSignedIn ? (
            <div className="bg-white/5 inline-block rounded-3xl p-8 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-serif text-white mb-4">
                Welcome back, {user?.firstName || "Friend"}
              </h3>
              <p className="text-slate-400 mb-6">
                Continue your journey with us.
              </p>
              <a
                href="/programs"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <button
              onClick={handleJoinCommunity}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-amber-400/50 text-amber-100 rounded-full hover:bg-amber-500/10 transition-all duration-300 hover:border-amber-400"
            >
              <span className="font-medium tracking-wide">Join Our Community</span>
              <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
