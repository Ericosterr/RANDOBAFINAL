import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { AnimatedLogo } from "./AnimatedLogo";
import {
  Music,
  Calendar,
  Users,
  PlayCircle,
  GraduationCap,
  ChevronDown,
  Briefcase,
  Sparkles,
  Palette,
  Headphones,
  Smartphone,
  Menu,
  X,
  Globe,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function Navigation() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      setScrollY(currentScrollY);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection]);

  const navItems = [
    { href: "/", label: "Home", icon: Music },
    { href: "/contacts", label: "Contacts", icon: Phone },
    { href: "/playlists", label: "Playlists", icon: PlayCircle },
  ];

  const servicesItems = [
    {
      href: "/courses",
      label: "RANDOBA School",
      icon: GraduationCap,
      description: "Professional DJ courses and education",
    },
    {
      href: "/agency",
      label: "Artist Agency",
      icon: Users,
      description: "Talent representation and booking",
    },
    {
      href: "/events-production",
      label: "Events Production",
      icon: Sparkles,
      description: "Full-service event planning and execution",
    },
    {
      href: "/support",
      label: "Technical Support",
      icon: Headphones,
      description: "Expert technical assistance and consulting",
    },
    {
      href: "/events",
      label: "Events",
      icon: Calendar,
      description: "Workshops, masterclasses, and live shows",
    },
    {
      href: "/production",
      label: "Production Brand and Content",
      icon: Palette,
      description: "Coming soon",
      comingSoon: true,
    },
    {
      href: "/marketing",
      label: "Digital Marketing",
      icon: Smartphone,
      description: "Coming soon",
      comingSoon: true,
    },
  ];

  return (
    <nav className="backdrop-blur-sm sticky top-0 z-50 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 md:h-20 lg:h-24">
          {/* Left: Animated Logo */}
          <div className="flex justify-start items-center">
            <Link to="/" className="flex items-center">
              <AnimatedLogo
                videoSrc="/path-to-your-logo-animation.mp4"
                fallbackImageSrc="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F84932e42a7c9462db2fccb09dd8d785b?format=webp&width=800"
                alt="RANDOBA Logo"
                className="w-auto h-12 sm:h-14 md:h-16 lg:h-20 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Center: Home and Services */}
          <div className="hidden md:flex md:flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 min-w-0">
            {/* Home Link */}
            <Link
              to="/"
              className={`flex items-center whitespace-nowrap space-x-2 px-2 md:px-3 lg:px-4 xl:px-5 py-2 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "text-white bg-white/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Music className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center whitespace-nowrap space-x-2 px-2 md:px-3 lg:px-4 xl:px-5 py-2 rounded-lg transition-colors text-gray-200 hover:text-white hover:bg-white/10 group-hover:text-white group-hover:bg-white/10">
                <Briefcase className="w-4 h-4" />
                <span className="font-medium">Services</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu - Centered */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="p-2">
                  {servicesItems.map((service, index) => {
                    const ServiceIcon = service.icon;
                    const isActive = location.pathname === service.href;

                    if (service.comingSoon) {
                      return (
                        <div
                          key={service.href}
                          className="flex items-start space-x-3 p-3 rounded-lg opacity-50 cursor-not-allowed"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-400">
                              {service.label}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-800 group/item ${
                          isActive ? "bg-gray-800 border-l-2 border-[#6efff8]" : ""
                        }`}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover/item:bg-[#6efff8] group-hover/item:text-black transition-colors">
                          <ServiceIcon className="w-4 h-4 text-[#6efff8]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover/item:text-white">
                            {service.label}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 leading-tight">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* Right: Other Navigation Items and Mobile Menu */}
          <div className="flex justify-end items-center pr-2 sm:pr-4">
            {/* Desktop: Rest of Navigation Items */}
            <div className="hidden lg:flex lg:flex-nowrap items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
              {navItems.slice(1).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center whitespace-nowrap space-x-2 px-2 md:px-3 lg:px-4 xl:px-5 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-white bg-white/20"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Language Switcher */}
              <div className="flex items-center ml-6 xl:ml-8 2xl:ml-10 pl-6 xl:pl-8 2xl:pl-10 border-l border-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-gray-200 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language === "en" ? "ENG" : "ES"}</span>
                </Button>
              </div>
            </div>

            {/* Medium screens: Language switcher only */}
            <div className="hidden md:flex lg:hidden items-center mr-2 ml-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-200 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === "en" ? "ENG" : "ES"}</span>
              </Button>
            </div>

            {/* Mobile: Language switcher and menu button */}
            <div className="md:hidden flex items-center space-x-2 ml-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-200 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{language === "en" ? "ENG" : "ES"}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10 p-2"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>

            {/* Tablet menu button (shows other nav items on medium screens) */}
            <div className="hidden md:block lg:hidden ml-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {/* Always show Home and Services prominently on mobile */}
            <div className="space-y-3 border-b border-gray-700 pb-4">
              {/* Mobile Home Link */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "text-white bg-white/20"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Music className="w-5 h-5" />
                <span className="text-lg font-medium">Home</span>
              </Link>

              {/* Mobile Services Section */}
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3 text-white">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-lg font-medium">Services</span>
                  </div>
                </div>
                <div className="ml-4 space-y-1">
                  {servicesItems.map((service) => {
                    const ServiceIcon = service.icon;
                    const isActive = location.pathname === service.href;

                    if (service.comingSoon) {
                      return (
                        <div
                          key={service.href}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg opacity-50 cursor-not-allowed"
                        >
                          <ServiceIcon className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-400">{service.label}</div>
                            <div className="text-xs text-gray-500">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "text-white bg-white/20"
                            : "text-gray-200 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <ServiceIcon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{service.label}</div>
                          <div className="text-xs text-gray-400">
                            {service.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            <div className="space-y-2">
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  More
                </div>
              </div>
              {navItems.slice(1).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "text-white bg-white/20"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Language Switcher */}
            <div className="border-t border-gray-700 pt-4">
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Language
                </div>
              </div>
              <div className="px-4">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-3 py-3 text-gray-200 hover:text-white hover:bg-white/10 transition-colors w-full justify-start"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    {language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
