import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [protectedPage, setProtectedPage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

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
    { name: "Merch", path: "/merch" },
    { name: "Feedback", path: "/feedback", protected: true },
    { name: "Team", path: "/team" },
  ];

  const handleProtectedNavigation = (item: {
    name: string;
    path: string;
    protected?: boolean;
  }) => {
    // Only show login popup for protected pages when user not signed in
    if (item.protected && !isAuthenticated) {
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
    navigate('/login', { state: { from: location } });
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginDialog(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
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
          ? "bg-secondary/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
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
              {!isAuthenticated ? (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-primary hover:bg-white/10"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="hero"
                    size="default"
                    onClick={() => navigate('/register')}
                  >
                    Join Now
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer h-10 w-10 border-2 border-primary rounded-full bg-white flex items-center justify-center overflow-hidden transition-transform hover:scale-105">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-white font-bold">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs truncate">{user?.email}</p>
                      <p className="text-xs text-primary mt-0.5 capitalize">{user?.role}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    {(user?.role === 'admin' || user?.role === 'superadmin') && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-white border-white hover:bg-white/10"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/register');
                      }}
                    >
                      Join Now
                    </Button>
                  </div>
                ) : (
                  <div className="border-t border-white/20 pt-4 mt-2">
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="h-10 w-10 border-2 border-primary rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-white/60 text-xs">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
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
