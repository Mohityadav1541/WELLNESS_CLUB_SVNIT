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
                    <video
                        src="/intro_video.mp4"
                        poster="/svnit-logo.png" // Fallback image while loading
                        autoPlay
                        muted
                        loop={false}
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    {/* Optional: Overlay text if needed */}
                    <div className="absolute bottom-10 left-0 right-0 text-center z-20">
                        <p className="text-white/50 text-sm animate-pulse">Click anywhere to skip</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroOverlay;
