import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, GamepadIcon, Music, Droplets, Eye, Speech, Lock } from 'lucide-react';
import { Event } from '../../services/eventService';

interface EventModalProps {
    event: Event;
    onClose: () => void;
}

const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const getStatusBadge = (status: Event["status"]) => {
    switch (status) {
        case "closed":
            return {
                text: "Event Closed",
                icon: <Lock className="w-3 h-3" />,
                color: "bg-gray-100 text-gray-800 border-gray-300",
            };
        case "ongoing":
            return {
                text: "Live Now",
                icon: (
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                ),
                color: "bg-red-100 text-red-800 border-red-300",
            };
        case "upcoming":
            return {
                text: "Upcoming",
                icon: <Calendar className="w-3 h-3" />,
                color: "bg-blue-100 text-blue-800 border-blue-300",
            };
    }
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
    return <Calendar className="w-5 h-5" />;
};

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Event Details */}
                <div className="p-6 md:p-8">
                    {/* Tags and Status */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(event.status).color
                                } flex items-center gap-1`}
                        >
                            {getStatusBadge(event.status).icon}
                            {getStatusBadge(event.status).text}
                        </div>
                    </div>

                    {/* Title with Icon */}
                    <div className="flex items-center gap-3 mb-6">
                        {getEventIcon(event.tags)}
                        <h2 className="text-3xl font-bold text-gray-900">
                            {event.title}
                        </h2>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <span>{formatFullDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Clock className="w-5 h-5 text-amber-500" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span>{event.location}</span>
                        </div>
                        {event.attendees && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <span className="text-amber-500">👥</span>
                                <span>{event.attendees} attendees</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    {/* Meta Lists */}
                    {event.games && event.games.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Games:</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.games.map((g, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{g}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Artists List */}
                    {event.artists && event.artists.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Artist Line-up:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {event.artists.map((artist, index) => (
                                    <div key={index} className="text-gray-700">
                                        {artist}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Partners List */}
                    {event.partners && event.partners.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                In Collaboration With:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {event.partners.map((partner, index) => (
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

                </div>
            </div>
        </div>
    );
};

export default EventModal;
