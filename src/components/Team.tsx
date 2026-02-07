import {
  Mail,
  Crown,
  Users,
  Shield,
  CreditCard,
  Star,
  Heart,
  Sparkles,
  Code,
  Palette,
  Instagram,
  Github,
  Linkedin,
} from "lucide-react";
import TiltedCard from "./TiltedCard";

const Team = () => {
  const teamStructure = [
    {
      level: "Leadership",
      members: [
        {
          name: "Dr. YD Patil",
          role: "Chairman, Wellness Club",
          email: "YD.Patil@svnit.ac.in",
          icon: Crown,
          bio: "Leading the Wellness Club initiatives at SVNIT with visionary guidance and strategic direction",
          image: "/yd_patil.jpg",
          accent: "from-amber-500 to-yellow-500",
          badge: "from-yellow-100 to-amber-100 text-amber-800 border-amber-200",
        },
        {
          name: "Khyati Mistry",
          role: "Co-Chairman, Wellness Club",
          email: "khyati.mistry@svnit.ac.in",
          icon: Crown,
          bio: "Co-leading the Wellness Club initiatives and driving strategic planning for holistic wellness programs",
          image: "/khyati_mistry.png",
          accent: "from-purple-500 to-pink-500",
          badge:
            "from-purple-100 to-pink-100 text-purple-800 border-purple-200",
        },
      ],
    },
    {
      level: "Heads",
      members: [
        {
          name: "Karan Singh",
          role: "HEAD",
          email: "U23CE125@ced.svnit.ac.in",
          icon: Users,
          bio: "Leading club operations and coordinating wellness activities with passion and dedication",
          image: "/karan_singh.jpg",
          accent: "from-blue-500 to-cyan-500",
          badge: "from-blue-100 to-cyan-100 text-blue-800 border-blue-200",
        },
        {
          name: "Prateek Narera",
          role: "CO-Head",
          email: "U23CE084@ced.svnit.ac.in",
          icon: Users,
          bio: "Supporting head in club management and ensuring smooth execution of all activities",
          image: "/prateek_narera.jpg",
          accent: "from-indigo-500 to-blue-500",
          badge:
            "from-indigo-100 to-blue-100 text-indigo-800 border-indigo-200",
        },
        {
          name: "Prakhar Singh",
          role: "CO-HEAD",
          email: "u23med24@ced.svnit.ac.in",
          icon: Users,
          bio: "Co-leading wellness programs and events with innovative approaches and team coordination",
          image: "/prakhar_singh.jpg",
          accent: "from-cyan-500 to-teal-500",
          badge: "from-cyan-100 to-teal-100 text-cyan-800 border-cyan-200",
        },
      ],
    },
    {
      level: "Executive",
      members: [
        {
          name: "Nakul Singh",
          role: "SECRETARY",
          email: "u23ce118@ced.svnit.ac.in",
          icon: Shield,
          bio: "Managing administrative tasks, communications, and ensuring efficient club operations",
          image: "/nakul_singh.jpg",
          accent: "from-green-500 to-emerald-500",
          badge:
            "from-green-100 to-emerald-100 text-green-800 border-green-200",
        },
        {
          name: "Tanish Kasera",
          role: "TREASURER",
          email: "u23med24@ced.svnit.ac.in",
          icon: CreditCard,
          bio: "Handling financial matters, budget planning, and resource allocation for club activities",
          image: "/tanishk_kasera.jpg",
          accent: "from-emerald-500 to-green-500",
          badge:
            "from-emerald-100 to-green-100 text-emerald-800 border-emerald-200",
        },
      ],
    },
    {
      level: "Web Team",
      members: [
        {
          name: "Mohit Yadav",
          role: "Full Stack Developer",
          email: "u23cse@coed.svnit.ac.in",
          icon: Code,
          bio: "Full-stack developer responsible for the architecture and implementation of the Wellness Club platform",
          image: "/mohit_yadav.jpg",
          accent: "from-cyan-500 to-blue-500",
          badge: "from-cyan-100 to-blue-100 text-cyan-800 border-cyan-200",
          instagram: "https://www.instagram.com/yadav__mohit_0?igsh=MWZwcWUxYXBpdjlsNA==",
          github: "https://github.com/Mohityadav1541",
          linkedin: "https://www.linkedin.com/in/mohit-yadav-3a8957310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        {
          name: "Neel Mhaske",
          role: "Full Stack Developer",
          email: "dev@wellness.svnit",
          icon: Code,
          bio: "Creative mind behind the visual identity, user experience, and aesthetic direction of the website",
          image: "/khyati_mistry.png", // Using placeholder, user can replace
          accent: "from-pink-500 to-rose-500",
          badge: "from-pink-100 to-rose-100 text-pink-800 border-pink-200",
          instagram: "https://instagram.com",
          github: "https://github.com",
          linkedin: "https://linkedin.com",
        },
      ],
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[url('/team_bg.jpg')] bg-cover bg-center bg-fixed">
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 opacity-20 animate-float z-0">
        <Sparkles className="w-8 h-8 text-purple-400" />
      </div>
      <div
        className="absolute top-20 right-16 opacity-30 animate-float z-0"
        style={{ animationDelay: "2s" }}
      >
        <Heart className="w-6 h-6 text-pink-400" />
      </div>
      <div
        className="absolute bottom-20 left-20 opacity-20 animate-float z-0"
        style={{ animationDelay: "1s" }}
      >
        <Star className="w-7 h-7 text-amber-400" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-100">
              Meet Our Team
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Meet the passionate leaders and dedicated committee members behind
            the
            <span className="font-semibold text-blue-400">
              {" "}
              Wellness Club, SVNIT
            </span>
          </p>
        </div>

        {/* Team Structure */}
        <div className="space-y-16 max-w-7xl mx-auto">
          {teamStructure.map((level, levelIndex) => (
            <div key={levelIndex} className="relative">
              {/* Level Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.level === "Leadership"
                      ? "from-amber-400 to-yellow-400"
                      : level.level === "Heads"
                        ? "from-blue-400 to-cyan-400"
                        : "from-green-400 to-emerald-400"
                      }`}
                  ></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {level.level}
                  </h3>
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.level === "Leadership"
                      ? "from-amber-400 to-yellow-400"
                      : level.level === "Heads"
                        ? "from-blue-400 to-cyan-400"
                        : "from-green-400 to-emerald-400"
                      }`}
                  ></div>
                </div>
              </div>

              {/* Members Grid */}
              <div
                className={`grid grid-cols-1 ${level.level === "Leadership"
                  ? "md:grid-cols-2 max-w-4xl mx-auto gap-8"
                  : level.level === "Heads"
                    ? "md:grid-cols-3 gap-6"
                    : "md:grid-cols-2 max-w-3xl mx-auto gap-8"
                  }`}
              >
                {level.members.map((member, memberIndex) => {
                  const Icon = member.icon;
                  return (
                    <div key={memberIndex} className="h-full">
                      <TiltedCard
                        containerHeight="100%"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={8}
                        scaleOnHover={1.02}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                      >
                        <div
                          className="group relative bg-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md h-full"
                        >
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                          ></div>

                          {/* Profile Header */}
                          <div className="relative pt-8 px-6">
                            {/* Profile Image */}
                            <div className="relative z-10 mx-auto w-28 h-28">
                              <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-50/20 rounded-full shadow-lg transform group-hover:scale-105 transition-transform duration-500 p-1">
                                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
                                    <img
                                      src={member.image}
                                      alt={member.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>
                                </div>
                                {/* Icon Badge */}
                                <div
                                  className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg bg-gradient-to-r ${member.accent}`}
                                >
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="pt-16 pb-8 px-6 text-center relative z-10">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                              {member.name}
                            </h3>

                            {/* Role Badge */}
                            <div className="mb-4">
                              <span
                                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border bg-gradient-to-r ${member.badge} shadow-sm backdrop-blur-sm bg-opacity-90`}
                              >
                                {member.role}
                              </span>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed font-light min-h-[60px]">
                              {member.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center justify-center gap-4 mt-2">
                              {member.instagram && (
                                <a
                                  href={member.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#E1306C] hover:bg-white/10 hover:border-[#E1306C]/30 transition-all duration-300"
                                  title="Instagram"
                                >
                                  <Instagram className="w-5 h-5" />
                                </a>
                              )}
                              {member.github && (
                                <a
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                  title="GitHub"
                                >
                                  <Github className="w-5 h-5" />
                                </a>
                              )}
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0077B5] hover:bg-white/10 hover:border-[#0077B5]/30 transition-all duration-300"
                                  title="LinkedIn"
                                >
                                  <Linkedin className="w-5 h-5" />
                                </a>
                              )}
                              {/* Fallback to email if no socials or for other members that keep email */}
                              {!member.instagram &&
                                !member.github &&
                                !member.linkedin &&
                                member.email && (
                                  <div className="flex items-center justify-center gap-3 p-3 bg-black/30 rounded-xl border border-white/10 group-hover:bg-black/50 transition-colors duration-300">
                                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <a
                                      href={`mailto:${member.email}`}
                                      className="text-sm text-gray-300 hover:text-white transition-colors break-all font-medium truncate"
                                      title={member.email}
                                    >
                                      {member.email}
                                    </a>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </TiltedCard>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>



        {/* Enhanced CTA Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl p-12 md:p-16 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="text-center relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join Our Wellness Journey
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                The Wellness Club at SVNIT is dedicated to promoting holistic
                health and well-being through innovative programs, workshops,
                and community initiatives.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Health Workshops",
                  "Fitness Sessions",
                  "Mental Wellness",
                  "Community Building",
                  "Sports Activities",
                  "Yoga & Meditation",
                  "Nutrition Guidance",
                  "Stress Management",
                ].map((activity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-gray-200 shadow-sm border border-white/10 hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

export default Team;
