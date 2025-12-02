import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useClerk, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import wellnessLogo from "@/assets/wellness-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const quickLinks = [
    { name: "About Us", href: "/about", protected: false },
    { name: "Programs", href: "/programs", protected: true },
    { name: "Feedback", href: "/feedback", protected: true },
    { name: "Team", href: "/team", protected: false },
  ];

  const programs = [
    { name: "Esports", href: "/programs", protected: false },
    { name: "Guest lecture", href: "/programs", protected: false },
    { name: "Naad Concert", href: "/programs", protected: false },
    { name: "Eye checkup", href: "/programs", protected: false },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/solstice.neel/",
      label: "Instagram - Neel",
      username: "@solstice.neel",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/yadav__mohit_0/",
      label: "Instagram - Mohit",
      username: "@yadav__mohit_0",
    },
  ];

  const handleProtectedNavigation = (href: string, isProtected: boolean) => {
    if (isProtected && !isSignedIn) {
      openSignIn({ redirectUrl: href });
      return false;
    }
    return true;
  };

  // Protected Link component
  const ProtectedLink = ({
    item,
  }: {
    item: { name: string; href: string; protected: boolean };
  }) => {
    const handleClick = (e: React.MouseEvent) => {
      if (!handleProtectedNavigation(item.href, item.protected)) {
        e.preventDefault();
      }
    };

    return (
      <Link
        to={item.href}
        onClick={handleClick}
        className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
        {item.name}
      </Link>
    );
  };

  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={wellnessLogo}
                alt="Wellness Club"
                className="h-12 w-12"
              />
              <span className="text-2xl font-bold text-primary">
                Wellness Club
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              Transform your life with our holistic approach to wellness. Join
              our community today.
            </p>

            {/* Social Links */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <ProtectedLink item={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">
              Our Programs
            </h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <ProtectedLink item={program} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>Wellness Club SVNIT Surat</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:wellnessclubsvnit@gmail.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  wellnessclubsvnit@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Info */}
        <div className="border-t border-white/20 pt-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">
                Developed By
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Neel Mhaske</p>
                    <a
                      href="https://www.instagram.com/solstice.neel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      @solstice.neel
                    </a>
                    <a
                      href="mailto:mhaskeneel0709@gmail.com"
                      className="block text-white/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      mhaskeneel0709@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Mohit Yadav</p>
                    <a
                      href="https://www.instagram.com/yadav__mohit_0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      @yadav__mohit_0
                    </a>
                    <a
                      href="mailto:mr.mohit1540@gmail.com"
                      className="block text-white/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      mr.mohit1540@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">
                Club Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Official Email</p>
                    <a
                      href="mailto:wellnessclubsvnit@gmail.com"
                      className="text-white/70 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      wellnessclubsvnit@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-white/70">
              © {currentYear} Wellness Club SVNIT. All rights reserved.
            </p>
            <p className="text-white/50 text-sm mt-2">
              Made with ❤️ by Neel Mhaske & Mohit Yadav
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
