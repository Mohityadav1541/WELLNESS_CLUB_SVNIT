import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Heart,
  Brain,
  Dumbbell,
  Leaf,
  Users,
  Clock,
  Star,
  Calendar,
  MapPin,
  GamepadIcon,
  Music,
  Droplets,
  Eye,
  Speech,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const wellnessFlashcards = [
    {
      icon: Heart,
      title: "Mental Wellness",
      description:
        "Daily meditation and mindfulness practices to reduce stress and improve focus",
      tip: "Start with just 5 minutes of breathing exercises each morning",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Dumbbell,
      title: "Physical Health",
      description:
        "Regular exercise and balanced nutrition for optimal physical well-being",
      tip: "Incorporate 30 minutes of physical activity into your daily routine",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "Mindfulness",
      description: "Stay present and reduce anxiety through mindful practices",
      tip: "Practice gratitude journaling every evening before bed",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Leaf,
      title: "Holistic Balance",
      description: "Achieve harmony between academic work and personal life",
      tip: "Take regular digital detox breaks to recharge mentally",
      color: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlashcard((prev) => (prev + 1) % wellnessFlashcards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredPrograms = [
    {
      name: "Yoga & Meditation Sessions",
      description: "Daily guided sessions for stress relief and flexibility",
      sessions: "Monday to Saturday, 6:00 AM & 5:00 PM",
      participants: "200+ Active Participants",
      icon: Leaf,
      color: "border-green-400/30 bg-green-400/10",
    },
    {
      name: "Fitness & Strength Training",
      description: "Comprehensive workout programs for all fitness levels",
      sessions: "Weekday evenings and weekend mornings",
      participants: "150+ Enrolled Members",
      icon: Dumbbell,
      color: "border-blue-400/30 bg-blue-400/10",
    },
    {
      name: "Mental Health Support Groups",
      description: "Safe spaces for sharing and emotional support",
      sessions: "Weekly meetings with professional guidance",
      participants: "180+ Regular Members",
      icon: Brain,
      color: "border-purple-400/30 bg-purple-400/10",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "eSports Tournament - Gaming for Wellness",
      date: "2025-09-06",
      time: "All Day",
      location: "SVNIT Campus",
      description:
        "Competitive gaming festival for stress relief and community building",
      tags: ["Gaming", "eSports"],
      icon: GamepadIcon,
      color: "from-purple-500 to-indigo-500",
      attendees: 120,
      status: "finished",
    },
    {
      id: 2,
      title: "NAAD — Musical Concert",
      date: "2025-11-09",
      time: "7:00 PM",
      location: "Canteen Cements, SVNIT",
      description:
        "Full-fledged musical concert focused on emotional connection and joy",
      tags: ["Music", "Concert"],
      icon: Music,
      color: "from-pink-500 to-rose-500",
      attendees: 200,
      status: "finished",
    },
    {
      id: 3,
      title: "Blood Donation Camp 2.0",
      date: "2025-09-17",
      time: "10:00 AM - 5:00 PM",
      location: "Staff Club, SVNIT",
      description: "Mega blood donation drive to save lives",
      tags: ["Healthcare", "Donation"],
      icon: Droplets,
      color: "from-red-500 to-orange-500",
      attendees: 150,
      status: "finished",
    },
    {
      id: 4,
      title: "Free Health Checkup Camp",
      date: "2025-08-15",
      time: "11:30 AM",
      location: "Staff Club, SVNIT",
      description:
        "Comprehensive eye and dental checkups for students and staff",
      tags: ["Healthcare", "Wellness"],
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
      attendees: 80,
      status: "finished",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          text: "Upcoming",
          color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        };
      case "ongoing":
        return {
          text: "Live Now",
          color: "bg-green-500/20 text-green-400 border-green-500/30",
        };
      case "finished":
        return {
          text: "Completed",
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        };
      default:
        return {
          text: "Upcoming",
          color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary-light to-secondary"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20 pb-32">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Main Header Section */}
          <div className="text-center space-y-12 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Nurture Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Well-being
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Join <span className="text-primary font-semibold">us </span> in
              the journey to holistic health. Transform your mind, body, and
              soul with evidence-based wellness practices designed for student
              life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/programs" className="w-full sm:w-auto">
                <Button
                  variant="hero"
                  size="lg"
                  className="group w-full sm:w-auto text-lg py-6 px-8"
                >
                  Explore Our Programs
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Wellness Flashcard Section */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Daily Wellness Tips
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${wellnessFlashcards[currentFlashcard].color} w-16 h-16 flex items-center justify-center flex-shrink-0`}
                >
                  {(() => {
                    const Icon = wellnessFlashcards[currentFlashcard].icon;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-bold text-2xl mb-3">
                    {wellnessFlashcards[currentFlashcard].title}
                  </h3>
                  <p className="text-white/80 text-lg mb-4 leading-relaxed">
                    {wellnessFlashcards[currentFlashcard].description}
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-primary text-lg font-semibold bg-primary/20 px-4 py-2 rounded-lg">
                      💡 {wellnessFlashcards[currentFlashcard].tip}
                    </span>
                    <div className="flex gap-2">
                      {wellnessFlashcards.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentFlashcard(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentFlashcard
                              ? "bg-primary scale-125"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section (Replaced Our Impact) */}
          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-white text-center md:text-left">
                Events
              </h2>
              <Link to="/programs" className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-secondary backdrop-blur-sm group"
                >
                  View All Events
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                const statusBadge = getStatusBadge(event.status);
                return (
                  <div
                    key={event.id}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                  >
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${event.color}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge.color}`}
                        >
                          {statusBadge.text}
                        </span>
                      </div>
                      <div className="text-primary font-bold text-lg bg-primary/20 px-3 py-1 rounded-lg">
                        {formatDate(event.date)}
                      </div>
                    </div>

                    {/* Event Title & Description */}
                    <h3 className="text-white font-bold text-xl mb-3">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {event.attendees} expected attendees
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link to="/programs">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-secondary group"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-12 border border-primary/30 text-center">
              <div className="flex justify-center items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <blockquote className="text-white text-2xl italic leading-relaxed mb-6 max-w-3xl mx-auto">
                "The Wellness Club completely transformed my college experience.
                The supportive community and comprehensive programs helped me
                balance academics with personal well-being in ways I never
                thought possible."
              </blockquote>
              <div className="text-primary text-xl font-semibold">
                - Karan Singh, Head of Wellness Club
              </div>
              <div className="text-white/60 text-lg mt-2">
                SVNIT Student & Wellness Advocate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
