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
      id: 1,
      title: "eSports Tournament - Gaming for Wellness",
      date: "2025-09-06",
      time: "All Day",
      location: "SVNIT Campus",
      description:
        "The Wellness Club embraced the world of eSports with an exciting two-day gaming festival. Students participated in competitive battles, community gaming sessions, and stress-relief activities through gaming. Featured games include Free Fire, BGMI, Mini Militia, and Valorant.",
      tags: ["Gaming", "eSports", "Community", "Entertainment"],
      images: ["/esports_1.png"],
      featured: true,
      status: "closed",
      attendees: 120,
      prizePool: "₹7,000+",
      games: [
        "Free Fire",
        "BGMI (Battlegrounds Mobile India)",
        "Mini Militia",
        "Valorant",
      ],
      contact: "Karan Kumar: 9316551975 | Nakul Singh: 8824967809",
    },
    {
      id: 2,
      title: "NAAD — Musical Concert",
      date: "2025-11-09",
      time: "7:00 PM",
      location: "Canteen Cements, SVNIT",
      description:
        "NAAD is a full-fledged musical concert organized by the Wellness Club in association with Student Alumni SVNIT. The event focuses on music, energy, emotional connection, and collective joy. Theme: 'Come connect heart with happiness, dance with divinity.'",
      tags: ["Music", "Concert", "Entertainment", "Cultural"],
      images: ["/naad_1.png", "/naad_2.png"],
      featured: true,
      status: "closed",
      attendees: 200,
      artists: [
        "Iraj Ku Rath – Keyboard",
        "Bhabatosh Mohanty – Guitar",
        "Binod Nayak – Keyboard",
        "Debaprasad Tiwary – Bass Guitar",
        "Saswat Parida – Lyricist",
        "Shubhabrata Dey – Singer",
        "Kamalakshya Parida – Singer",
        "Bapin Jena – Singer",
        "Kanhunch Mishra – Drummer",
        "Shritam Sekhar Panda – Singer",
      ],
      contact: "Karan Kumar: 9316551975 | Nakul Singh: 8824967809",
    },
    {
      id: 3,
      title: "Blood Donation Camp — Raktadaan Amrit Mahotsav 2.0",
      date: "2025-09-17",
      time: "10:00 AM - 5:00 PM",
      location: "Staff Club, SVNIT",
      description:
        "A mega blood donation drive under 'Raktadaan Amrit Mahotsav 2.0,' encouraging students and staff to donate blood and save lives. A single blood donation can save up to three lives.",
      tags: ["Healthcare", "Social Cause", "Donation", "Community Service"],
      images: ["/blood_1.png"],
      featured: true,
      status: "closed",
      attendees: 150,
      partners: [
        "Wellness Club SVNIT",
        "Student Alumni Forum",
        "National Service Scheme",
      ],
      contact: "Karan Kumar: 9316551975 | Nakul Singh: 8824967809",
    },
    {
      id: 4,
      title: "Free Eye & Dental Checkup Camp",
      date: "2025-08-15",
      time: "11:30 AM",
      location: "Staff Club, SVNIT",
      description:
        "A free wellness camp offering comprehensive eye and dental checkups for students, staff, and campus residents. Promoting preventive healthcare and general well-being within the campus community.",
      tags: ["Healthcare", "Wellness", "Checkup", "Preventive Care"],
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      ],
      featured: false,
      status: "closed",
      attendees: 80,
      partners: [
        "Dr Agarwals Eye Hospital",
        "Summmirow Dental Hospital",
        "PRIZMA Eyecare Hospitals",
      ],
      contact: "Karan Kumar: 9316551975 | Nakul Singh: 8824967809",
    },
    {
      id: 5,
      title: "Guest Lecture / Motivational Talk",
      date: "2025-10-15",
      time: "3:00 PM - 5:00 PM",
      location: "Seminar Hall, SVNIT",
      description:
        "An insightful motivational lecture aimed at improving students' mental well-being, productivity, and emotional balance. Topics include stress management, building healthy habits, balancing academics and personal life, and developing a growth mindset.",
      tags: ["Mental Health", "Motivation", "Education", "Personal Growth"],
      images: ["/guest_lecture_1.png"],
      featured: false,
      status: "closed",
      attendees: 65,
      contact: "Karan Kumar: 9316551975 | Nakul Singh: 8824967809",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wellness Club Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover upcoming wellness events and browse photos from past
            gatherings at SVNIT
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:block">List</span>
                </button>
                <button
                  onClick={() => setViewMode("gallery")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === "gallery"
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="hidden sm:block">Gallery</span>
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  showFilters
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-amber-300"
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
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedFilter === tag
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
              return (
                <div
                  key={event.id}
                  onClick={() => openEventModal(event)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {imageLoadError[event.images[0]] ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Image className="w-12 h-12 text-gray-400" />
                        <span className="ml-2 text-gray-500">
                          Image not available
                        </span>
                      </div>
                    ) : (
                      <img
                        src={event.images[0]}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(event.images[0])}
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-amber-500 text-gray-900 px-3 py-2 rounded-lg font-bold text-sm shadow-lg">
                      {formatDate(event.date)}
                    </div>
                    {event.featured && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}
                    {/* Status Badge */}
                    <div
                      className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge.color} flex items-center gap-1`}
                    >
                      {statusBadge.icon}
                      {statusBadge.text}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      {event.images.length} photos
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title with Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-amber-500 mt-1">
                        {getEventIcon(event.tags)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                    </div>

                    {/* Event Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-amber-500">👥</span>
                          <span className="text-sm">
                            {event.attendees} attendees
                          </span>
                        </div>
                      )}
                      {event.prizePool && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-amber-500">🏆</span>
                          <span className="text-sm font-semibold text-green-600">
                            Prize Pool: {event.prizePool}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {event.description}
                    </p>

                    {/* Status-specific Message */}
                    {event.status === "closed" && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-700 font-semibold text-sm text-center flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Event Completed Successfully
                        </p>
                      </div>
                    )}
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
                          alt={`${imageItem.event.title} - Photo ${
                            imageItem.index + 1
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
        )}

        {/* Stats Bar - Only show in List View */}
        {viewMode === "list" && (
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
        )}

        {/* Event Modal - For List View */}
        {selectedEvent && !selectedGalleryImage && (
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
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      getStatusBadge(selectedEvent.status).color
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
        )}

        {/* Photo Viewer Modal - For Gallery View */}
        {selectedGalleryImage && (
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
                    alt={`${selectedGalleryImage.event.title} - Photo ${
                      selectedGalleryImage.index + 1
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
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
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
        )}
      </div>
    </div>
  );
};

export default CombinedEventsTab;
