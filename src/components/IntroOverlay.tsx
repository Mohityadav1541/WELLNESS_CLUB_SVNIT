import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Disable scrolling when intro is visible
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        const handleDismiss = () => {
            setIsVisible(false);
        };

        // Auto dismiss after 4 seconds
        const timer = setTimeout(handleDismiss, 4000);

        // Interaction listeners
        window.addEventListener("click", handleDismiss);
        window.addEventListener("keydown", handleDismiss);
        window.addEventListener("scroll", handleDismiss);
        window.addEventListener("wheel", handleDismiss);
        window.addEventListener("touchstart", handleDismiss);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("click", handleDismiss);
            window.removeEventListener("keydown", handleDismiss);
            window.removeEventListener("scroll", handleDismiss);
            window.removeEventListener("wheel", handleDismiss);
            window.removeEventListener("touchstart", handleDismiss);
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    {/* Mobile View: Nature Background + Logo */}
                    <div className="md:hidden absolute inset-0 w-full h-full">
                        <img
                            src="/mobile_intro_bg.png"
                            alt="Wellness Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" /> {/* Dimming overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src="/wellness-logo.png"
                                alt="Wellness Club Logo"
                                className="w-48 h-48 object-contain drop-shadow-2xl animate-fade-up"
                            />
                        </div>
                    </div>

                    {/* Desktop View: Video */}
                    <div className="hidden md:block w-full h-full">
                        <video
                            src="/intro_video.mp4"
                            autoPlay
                            muted
                            loop={false}
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Optional: Overlay text if needed */}
                    <div className="absolute bottom-10 left-0 right-0 text-center z-20">
                        <p className="text-white/70 text-sm animate-pulse font-medium tracking-wide">Click anywhere to enter</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroOverlay;
