import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import wellnessLogo from "@/assets/wellness-logo-clean.png";
import PillNav from "./PillNav";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);

  // MOCK AUTH STATE for local server debugging
  const isSignedIn = false;
  const openSignIn = (options?: any) => {
    console.log("Open Sign In clicked (Mock)", options);
    // alert("Sign In disabled in local debug mode");
  };

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

  const rightElement = (
    <div className="flex items-center gap-4">
      {!isSignedIn ? (
        <Button
          variant="hero"
          size="default"
          onClick={() => openSignIn({ redirectUrl: "/" })}
          className="rounded-full px-6 font-semibold"
        >
          Join Now
        </Button>
      ) : (
        <div className="h-10 w-10 border-2 border-primary rounded-full flex items-center justify-center bg-secondary">
          <User className="text-white" />
        </div>
      )}
    </div>
  );

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
        initialLoadAnimation={false}
        rightElement={rightElement}
      />
    </div>
  );
};

export default Navbar;
