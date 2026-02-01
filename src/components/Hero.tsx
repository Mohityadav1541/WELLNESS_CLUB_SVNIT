import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Brain,
  Dumbbell,
  Leaf,
  Users,
  Clock,
  Star,
  MapPin,
  GamepadIcon,
  Music,
  Droplets,
  Eye,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import homeBgCosmic from "@/assets/home-bg-cosmic.jpg";

const Hero = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const wellnessFlashcards = [
    {
      icon: Heart,
      title: "Mental Conscious",
      description:
        "Daily meditation and mindfulness practices to reduce stress and improve focus",
      tip: "Start with just 5 minutes of breathing exercises each morning",
      gradient: "from-amber-400 to-orange-300", // Gold/Amber for Mind side
    },
    {
      icon: Dumbbell,
      title: "Physical Health",
      description:
        "Regular exercise and balanced nutrition for optimal physical well-being",
      tip: "Incorporate 30 minutes of physical activity into your daily routine",
      gradient: "from-blue-400 to-cyan-300", // Blue for Body side
    },
    {
      icon: Brain,
      title: "Mindfulness",
      description: "Stay present and reduce anxiety through mindful practices",
      tip: "Practice gratitude journaling every evening before bed",
      gradient: "from-amber-300 to-yellow-200", // Gold Light
    },
    {
      icon: Leaf,
      title: "Holistic Balance",
      description: "Achieve harmony between academic work and personal life",
      tip: "Take regular digital detox breaks to recharge mentally",
      gradient: "from-emerald-400 to-teal-300", // Slight Green for "Life"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlashcard((prev) => (prev + 1) % wellnessFlashcards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = [
    {
      id: 8,
      title: "eSports Tournament",
      date: "2025-09-06",
      time: "All Day",
      location: "SVNIT Campus",
      description: "Competitive gaming festival for stress relief and community building",
      tags: ["Gaming", "eSports"],
      icon: GamepadIcon,
      color: "from-blue-500 to-indigo-500",
      image: "/esports_1.png",
      attendees: 120,
      status: "finished",
    },
    {
      id: 1,
      title: "Session on Suicide Prevention",
      date: "2025-09-10", // Suicide Prevention Day is Sep 10
      time: "5:00 PM",
      location: "Seminar Hall",
      description: "A crucial dialogue on mental health, hope, and supporting one another.",
      tags: ["Mental Health", "Awareness"],
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      image: "/suicide_prevention.png",
      attendees: 100,
      status: "finished",
    },
    {
      id: 2,
      title: "Stress Management Session",
      date: "2025-10-05",
      time: "6:00 PM",
      location: "Yoga Hall",
      description: "Learn ancient techniques to handle academic pressure. Conducted by Gayatri Pariwar.",
      tags: ["Wellness", "Workshop"],
      icon: Brain,
      color: "from-amber-400 to-orange-400",
      image: "/stress_management.png",
      attendees: 150,
      status: "finished",
    },
    {
      id: 3,
      title: "Lifestyle Disease Awareness",
      date: "2025-10-12",
      time: "10:00 AM",
      location: "Main Auditorium",
      description: "Expert talk by Dr. Sanjay Shah on preventing modern lifestyle ailments. (2 Lectures)",
      tags: ["Health", "Seminar"],
      icon: Leaf,
      color: "from-emerald-500 to-teal-500",
      image: "/lifestyle_wellness.png",
      attendees: 200,
      status: "finished",
    },
    {
      id: 4,
      title: "Physiotherapy Session",
      date: "2025-10-20",
      time: "4:00 PM",
      location: "Health Center",
      description: "Corrective posture and mobility session for students.",
      tags: ["Health", "Physical"],
      icon: Dumbbell,
      color: "from-cyan-500 to-blue-500",
      image: "/physiotherapy.png",
      attendees: 80,
      status: "finished",
    },
    {
      id: 5,
      title: "Eyes & Dental Checkup",
      date: "2025-11-05",
      time: "9:00 AM",
      location: "Dispensary",
      description: "Comprehensive vision and dental screening camp.",
      tags: ["Health", "Checkup"],
      icon: Eye,
      color: "from-indigo-400 to-purple-400",
      image: "/eye_dental_camp.png",
      attendees: 300,
      status: "finished",
    },
    {
      id: 6,
      title: "Special Eyes Checkup",
      date: "2025-11-06",
      time: "10:00 AM",
      location: "Dispensary",
      description: "Advanced vision testing/glaucoma screening for faculty and students.",
      tags: ["Health", "Checkup"],
      icon: Eye,
      color: "from-blue-400 to-indigo-500",
      image: "/eye_dental_camp.png",
      attendees: 120,
      status: "finished",
    },
    {
      id: 7,
      title: "Session on Universal Brotherhood",
      date: "2025-11-14",
      time: "6:30 PM",
      location: "Open Air Theatre",
      description: "Celebrating unity and oneness beyond boundaries.",
      tags: ["Spiritual", "Community"],
      icon: Users,
      color: "from-orange-400 to-red-400",
      image: "/universal_brotherhood.png",
      attendees: 250,
      status: "finished",
    },
    {
      id: 9,
      title: "Blood Donation Camp",
      date: "2025-09-17",
      time: "10AM - 5PM",
      location: "Staff Club",
      description: "Mega blood donation drive to save lives",
      tags: ["Healthcare", "Donation"],
      icon: Droplets,
      color: "from-red-500 to-rose-500",
      image: "/blood_1.png",
      attendees: 150,
      status: "finished",
    },
    {
      id: 10,
      title: "Mental Health (Talk to Angel)",
      date: "2025-12-10",
      time: "11:00 AM",
      location: "MTB Seminar Room",
      description: "Special session in Mechanical Dept. on mental wellness by 'Talk to Angel'.",
      tags: ["Mental Health", "Talk"],
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      image: "/mental_health_angel.png",
      attendees: 90,
      status: "finished",
    },
    {
      id: 11,
      title: "Naad Musical Program",
      date: "2025-11-09",
      time: "7:00 PM",
      location: "Canteen Cements",
      description: "An evening of singing God's song, Bhajan, and spiritual connection.",
      tags: ["Music", "Devotional"],
      icon: Music,
      color: "from-amber-500 to-orange-500",
      image: "/naad_1.png",
      attendees: 200,
      status: "finished",
    },
    {
      id: 12,
      title: "Jam & Joy by Art of Living",
      date: "2026-01-20",
      time: "5:30 PM",
      location: "Student Activity Center",
      description: "Music, meditation, and joy session facilitated by Art of Living.",
      tags: ["Joy", "Music"],
      icon: Music,
      color: "from-yellow-400 to-amber-500",
      image: "/jam_and_joy.png",
      attendees: 180,
      status: "finished",
    },
    {
      id: 13,
      title: "World Meditation Day Yoga",
      date: "2026-05-21",
      time: "6:00 AM",
      location: "Sports Ground",
      description: "Mass yoga and meditation session to celebrate World Meditation Day.",
      tags: ["Yoga", "Meditation"],
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
      image: "/meditation_yoga.png",
      attendees: 400,
      status: "upcoming",
    },
    {
      id: 14,
      title: "Paryash Event",
      date: "2026-03-15",
      time: "2 Days",
      location: "Campus Wide",
      description: "A 2-day grand event celebrating effort, wellness, and creativity.",
      tags: ["Festival", "Wellness"],
      icon: Star,
      color: "from-purple-600 to-pink-600",
      image: "/paryash_event.png",
      attendees: 500,
      status: "upcoming",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: "Upcoming",
          style: "bg-blue-500/20 text-blue-200 border-blue-500/30",
        };
      case "ongoing":
        return {
          text: "Live Now",
          style: "bg-amber-500/20 text-amber-200 border-amber-500/30",
        };
      case "finished":
        return {
          text: "Completed",
          style: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        };
      default:
        return {
          text: "Upcoming",
          style: "bg-blue-500/20 text-blue-200 border-blue-500/30",
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${homeBgCosmic})` }}
      />

      {/* Dark Overlay for Readability - slightly stronger to pop the text */}
      <div className="absolute inset-0 bg-[#0f172a]/70 z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-32">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* Main Hero Header */}
          <div className="text-center space-y-8 animate-fade-up max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-100/90 tracking-wide uppercase">
                Holistic Wellness at SVNIT
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.1] tracking-tight">
              Awaken Your <br />
              <span className="italic">
                <span className="text-amber-400">Divine Soul</span> &{" "}
                <span className="text-blue-400">Conscious Mind</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
              Join a community singing the song of the divine and cultivating mental clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/programs">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium border-0 rounded-full text-lg px-8 py-6 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                >
                  Explore Programs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="bg-transparent border-amber-500/50 text-amber-100 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-400 rounded-full text-lg px-8 py-6 backdrop-blur-sm transition-all duration-300"
                >
                  Our Philosophy
                </Button>
              </Link>
            </div>
          </div>

          {/* Featured Cards - "Bento" Style */}
          <div className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>

            {/* Daily Wisdom Card (Mind Side - Gold) */}
            <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${wellnessFlashcards[currentFlashcard].gradient} shadow-lg`}>
                  {(() => {
                    const Icon = wellnessFlashcards[currentFlashcard].icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <h3 className="text-xl font-serif font-medium text-white">Daily Wisdom</h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-slate-100">
                  {wellnessFlashcards[currentFlashcard].title}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  {wellnessFlashcards[currentFlashcard].description}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-amber-300 text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-300" />
                    Tip: {wellnessFlashcards[currentFlashcard].tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Events Preview (Body/Action Side - Blue) */}
            <div className="bg-white/5 backdrop-blur-md border border-blue-500/20 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-medium text-white">Upcoming Events</h3>
                <Link to="/programs" className="text-sm text-slate-400 hover:text-white transition-colors">
                  View All &rarr;
                </Link>
              </div>

              {/* Scrollable Events List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 group/item cursor-pointer">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} bg-cover bg-center flex items-center justify-center shrink-0 relative overflow-hidden ring-1 ring-white/10`}
                      style={event.image ? { backgroundImage: `url(${event.image})` } : {}}
                    >
                      {/* Show overlay if image exists, or always to enhance icon contrast */}
                      <div className="absolute inset-0 bg-black/20" />
                      <event.icon className="w-6 h-6 text-white relative z-10 drop-shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate group-hover/item:text-blue-300 transition-colors text-lg">
                        {event.title}
                      </h4>
                      <p className="text-slate-500 text-sm truncate">
                        {formatDate(event.date)} • {event.location}
                      </p>
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded border ${getStatusBadge(event.status).style} shrink-0`}>
                      {getStatusBadge(event.status).text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Testimonial */}
          <div className="animate-fade-up relative" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-r from-amber-900/20 to-blue-900/20 p-10 md:p-14 rounded-[2rem] border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

              <div className="mb-6 flex justify-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-8 relative z-10">
                "A sanctuary for growth. The Wellness Club helped me find balance in the chaos of student life."
              </blockquote>

              <div>
                <cite className="not-italic text-lg font-medium text-amber-300">Karan Singh</cite>
                <p className="text-slate-400 text-sm mt-1">Head of Wellness Club, SVNIT</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
