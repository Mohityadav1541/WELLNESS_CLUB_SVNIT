import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Image,
  Filter,
  Music,
  GamepadIcon,
  Droplets,
  Eye,
  Speech,
  Lock,
  CheckCircle,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
  images: string[];
  featured: boolean;
  attendees?: number;
  contact?: string;
  prizePool?: string;
  artists?: string[];
  games?: string[];
  partners?: string[];
  status: "upcoming" | "ongoing" | "closed";
}

interface GalleryImage {
  url: string;
  event: Event;
  index: number;
}

const CombinedEventsTab: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: 8,
      title: "eSports Tournament - Gaming for Wellness",
      date: "2025-09-06",
      time: "All Day",
      location: "SVNIT Campus",
      description:
        "The Wellness Club embraced the world of eSports with an exciting two-day gaming festival. Students participated in competitive battles, community gaming sessions, and stress-relief activities through gaming.",
      tags: ["Gaming", "eSports", "Community", "Entertainment"],
      images: ["/esports_1.png"],
      featured: true,
      status: "closed",
      attendees: 120,
      prizePool: "₹7,000+",
      games: ["Free Fire", "BGMI", "Mini Militia", "Valorant"],
      contact: "Karan Kumar: 9316551975",
    },
    {
      id: 1,
      title: "Session on Suicide Prevention",
      date: "2025-09-10",
      time: "5:00 PM",
      location: "Seminar Hall",
      description: "A crucial dialogue on mental health, hope, and supporting one another. Together we can break the stigma.",
      tags: ["Mental Health", "Awareness", "Support"],
      images: ["/suicide_prevention.png"],
      featured: true,
      status: "closed",
      attendees: 100,
      contact: "Wellness Team",
    },
    {
      id: 2,
      title: "Stress Management Session",
      date: "2025-10-05",
      time: "6:00 PM",
      location: "Yoga Hall",
      description: "Learn ancient techniques to handle academic pressure. Conducted by Gayatri Pariwar.",
      tags: ["Wellness", "Workshop", "Stress Relief"],
      images: ["/stress_management.png"],
      featured: false,
      status: "closed",
      attendees: 150,
      partners: ["Gayatri Pariwar"],
    },
    {
      id: 3,
      title: "Lifestyle Disease Awareness",
      date: "2025-10-12",
      time: "10:00 AM",
      location: "Main Auditorium",
      description: "Expert talk by Dr. Sanjay Shah on preventing modern lifestyle ailments. A two-part lecture series.",
      tags: ["Health", "Seminar", "Education"],
      images: ["/lifestyle_wellness.png"],
      featured: false,
      status: "closed",
      attendees: 200,
      contact: "Dr. Sanjay Shah Team",
    },
    {
      id: 4,
      title: "Physiotherapy Session",
      date: "2025-10-20",
      time: "4:00 PM",
      location: "Health Center",
      description: "Corrective posture and mobility session for students to combat long study hours.",
      tags: ["Health", "Physical", "Workshop"],
      images: ["/physiotherapy.png"],
      featured: false,
      status: "closed",
      attendees: 80,
    },
    {
      id: 5,
      title: "Eyes & Dental Checkup",
      date: "2025-11-05",
      time: "9:00 AM",
      location: "Dispensary",
      description: "Comprehensive vision and dental screening camp for all students and staff.",
      tags: ["Health", "Checkup", "Medical"],
      images: ["/eye_dental_camp.png"],
      featured: true,
      status: "closed",
      attendees: 300,
      partners: ["City Eye Care", "Dental Association"],
    },
    {
      id: 6,
      title: "Special Eyes Checkup",
      date: "2025-11-06",
      time: "10:00 AM",
      location: "Dispensary",
      description: "Advanced vision testing and glaucoma screening for faculty and students.",
      tags: ["Health", "Checkup", "Medical"],
      images: ["/eye_dental_camp.png"],
      featured: false,
      status: "closed",
      attendees: 120,
    },
    {
      id: 7,
      title: "Session on Universal Brotherhood",
      date: "2025-11-14",
      time: "6:30 PM",
      location: "Open Air Theatre",
      description: "Celebrating unity and oneness beyond boundaries. A spiritual gathering for peace.",
      tags: ["Spiritual", "Community", "Peace"],
      images: ["/universal_brotherhood.png"],
      featured: false,
      status: "closed",
      attendees: 250,
    },
    {
      id: 9,
      title: "Blood Donation Camp 2.0",
      date: "2025-09-17",
      time: "10:00 AM - 5:00 PM",
      location: "Staff Club, SVNIT",
      description:
        "A mega blood donation drive under 'Raktadaan Amrit Mahotsav 2.0,' encouraging students and staff to donate blood and save lives.",
      tags: ["Healthcare", "Social Cause", "Donation"],
      images: ["/blood_1.png"],
      featured: true,
      status: "closed",
      attendees: 150,
      partners: ["Red Cross Society"],
    },
    {
      id: 10,
      title: "Mental Health Session (Talk to Angel)",
      date: "2025-12-10",
      time: "11:00 AM",
      location: "MTB Seminar Room",
      description: "Special session in Mechanical Dept. on mental wellness and counseling by 'Talk to Angel'.",
      tags: ["Mental Health", "Counseling", "Workshop"],
      images: ["/mental_health_angel.png"],
      featured: true,
      status: "closed",
      attendees: 90,
      partners: ["Talk to Angel"],
    },
    {
      id: 11,
      title: "NAAD — Musical Concert",
      date: "2025-11-09",
      time: "7:00 PM",
      location: "Canteen Cements",
      description:
        "NAAD is a full-fledged musical concert organized by the Wellness Club. Theme: 'Come connect heart with happiness, dance with divinity.'",
      tags: ["Music", "Concert", "Cultural", "Devotional"],
      images: ["/naad_1.png", "/naad_2.png"],
      featured: true,
      status: "closed",
      attendees: 200,
      artists: ["Student Band", "Guest Performers"],
    },
    {
      id: 12,
      title: "Jam & Joy by Art of Living",
      date: "2026-01-20",
      time: "5:30 PM",
      location: "Student Activity Center",
      description: "Music, meditation, and joy session facilitated by Art of Living. A vibrant evenng of connection.",
      tags: ["Joy", "Music", "Meditation", "Spiritual"],
      images: ["/jam_and_joy.png"],
      featured: true,
      status: "closed",
      attendees: 180,
      partners: ["Art of Living"],
    },
    {
      id: 13,
      title: "World Meditation Day Yoga",
      date: "2026-05-21",
      time: "6:00 AM",
      location: "Sports Ground",
      description: "Mass yoga and meditation session to celebrate World Meditation Day. Join us for a sunrise session.",
      tags: ["Yoga", "Meditation", "Wellness"],
      images: ["/meditation_yoga.png"],
      featured: true,
      status: "upcoming",
      attendees: 400,
    },
    {
      id: 14,
      title: "Paryash Event",
      date: "2026-03-15",
      time: "2 Days",
      location: "Campus Wide",
      description: "A 2-day grand event celebrating effort, wellness, and creativity. Competitions, workshops, and more.",
      tags: ["Festival", "Wellness", "Community"],
      images: ["/paryash_event.png"],
      featured: true,
      status: "upcoming",
      attendees: 500,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<{
    [key: string]: boolean;
  }>({});

  const allTags = ["All", ...new Set(events.flatMap((event) => event.tags))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedFilter === "All" || event.tags.includes(selectedFilter);
    return matchesSearch && matchesTag;
  });

  // Flatten all images from all events for gallery view
  const allImages = events.flatMap((event) =>
    event.images.map((image, index) => ({
      url: image,
      event: event,
      index: index,
    }))
  );

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setSelectedGalleryImage(null);
    document.body.style.overflow = "hidden";
  };

  const openGalleryModal = (galleryImage: GalleryImage) => {
    setSelectedGalleryImage(galleryImage);
    setSelectedEvent(null);
    setCurrentImageIndex(galleryImage.index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedGalleryImage(null);
    setCurrentImageIndex(0);
    setImageLoadError({});
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (selectedGalleryImage && selectedGalleryImage.event) {
      const eventImages = selectedGalleryImage.event.images;
      if (currentImageIndex < eventImages.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
        // Update the selected gallery image
        setSelectedGalleryImage({
          ...selectedGalleryImage,
          index: currentImageIndex + 1,
          url: eventImages[currentImageIndex + 1],
        });
      }
    }
  };

  const prevImage = () => {
    if (selectedGalleryImage && selectedGalleryImage.event) {
      const eventImages = selectedGalleryImage.event.images;
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
        // Update the selected gallery image
        setSelectedGalleryImage({
          ...selectedGalleryImage,
          index: currentImageIndex - 1,
          url: eventImages[currentImageIndex - 1],
        });
      }
    }
  };

  const handleImageError = (imageUrl: string) => {
    setImageLoadError((prev) => ({ ...prev, [imageUrl]: true }));
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (selectedGalleryImage) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedGalleryImage, currentImageIndex]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEventIcon = (tags: string[]) => {
    if (tags.includes("Gaming") || tags.includes("eSports"))
      return <GamepadIcon className="w-5 h-5" />;
    if (tags.includes("Music") || tags.includes("Concert"))
      return <Music className="w-5 h-5" />;
    if (tags.includes("Healthcare") && tags.includes("Donation"))
      return <Droplets className="w-5 h-5" />;
    if (tags.includes("Healthcare") && tags.includes("Checkup"))
      return <Eye className="w-5 h-5" />;
    if (tags.includes("Motivation") || tags.includes("Education"))
      return <Speech className="w-5 h-5" />;
    if (tags.includes("Yoga") || tags.includes("Meditation"))
      return <div className="text-amber-500">🧘</div>;
    if (tags.includes("Career") || tags.includes("Professional"))
      return <div className="text-amber-500">💼</div>;
    if (tags.includes("Cultural") || tags.includes("Performance"))
      return <div className="text-amber-500">🎭</div>;
    if (tags.includes("Technology") || tags.includes("Programming"))
      return <div className="text-amber-500">💻</div>;
    if (tags.includes("Environment") || tags.includes("Sustainability"))
      return <div className="text-amber-500">🌱</div>;
    if (tags.includes("Sports") || tags.includes("Fitness"))
      return <div className="text-amber-500">⚽</div>;
    if (tags.includes("Entrepreneurship") || tags.includes("Business"))
      return <div className="text-amber-500">🚀</div>;
    return <Calendar className="w-5 h-5" />;
  };

  const getStatusBadge = (status: Event["status"]) => {
    switch (status) {
      case "closed":
        return {
          text: "Event Closed",
          icon: <Lock className="w-3 h-3" />,
          color: "bg-gray-100 text-gray-800 border-gray-300",
          iconColor: "text-gray-600",
        };
      case "ongoing":
        return {
          text: "Live Now",
          icon: (
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          ),
          color: "bg-red-100 text-red-800 border-red-300",
          iconColor: "text-red-600",
        };
      case "upcoming":
        return {
          text: "Upcoming",
          icon: <Calendar className="w-3 h-3" />,
          color: "bg-blue-100 text-blue-800 border-blue-300",
          iconColor: "text-blue-600",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden py-12 selection:bg-amber-500 selection:text-black">
      {/* Global Animated Grid Background */}
      <div className="fixed inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {/* Optimized Background: Baked-in Gradients */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 85% 75%, rgba(217, 119, 6, 0.1) 0%, transparent 40%)
          `
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 uppercase tracking-tighter italic drop-shadow-2xl">
            Wellness <span className="text-amber-500">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-wide max-w-3xl mx-auto">
            &lt; DISCOVER_THE_FUTURE_OF_WELLNESS /&gt;
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-6 mb-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between relative z-10">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="SEARCH_LOGS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/10 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-black/50 rounded-lg p-1 border border-white/5">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm ${viewMode === "list"
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:block">LIST_VIEW</span>
                </button>
                <button
                  onClick={() => setViewMode("gallery")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm ${viewMode === "gallery"
                    ? "bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:block">GALLERY_MODE</span>
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-mono text-sm ${showFilters
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "bg-black/50 text-gray-400 border-white/10 hover:border-amber-500/30 hover:text-white"
                  }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:block">Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Tags */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilter(tag)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${selectedFilter === tag
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          </div>
        ) : viewMode === "list" ? (
          /* List View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredEvents.map((event) => {
              const statusBadge = getStatusBadge(event.status);

              // Unified Cyberpunk Card for All Events
              const isEsports = event.title === "eSports Tournament - Gaming for Wellness";



              return (
                <div
                  key={event.id}
                  onClick={() => openEventModal(event)}
                  className="col-span-1 lg:col-span-2 xl:col-span-3 h-auto md:h-[550px] flex flex-col md:flex-row overflow-hidden rounded-[2rem] cursor-pointer transform transition-transform duration-200 hover:scale-[1.005] bg-black border-2 border-amber-500/50 hover:border-amber-400 group relative z-10"
                >
                  {/* Cyberpunk Glow Underlay - Static for Performance */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                  {/* Left: Interactive Video Feed with CRT Effects */}
                  <div className="md:w-1/2 h-64 md:h-full relative bg-black overflow-hidden perspective-1000">
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                    {isEsports ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-100 group-hover:scale-105 transform ease-out"
                        style={{ filter: "contrast(1.2) saturation(1.2)" }}
                      >
                        <source src="/bgmi_event_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-100 group-hover:scale-105 transform ease-out"
                        style={{ filter: "contrast(1.1) saturation(1.1)" }}
                      />
                    )}

                    {/* Angled Separator (Desktop Only) */}
                    <div className="absolute top-0 right-[-1px] h-full w-24 bg-gradient-to-l from-black to-transparent z-20 hidden md:block" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 60% 0)" }}></div>

                    {/* Glitch Overlay Text */}
                    <div className="absolute top-6 left-6 z-30 pointer-events-none">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-red-600 blur opacity-50 animate-pulse" />
                        <div className="relative bg-red-600/90 text-white px-4 py-1 font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2 border border-red-400">
                          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                          {event.status === 'ongoing' ? 'LIVE BROADCAST' : 'SECURE ARCHIVE'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cyber Control Panel */}
                  <div className="md:w-1/2 h-full bg-black relative z-20 flex flex-col border-l border-amber-500/20 md:-ml-8" style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}>
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                    <div className="p-8 md:pl-12 flex flex-col h-full justify-between relative">
                      {/* Animated Border Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-50 md:hidden" />

                      {/* Header */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono text-amber-500/80 border-b border-amber-500/20 pb-2">
                          <span>SYS.ONLINE</span>
                          <span className="animate-pulse">● REC</span>
                        </div>

                        <div>
                          <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-[0.9] mb-1 group-hover:text-amber-400 transition-colors drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                            {event.title}
                          </h2>
                          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                            {event.title.split("-")[1] || "WELLNESS_EVENT"}
                          </h3>
                        </div>

                        {/* Neon Tags */}
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-2 py-0.5 bg-cyan-900/10 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Data Block */}
                      <div className="space-y-2 font-mono text-sm border-l-2 border-amber-500/30 pl-4 my-6">
                        <div className="text-gray-400">
                          <span className="text-amber-600 mr-2">&gt;&gt;</span>
                          {formatDate(event.date)}
                        </div>
                        <div className="text-gray-400">
                          <span className="text-amber-600 mr-2">&gt;&gt;</span>
                          {event.location}
                        </div>
                        {event.prizePool && (
                          <div className="text-green-400 font-bold glow-text">
                            <span className="text-green-600 mr-2">$$</span>
                            PRIZE: {event.prizePool}
                          </div>
                        )}
                      </div>

                      {/* Big Action Button */}
                      <button className="relative w-full overflow-hidden bg-amber-600 hover:bg-amber-500 text-black font-black uppercase py-5 tracking-widest transition-all duration-200 hover:tracking-[0.2em] skew-x-[-12deg] group/btn shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]" />
                        <div className="skew-x-[12deg] flex items-center justify-center gap-3 relative z-10">
                          <GamepadIcon className="w-6 h-6" />
                          DEPLOY
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );

            })}
          </div>
        ) : (
          /* Gallery View - Only Photos */
          <div className="max-w-7xl mx-auto">
            {/* Gallery Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Event Gallery
              </h2>
              <p className="text-gray-600">
                Browse photos from Wellness Club events at SVNIT
              </p>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allImages
                .filter((imageItem) =>
                  filteredEvents.some(
                    (event) => event.id === imageItem.event.id
                  )
                )
                .map((imageItem, index) => (
                  <div
                    key={`${imageItem.event.id}-${imageItem.index}`}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    onClick={() => openGalleryModal(imageItem)}
                  >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      {imageLoadError[imageItem.url] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                          <Image className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500">
                            Image not available
                          </span>
                        </div>
                      ) : (
                        <img
                          src={imageItem.url}
                          alt={`${imageItem.event.title} - Photo ${imageItem.index + 1
                            }`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => handleImageError(imageItem.url)}
                        />
                      )}
                    </div>

                    {/* Minimal Overlay - Only on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-3">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                          {imageItem.event.title}
                        </p>
                      </div>
                    </div>

                    {/* Photo Count Badge */}
                    {imageItem.index === 0 &&
                      imageItem.event.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                          +{imageItem.event.images.length - 1}
                        </div>
                      )}
                  </div>
                ))}
            </div>

            {/* Gallery Stats */}
            <div className="text-center mt-8 text-sm text-gray-500">
              Showing{" "}
              {
                allImages.filter((imageItem) =>
                  filteredEvents.some(
                    (event) => event.id === imageItem.event.id
                  )
                ).length
              }{" "}
              photos from {filteredEvents.length} events
            </div>
          </div>
        )
        }

        {/* Stats Bar - Only show in List View */}
        {
          viewMode === "list" && (
            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {events.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Events</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {events.filter((e) => e.featured).length}
                  </div>
                  <div className="text-sm text-gray-600">Featured</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {allImages.length}
                  </div>
                  <div className="text-sm text-gray-600">Photos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {events.filter((e) => e.status === "closed").length}
                  </div>
                  <div className="text-sm text-gray-600">Completed Events</div>
                </div>
              </div>
            </div>
          )
        }

        {/* Event Modal - For List View */}
        {
          selectedEvent && !selectedGalleryImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Event Details */}
                <div className="p-6 md:p-8">
                  {/* Tags and Status */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(selectedEvent.status).color
                        } flex items-center gap-1`}
                    >
                      {getStatusBadge(selectedEvent.status).icon}
                      {getStatusBadge(selectedEvent.status).text}
                    </div>
                  </div>

                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    {getEventIcon(selectedEvent.tags)}
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span>{formatFullDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-amber-500" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    {selectedEvent.attendees && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-amber-500">👥</span>
                        <span>{selectedEvent.attendees} attendees</span>
                      </div>
                    )}
                  </div>

                  {/* Special Information */}
                  {selectedEvent.prizePool && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-green-800 font-semibold">
                        🏆 Prize Pool: {selectedEvent.prizePool}
                      </div>
                    </div>
                  )}

                  {/* Games List */}
                  {selectedEvent.games && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Games Featured:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.games.map((game, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artists List */}
                  {selectedEvent.artists && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Artist Line-up:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedEvent.artists.map((artist, index) => (
                          <div key={index} className="text-gray-700">
                            {artist}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Partners List */}
                  {selectedEvent.partners && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        In Collaboration With:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.partners.map((partner, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>

                  {/* Contact Information */}
                  {selectedEvent.contact && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Contact Information:
                      </h3>
                      <p className="text-gray-700">{selectedEvent.contact}</p>
                    </div>
                  )}

                  {/* Event Completed Alert */}
                  {selectedEvent.status === "closed" && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                      <p className="text-green-800 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        This event has been successfully completed!
                      </p>
                    </div>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )
        }

        {/* Photo Viewer Modal - For Gallery View */}
        {
          selectedGalleryImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Carousel */}
                <div className="relative bg-gray-900 h-80 md:h-96">
                  {imageLoadError[selectedGalleryImage.url] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <Image className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-400">Image not available</p>
                    </div>
                  ) : (
                    <img
                      src={selectedGalleryImage.url}
                      alt={`${selectedGalleryImage.event.title} - Photo ${selectedGalleryImage.index + 1
                        }`}
                      className="w-full h-full object-contain"
                      onError={() => handleImageError(selectedGalleryImage.url)}
                    />
                  )}

                  {/* Navigation Arrows */}
                  {selectedGalleryImage.event.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={
                          currentImageIndex ===
                          selectedGalleryImage.event.images.length - 1
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Dots */}
                  {selectedGalleryImage.event.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {selectedGalleryImage.event.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setSelectedGalleryImage({
                              ...selectedGalleryImage,
                              index: index,
                              url: selectedGalleryImage.event.images[index],
                            });
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                            ? "bg-amber-500 w-6"
                            : "bg-white/50"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Photo Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedGalleryImage.event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>
                        {formatFullDate(selectedGalleryImage.event.date)}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>{selectedGalleryImage.event.time}</span>
                    </div>
                  </div>

                  {/* Photo Counter */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        Photo {currentImageIndex + 1} of{" "}
                        {selectedGalleryImage.event.images.length}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        {selectedGalleryImage.event.images.length} Photos in this
                        event
                      </div>
                    </div>
                  </div>

                  {/* View Event Details Button */}
                  <button
                    onClick={() => {
                      setSelectedEvent(selectedGalleryImage.event);
                      setSelectedGalleryImage(null);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Event Details
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default CombinedEventsTab;
