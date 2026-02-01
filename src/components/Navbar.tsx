import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Home, Info, Calendar, MessageSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wellnessLogo from "@/assets/wellness-logo-clean.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [protectedPage, setProtectedPage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // MOCK AUTH STATE for local server debugging
  const isSignedIn = false;
  const openSignIn = (options?: any) => {
    console.log("Open Sign In clicked (Mock)", options);
    // alert("Sign In disabled in local debug mode");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update background style
      setIsScrolled(currentScrollY > 50);

      // Handle show/hide on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold -> Hide
        setIsVisible(false);
      } else {
        // Scrolling up -> Show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Define all navbar links
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Events", path: "/programs", icon: Calendar },
    { name: "Feedback", path: "/feedback", protected: true, icon: MessageSquare },
    { name: "Team", path: "/team", icon: User },
  ];

  const handleProtectedNavigation = (item: {
    name: string;
    path: string;
    protected?: boolean;
  }) => {
    // Only show login popup for protected pages when user not signed in
    if (item.protected && !isSignedIn) {
      setProtectedPage(item.name);
      setShowLoginDialog(true);

      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      return false;
    }

    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    return true;
  };

  const handleLogin = () => {
    setShowLoginDialog(false);
    openSignIn({
      redirectUrl: protectedPage === "Events" ? "/programs" : "/feedback",
    });
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginDialog(false);
  };

  // Desktop NavLink
  const NavLink = ({
    item,
  }: {
    item: { name: string; path: string; protected?: boolean; icon: any };
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (!handleProtectedNavigation(item)) e.preventDefault();
    };

    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className={`relative font-medium transition-all group px-3 py-2 flex items-center justify-center`}
      >
        {/* Text - visible by default, hidden on hover */}
        <span
          className={`transition-all duration-300 transform group-hover:scale-0 group-hover:opacity-0 ${location.pathname === item.path ? "text-primary" : "text-white"
            }`}
        >
          {item.name}
        </span>

        {/* Icon - hidden by default, visible on hover */}
        <span
          className={`absolute transition-all duration-300 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${location.pathname === item.path ? "text-primary" : "text-white"
            }`}
        >
          <Icon size={20} />
        </span>

        {/* Underline effect */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
    );
  };

  // Mobile NavLink
  const MobileNavLink = ({
    item,
  }: {
    item: { name: string; path: string; protected?: boolean; icon: any };
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (!handleProtectedNavigation(item)) e.preventDefault();
    };

    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className={`text-white font-medium hover:text-primary transition-colors text-left py-2 ${location.pathname === item.path ? "text-primary" : ""
          }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "bg-secondary backdrop-blur-md shadow-lg py-4"
            : transparent
              ? "bg-transparent py-5"
              : "bg-secondary backdrop-blur-sm py-5"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={"svnit-logo.png"}
                alt="SVNIT Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
              />

              <img
                src={wellnessLogo}
                alt="Wellness Club Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full"
              />

              <span className="text-xl md:text-2xl font-bold text-primary">
                WELLNESS CLUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>

            {/* Right Side — Join Now OR User Button */}
            <div className="hidden md:block">
              {!isSignedIn ? (
                <Button
                  variant="hero"
                  size="default"
                  onClick={() => openSignIn({ redirectUrl: "/" })}
                >
                  Join Now
                </Button>
              ) : (
                <div className="h-10 w-10 border-2 border-primary rounded-full flex items-center justify-center bg-secondary">
                  <User className="text-white" />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 animate-fade-in">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <MobileNavLink key={item.name} item={item} />
                ))}

                {!isSignedIn ? (
                  <Button
                    variant="hero"
                    className="w-full mt-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openSignIn({ redirectUrl: "/" });
                    }}
                  >
                    Join Now
                  </Button>
                ) : (
                  <div className="flex justify-center mt-4">
                    <div className="h-12 w-12 border-2 border-primary rounded-full flex items-center justify-center bg-secondary">
                      <User className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Login Required</DialogTitle>
            <DialogDescription className="text-center">
              To access the {protectedPage} page, please log in to your account.
              This helps us provide you with a personalized experience and keep
              our community secure.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleContinueWithoutLogin}
              className="sm:flex-1"
            >
              Maybe Later
            </Button>
            <Button onClick={handleLogin} variant="hero" className="sm:flex-1">
              Log In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
