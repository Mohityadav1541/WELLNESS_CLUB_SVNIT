import {
  Instagram,
  Mail,
  MapPin,
  ArrowRight,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import wellnessLogo from "@/assets/wellness-logo-clean.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Mock Auth for Local
  const isSignedIn = false;
  const openSignIn = (options?: any) => { console.log(options) };

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

  const handleProtectedNavigation = (href: string, isProtected: boolean) => {
    if (isProtected && !isSignedIn) {
      openSignIn({ redirectUrl: href });
      return false;
    }
    return true;
  };

  return (
    <footer className="bg-[#101010] text-white font-sans relative">
      {/* Red Top Accent / Torn Paper Effect */}
      <div className="bg-[#d12027] h-16 w-full relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#101010]"
          style={{
            clipPath: "polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)"
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <img src={wellnessLogo} alt="Wellness Club" className="w-12 h-12 object-cover rounded-full" />
              </div>
            </Link>

            <h2 className="text-xl md:text-2xl font-bold uppercase leading-normal tracking-wide max-w-md">
              Wellness Club navigates the <span className="text-[#d12027]">health culture</span> chaos of the past and present to <span className="text-white border-b-2 border-[#d12027]">SAVE THE FUTURE</span>.
            </h2>

            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/wellnessclubsvnit?igsh=MWs4d2hrcmtyN2VuMg==" },
                { icon: Mail, href: "mailto:wellnessclubsvnit@gmail.com" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d12027] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4 font-medium text-gray-400">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <button
                      onClick={() => !link.protected || isSignedIn ? null : openSignIn()}
                      className="hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      <Link to={link.href}>{link.name}</Link>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-4 font-medium text-gray-400">
                {programs.map(program => (
                  <li key={program.name}>
                    <Link to={program.href} className="hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Sign up for emails</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Get first dibs on new arrivals and advance notice on everything we do.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Email"
                className="bg-white text-black px-4 py-3 w-full outline-none font-medium placeholder:text-gray-400"
              />
              <button className="bg-[#d12027] text-white px-6 py-3 font-bold uppercase whitespace-nowrap hover:bg-red-700 transition-colors">
                Sign Me Up
              </button>
            </form>

            {/* Contact Info Preview */}
            {/* Contact Info Preview & Map */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[#d12027]" />
                <span>Wellness Club SVNIT, Surat</span>
              </div>

              {/* Google Map Embed */}
              <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.665241743606!2d72.7831154750355!3d21.16572488051779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec876e9fdf%3A0x6731d68369165440!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, opacity: 0.8 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="SVNIT Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-gray-500">
          <div className="space-y-2">
            <p>© {currentYear} Wellness Club. Privacy Policies. Cookie Policies.</p>
            <p>2802 Wetmore Ave, Everett, WA 98201 (Example Address)</p>
          </div>

          <div className="flex gap-6">
            <div className="group relative">
              <span className="cursor-pointer hover:text-white transition-colors">
                Deployed by MOHIT YADAV AND NEEL MHASKE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
