import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   useClerk,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   useUser,
// } from "@clerk/clerk-react";
import wellnessLogo from "@/assets/wellness-logo.png";
import svnitLogo from "@/assets/svnit-logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [protectedPage, setProtectedPage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // MOCK AUTH - Clerk disabled due to missing key
  // const { openSignIn } = useClerk();
  // const { isSignedIn } = useUser();
  const isSignedIn = false;
  const openSignIn = (opts: any) => console.log("Sign In Clicked (Auth Disabled)", opts);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define all navbar links
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/programs" },
    { name: "Feedback", path: "/feedback", protected: true },
    { name: "Team", path: "/team" },
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
    item: { name: string; path: string; protected?: boolean };
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (!handleProtectedNavigation(item)) e.preventDefault();
    };

    return (
      <Link
        to={item.path}
        onClick={handleClick}
        className={`text-white font-medium hover:text-primary transition-colors relative group ${location.pathname === item.path ? "text-primary" : ""
          }`}
      >
        {item.name}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
    );
  };

  // Mobile NavLink
  const MobileNavLink = ({
    item,
  }: {
    item: { name: string; path: string; protected?: boolean };
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-secondary backdrop-blur-md shadow-lg py-4"
          : "bg-secondary backdrop-blur-sm py-5"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={wellnessLogo}
                alt="Wellness Club Logo"
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <img
                src={svnitLogo}
                alt="SVNIT Logo"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full hidden sm:block"
              />
              <span className="text-xl md:text-2xl font-bold text-primary">
                Wellness Club
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
                <div className="h-10 w-10 border-2 border-primary rounded-full bg-gray-200" />
                // <UserButton ... />
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
                    {/* <UserButton ... /> */}
                    <div className="h-12 w-12 border-2 border-primary rounded-full bg-gray-200" />
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
