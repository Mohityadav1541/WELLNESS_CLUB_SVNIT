import React, { useState, useEffect } from "react";
import {
  Search,
  Grid,
  List,
  Filter,
} from "lucide-react";
import CircularGallery from "./CircularGallery";
import RegistrationModal from "./RegistrationModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { Event } from "../services/eventService";
import EventCard from "./events/EventCard";
import EventModal from "./events/EventModal";

interface GalleryImage {
  url: string;
  event: Event;
  index: number;
}

const CombinedEventsTab: React.FC = () => {
  const { data: events = [], isLoading, error } = useEvents();

  // Filters & UI State
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [imageLoadError, setImageLoadError] = useState<{ [key: string]: boolean }>({});

  const { isAuthenticated } = useAuth();
  const useNavigateHook = useNavigate();

  // Registration Modal State
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationEventId, setRegistrationEventId] = useState<number | string | null>(null);
  const [registrationEventTitle, setRegistrationEventTitle] = useState("");

  const handleRegister = (eventId: string | number) => {
    const event = events.find((e: Event) => e._id === eventId || e.id === eventId);
    if (event) {
      setRegistrationEventId(eventId);
      setRegistrationEventTitle(event.title);
      setIsRegistrationModalOpen(true);
    } else if (!isAuthenticated) {
      useNavigateHook('/login');
    }
  };

  const allTags = ["All", ...new Set(events.flatMap((event: Event) => event.tags))];

  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedFilter === "All" || event.tags.includes(selectedFilter);
    return matchesSearch && matchesTag;
  });

  // Flatten all images from all events for gallery view
  const allImages = events.flatMap((event: Event) =>
    (event.images || []).map((image: string, index: number) => ({
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

  // Gallery Navigation (Keeping this logic local as it's specific to this view)
  const nextImage = () => {
    if (selectedGalleryImage && selectedGalleryImage.event) {
      const eventImages = selectedGalleryImage.event.images;
      if (currentImageIndex < eventImages.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
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
        setSelectedGalleryImage({
          ...selectedGalleryImage,
          index: currentImageIndex - 1,
          url: eventImages[currentImageIndex - 1],
        });
      }
    }
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-24 text-red-500">
            <p>Failed to load events. Please try again later.</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && filteredEvents.length === 0 ? (
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
        ) : !isLoading && !error && viewMode === "list" ? (
          /* List View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredEvents.map((event: Event) => (
              <EventCard
                key={event.id || event._id}
                event={event}
                onClick={openEventModal}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : !isLoading && !error && (
          /* Gallery View - Circular 3D Gallery */
          <div className="h-[600px] w-full relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Event Gallery
              </h2>
              <p className="text-gray-300 text-sm drop-shadow-md">
                Drag to explore • Scroll to zoom
              </p>
            </div>

            <CircularGallery
              items={allImages
                .filter((imageItem: GalleryImage) =>
                  filteredEvents.some(
                    (event: Event) => event.id === imageItem.event.id
                  )
                )
                .map((imageItem: GalleryImage) => ({
                  image: imageItem.url,
                  text: imageItem.event.title.split(' ')[0] + '...' // Short text for the gallery
                }))}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              font="bold 30px Figtree"
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        )
        }

        {/* Stats Bar - Only show in List View */}
        {
          viewMode === "list" && !isLoading && (
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
                    {events.filter((e: Event) => e.featured).length}
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
                    {events.filter((e: Event) => e.status === "closed").length}
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
            <EventModal event={selectedEvent} onClose={closeModal} />
          )
        }

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          eventId={registrationEventId as string}
          eventTitle={registrationEventTitle}
        />
      </div>
    </div>
  );
};

export default CombinedEventsTab;
