import React from 'react';
import { Calendar, GamepadIcon, Lock } from 'lucide-react';
import { Event } from '../../services/eventService';

interface EventCardProps {
    event: Event;
    onClick: (event: Event) => void;
    onRegister: (eventId: string | number) => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
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

const EventCard: React.FC<EventCardProps> = ({ event, onClick, onRegister }) => {
    const isEsports = event.title === "eSports Tournament - Gaming for Wellness";
    const statusBadge = getStatusBadge(event.status);

    return (
        <div
            onClick={() => onClick(event)}
            className="col-span-1 lg:col-span-2 xl:col-span-3 h-auto md:h-[550px] flex flex-col md:flex-row overflow-hidden rounded-[2rem] cursor-pointer transform transition-transform duration-200 hover:scale-[1.005] bg-black border-2 border-amber-500/50 hover:border-amber-400 group relative z-10"
        >
            {/* Cyberpunk Glow Underlay */}
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
                        src={event.images[0] || "https://via.placeholder.com/800x600"}
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRegister(event._id || event.id || "");
                        }}
                        className="relative w-full overflow-hidden bg-amber-600 hover:bg-amber-500 text-black font-black uppercase py-5 tracking-widest transition-all duration-200 hover:tracking-[0.2em] skew-x-[-12deg] group/btn shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center text-center decoration-0"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite]" />
                        <div className="skew-x-[12deg] flex items-center justify-center gap-3 relative z-10">
                            <GamepadIcon className="w-6 h-6" />
                            REGISTER NOW
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
