import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import wellnessLogo from "@/assets/wellness-logo-clean.png";
import PillNav from "./PillNav";

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);

  useEffect(() => {
    setActiveHref(location.pathname);
  }, [location]);

  // Define nav items for PillNav
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/programs" },
    { label: "Feedback", href: "/feedback", protected: true },
    { label: "Team", href: "/team" },
  ];

  return (
    <div className="flex justify-center w-full">
      <PillNav
        logo={wellnessLogo}
        logoAlt="Wellness Club Logo"
        items={navItems}
        activeHref={activeHref}
        className="fixed top-4 z-[9999]"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#000000"
        pillTextColor="#ffffff"
        ease="power2.out"
        initialLoadAnimation={true}
      />
    </div>
  );
};

export default Navbar;
