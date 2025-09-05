import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../contexts/AuthContext";
import { BookingModal } from "../components/BookingModal";
import { eventsService, type CMSEvent } from "../services/eventsService";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Star,
  Music,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Volume2,
  Mic,
  Play,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  instructor: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Workshop" | "Masterclass" | "Live Event" | "Course" | "Club Nights";
  description: string;
  rating: number;
}

export default function Events() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [selectedBookingEvent, setSelectedBookingEvent] =
    useState<CalendarEvent | null>(null);
  const [cmsEvents, setCmsEvents] = useState<CMSEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All Events");

  // Fetch events from CMS on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const events = await eventsService.fetchEvents();
        setCmsEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const events: CalendarEvent[] = [
    // January 2024 events (existing)
    {
      id: "1",
      title: "DJ Mixing Workshop",
      instructor: "Marcus Rodriguez",
      date: new Date(2024, 0, 15), // January 15, 2024
      time: "19:00",
      duration: "3 hours",
      location: "Studio A",
      price: 89,
      spotsLeft: 3,
      totalSpots: 12,
      level: "Beginner",
      category: "Workshop",
      description:
        "Learn the basics of DJ mixing including beatmatching and transitions.",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Turntablism Masterclass",
      instructor: "DJ Luna",
      date: new Date(2024, 0, 18), // January 18, 2024
      time: "20:00",
      duration: "4 hours",
      location: "Main Studio",
      price: 149,
      spotsLeft: 1,
      totalSpots: 8,
      level: "Advanced",
      category: "Masterclass",
      description: "Master advanced turntable techniques and scratching.",
      rating: 4.9,
    },
    {
      id: "3",
      title: "Electronic Production",
      instructor: "Alex Waves",
      date: new Date(2024, 0, 20), // January 20, 2024
      time: "14:00",
      duration: "6 hours",
      location: "Production Lab",
      price: 199,
      spotsLeft: 5,
      totalSpots: 10,
      level: "Intermediate",
      category: "Course",
      description: "Create professional electronic tracks with industry tools.",
      rating: 4.7,
    },
    {
      id: "4",
      title: "Live Performance Night",
      instructor: "Various Artists",
      date: new Date(2024, 0, 22), // January 22, 2024
      time: "21:00",
      duration: "5 hours",
      location: "Club Vertex",
      price: 35,
      spotsLeft: 25,
      totalSpots: 100,
      level: "Beginner",
      category: "Live Event",
      description: "Experience live DJ performances and network.",
      rating: 4.6,
    },
    {
      id: "5",
      title: "Business Workshop",
      instructor: "Sarah Martinez",
      date: new Date(2024, 0, 25), // January 25, 2024
      time: "10:00",
      duration: "8 hours",
      location: "Conference Room B",
      price: 299,
      spotsLeft: 7,
      totalSpots: 15,
      level: "Intermediate",
      category: "Workshop",
      description: "Learn to start and grow your mobile DJ business.",
      rating: 4.8,
    },
    {
      id: "6",
      title: "Hip-Hop Masterclass",
      instructor: "DJ Rhythm",
      date: new Date(2024, 0, 28), // January 28, 2024
      time: "18:00",
      duration: "3 hours",
      location: "Studio C",
      price: 119,
      spotsLeft: 2,
      totalSpots: 12,
      level: "Advanced",
      category: "Masterclass",
      description: "Master hip-hop DJing and scratching techniques.",
      rating: 4.9,
    },

    // July 2025 events
    {
      id: "7",
      title: "Summer DJ Bootcamp",
      instructor: "DJ Phoenix",
      date: new Date(2025, 6, 2), // July 2, 2025
      time: "10:00",
      duration: "8 hours",
      location: "Main Academy",
      price: 349,
      spotsLeft: 8,
      totalSpots: 20,
      level: "Beginner",
      category: "Course",
      description:
        "Intensive summer bootcamp covering all DJ fundamentals in one day.",
      rating: 4.8,
    },
    {
      id: "8",
      title: "Vinyl Revival Workshop",
      instructor: "Classic Carl",
      date: new Date(2025, 6, 5), // July 5, 2025
      time: "15:00",
      duration: "4 hours",
      location: "Vintage Studio",
      price: 129,
      spotsLeft: 6,
      totalSpots: 12,
      level: "Intermediate",
      category: "Workshop",
      description:
        "Rediscover the art of vinyl DJing with classic techniques and rare records.",
      rating: 4.7,
    },
    {
      id: "9",
      title: "EDM Festival Prep",
      instructor: "Electro Max",
      date: new Date(2025, 6, 8), // July 8, 2025
      time: "20:00",
      duration: "3 hours",
      location: "Festival Ground",
      price: 89,
      spotsLeft: 15,
      totalSpots: 50,
      level: "Advanced",
      category: "Masterclass",
      description:
        "Prepare for festival season with advanced crowd control and set planning.",
      rating: 4.9,
    },
    {
      id: "10",
      title: "Rooftop Summer Jam",
      instructor: "Various DJs",
      date: new Date(2025, 6, 12), // July 12, 2025
      time: "18:00",
      duration: "6 hours",
      location: "Skyline Rooftop",
      price: 45,
      spotsLeft: 35,
      totalSpots: 120,
      level: "Beginner",
      category: "Live Event",
      description:
        "Sunset performances with amazing city views and networking opportunities.",
      rating: 4.6,
    },
    {
      id: "11",
      title: "Mixing Techniques Lab",
      instructor: "Tech Nina",
      date: new Date(2025, 6, 15), // July 15, 2025
      time: "19:00",
      duration: "2.5 hours",
      location: "Tech Lab",
      price: 75,
      spotsLeft: 4,
      totalSpots: 8,
      level: "Intermediate",
      category: "Workshop",
      description:
        "Hands-on lab focusing on advanced mixing techniques and equipment.",
      rating: 4.8,
    },
    {
      id: "12",
      title: "Producer to DJ Transition",
      instructor: "Hybrid Steve",
      date: new Date(2025, 6, 18), // July 18, 2025
      time: "16:00",
      duration: "5 hours",
      location: "Studio Complex",
      price: 199,
      spotsLeft: 7,
      totalSpots: 15,
      level: "Advanced",
      category: "Course",
      description:
        "Bridge the gap from music production to live DJing performance.",
      rating: 4.7,
    },
    {
      id: "13",
      title: "Beginner Friendly Friday",
      instructor: "DJ Mentor Mike",
      date: new Date(2025, 6, 20), // July 20, 2025
      time: "17:00",
      duration: "2 hours",
      location: "Community Center",
      price: 35,
      spotsLeft: 12,
      totalSpots: 25,
      level: "Beginner",
      category: "Workshop",
      description:
        "Perfect introduction for complete beginners with basic equipment overview.",
      rating: 4.5,
    },
    {
      id: "14",
      title: "Scratch Battle Night",
      instructor: "Battle Master DJ X",
      date: new Date(2025, 6, 23), // July 23, 2025
      time: "21:00",
      duration: "4 hours",
      location: "Underground Venue",
      price: 25,
      spotsLeft: 45,
      totalSpots: 80,
      level: "Advanced",
      category: "Live Event",
      description:
        "Competitive scratching battles with prizes and recognition.",
      rating: 4.8,
    },
    {
      id: "15",
      title: "Controller vs CDJs",
      instructor: "Gear Guru Tom",
      date: new Date(2025, 6, 26), // July 26, 2025
      time: "14:00",
      duration: "3 hours",
      location: "Equipment Center",
      price: 95,
      spotsLeft: 9,
      totalSpots: 16,
      level: "Intermediate",
      category: "Workshop",
      description:
        "Compare and master both controller and CDJ setups for versatile DJing.",
      rating: 4.6,
    },
    {
      id: "16",
      title: "Master DJ Showcase",
      instructor: "Legendary DJ Apex",
      date: new Date(2025, 6, 30), // July 30, 2025
      time: "19:30",
      duration: "3.5 hours",
      location: "Grand Auditorium",
      price: 299,
      spotsLeft: 18,
      totalSpots: 200,
      level: "Advanced",
      category: "Masterclass",
      description:
        "Exclusive masterclass with world-renowned DJ covering career insights and advanced techniques.",
      rating: 5.0,
    },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Workshop":
        return "bg-blue-500";
      case "Masterclass":
        return "bg-purple-500";
      case "Live Event":
        return "bg-pink-500";
      case "Sunrise Soul":
        return "bg-yellow-400";
      case "Sunset":
        return "bg-orange-400";
      case "Sunset Soul":
        return "bg-orange-400";
      case "Brunch":
        return "bg-amber-400";
      case "Retreat Events":
        return "bg-indigo-400";
      case "Course":
        return "bg-green-500";
      case "Club Nights":
        return "bg-pink-500";
      default:
        return "bg-gold-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Workshop":
        return <Headphones className="w-3 h-3" />;
      case "Masterclass":
        return <Star className="w-3 h-3" />;
      case "Live Event":
        return <Music className="w-3 h-3" />;
      case "Course":
        return <Volume2 className="w-3 h-3" />;
      case "Sunrise Soul":
        return <Music className="w-3 h-3" />;
      case "Sunset":
        return <Music className="w-3 h-3" />;
      case "Sunset Soul":
        return <Music className="w-3 h-3" />;
      case "Brunch":
        return <Music className="w-3 h-3" />;
      case "Retreat Events":
        return <CalendarIcon className="w-3 h-3" />;
      case "Club Nights":
        return <Music className="w-3 h-3" />;
      default:
        return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "border-l-green-400";
      case "Intermediate":
        return "border-l-yellow-400";
      case "Advanced":
        return "border-l-red-400";
      default:
        return "border-l-gray-400";
    }
  };

  const handleEventHover = (
    event: CalendarEvent,
    mouseEvent: React.MouseEvent,
  ) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredEvent(event);
    setHoverPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
  };

  const handleEventLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredEvent(null);
    }, 200); // 200ms delay before hiding
    setHoverTimeout(timeout);
  };

  const handleTooltipEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleTooltipLeave = () => {
    setHoveredEvent(null);
  };

  const handleBookEvent = (event: CalendarEvent) => {
    setSelectedBookingEvent(event);
    setBookingModalOpen(true);
    setHoveredEvent(null); // Hide the tooltip
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .group:hover .event-image {
            transform: scale(1.1) rotate(1deg);
          }

          .group:hover .event-content {
            transform: translateY(-2px);
          }
        `}
      </style>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] overflow-hidden bg-black -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2Fd8cd475c5e9d49c6b471be0095277392%2Ffc7e5e30d28c4da0b2af88d69547773b?format=webp&width=1600" />
            <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2Fd8cd475c5e9d49c6b471be0095277392%2Ffc7e5e30d28c4da0b2af88d69547773b?format=webp&width=800" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fd8cd475c5e9d49c6b471be0095277392%2Ffc7e5e30d28c4da0b2af88d69547773b?format=webp&width=400" alt="Electric Mountain DJ Events Background" className="w-full h-full object-cover object-center opacity-60" loading="lazy" decoding="async" />
          </picture>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-32 min-h-[50vh] sm:min-h-[60vh] flex items-center">
          <div className="text-center w-full">
            <div className="space-y-6 lg:space-y-8 text-white">
              <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 mx-auto inline-flex">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {isEs ? "Eventos y talleres en vivo" : "Live Events & Workshops"}
              </Badge>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#6efff8'}}>
                  {isEs ? 'Eventos RANDOBA' : 'RANDOBA Events'}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
                  {isEs
                    ? 'RANDOBA crea eventos imprescindibles: sonido impecable, conceptos cuidados y carteles curados que mueven a la audiencia. Cada evento es producido íntegramente por RANDOBA: desde la dirección musical y la contratación de artistas hasta sonido premium, iluminación y escenario, coordinación del show en vivo y una ejecución fluida in situ. Elige tu momento y reserva tus entradas, o contáctanos para llevar este estándar a tu espacio.'
                    : 'RANDOBA delivers must-attend events - flawless sound, crafted concepts, and curated lineups that move the crowd. Every event is fully produced by RANDOBA - conceived and delivered in-house, from music direction and artist booking to premium sound, lighting and stage, live show coordination, and seamless on-site execution. Pick your moment and book tickets - or get in touch to bring this standard to your venue.'}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-transparent border-2 text-[#6efff8] border-[#6efff8] hover:bg-[#6efff8]/10 font-semibold w-full sm:w-auto"
                  onClick={() => {
                    const el = document.getElementById('events-calendar');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                  {isEs ? 'Ver calendario' : 'View Calendar'}
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent border-2 text-[#6efff8] border-[#6efff8] hover:bg-[#6efff8]/10 font-semibold w-full sm:w-auto"
                  onClick={() => {
                    const el = document.getElementById('event-archive');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                  {isEs ? 'Archivo de eventos' : 'Event Archive'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events List Section */}
      <section id="events-calendar" className="pt-16 pb-12 lg:pt-20 lg:pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-[#6efff8] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-[#4fd1c7] to-[#14b8a6] rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{color: '#6efff8'}}>
              {isEs ? 'Calendario de eventos RANDOBA - Elige tu momento' : 'RANDOBA Events Calendar - Choose Your Moment'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {isEs
                ? 'Descubre lo que viene en España: mañanas Sunrise Soul, sesiones al atardecer, Noches de club en villas, azoteas, beach clubs y más. Cuenta con sonido impecable, carteles curados y una vibra que encaja con el espacio y el momento. Aforo limitado: reserva tu lugar y no te lo pierdas.'
                : "See what's coming up across Spain: Sunrise Soul mornings, golden hour Sunset sessions, Club Nights in villas, rooftops, beach clubs, and more. Count on impeccable sound, curated lineups, and a vibe that fits the room and the moment. Capacity is limited - reserve your spot and be there."}
            </p>
          </div>

          {/* Modern Event Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
              <div className="flex gap-2 justify-center items-center">
                {(isEs ? ["Todos los eventos", "Atardecer", "Sunrise Soul", "Noches de club", "Brunch", "Eventos de retiro"] : ["All Events", "Sunset", "Sunrise Soul", "Club Nights", "Brunch", "Retreat Events"]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedFilter === filter
                        ? 'shadow-lg'
                        : 'hover:bg-opacity-10'
                    }`}
                    style={{
                      backgroundColor: selectedFilter === filter ? '#6efff8' : 'transparent',
                      color: selectedFilter === filter ? '#000' : '#6efff8',
                      border: selectedFilter === filter ? 'none' : `1px solid rgba(110, 255, 248, 0.3)`,
                      boxShadow: selectedFilter === filter ? '0 10px 15px -3px rgba(110, 255, 248, 0.4)' : 'none'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {[
              {
                id: "featured-1",
                title: "RANDOBA Festival 2025",
                description:
                  "Our biggest annual celebration featuring 50+ international DJs across 5 stages. Experience the ultimate electronic music festival.",
                image:
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
                date: "August 15-17, 2025",
                location: "Festival Grounds",
                price: 299,
                category: "Club Nights",
                level: "All Levels",
                spotsLeft: 2847,
                totalSpots: 5000,
                rating: 4.9,
                instructor: "Various Artists",
                duration: "3 Days",
                featured: true,
              },
              {
                id: "featured-2",
                title: "Legendary Masters Workshop",
                description:
                  "Exclusive masterclass with world-renowned DJ legends. Learn advanced techniques and industry secrets from the best in the business.",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2Fa15f9abf5e42476c8b74613956346c99%2Ffd4b74b3d65147348f4f3104952e936c?format=webp&width=800",
                date: "July 22, 2025",
                location: "Grand Studio",
                price: 499,
                // The category determines filtering; set to 'Sunrise Soul' so it appears when that filter is selected
                category: "Sunrise Soul",
                // badgeLabel controls the visible badge text on the card (keeps 'Masterclass' visually)
                badgeLabel: "Sunset Soul",
                level: "Advanced",
                spotsLeft: 3,
                totalSpots: 15,
                rating: 5.0,
                instructor: "DJ Apex & DJ Luna",
                duration: "6 hours",
                featured: true,
              },
              {
                id: "featured-3",
                title: "Underground Collective",
                description:
                  "Intimate underground sessions featuring emerging talents and experimental sounds. Connect with the underground scene.",
                image:
                  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
                date: "Every Friday",
                location: "Secret Venues",
                price: 45,
                // Set category to 'Sunset' so it appears when the Sunset filter is active
                category: "Sunset",
                // badgeLabel now shows 'Sunset' on the badge
                badgeLabel: "Sunset",
                level: "All Levels",
                spotsLeft: 25,
                totalSpots: 80,
                rating: 4.7,
                instructor: "Collective Artists",
                duration: "4 hours",
                featured: true,
              },
              {
                id: "featured-4",
                title: "Production Bootcamp",
                description:
                  "Intensive 3-day bootcamp covering everything from beat making to mixing and mastering. All equipment included.",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2Fa15f9abf5e42476c8b74613956346c99%2Ff60dd99efaf5431f97163ef19ea8c112?format=webp&width=800",
                date: "September 5-7, 2025",
                location: "Production Lab",
                price: 899,
                // For filtering, set category to 'Brunch' so it appears when Brunch filter is selected
                category: "Brunch",
                // badgeLabel controls visible badge text
                badgeLabel: "Brunch",
                level: "Intermediate",
                spotsLeft: 12,
                totalSpots: 20,
                rating: 4.8,
                instructor: "Alex Waves",
                duration: "3 Days",
                featured: true,
              },
              {
                id: "featured-5",
                title: "Vinyl Revival Experience",
                description:
                  "Discover the art of vinyl DJing with rare records and classic techniques. Hands-on experience with professional turntables.",
                image:
                  "https://cdn.builder.io/api/v1/image/assets%2Fa15f9abf5e42476c8b74613956346c99%2Fd34b3ce72a9b4e1bb325af4137669ec7?format=webp&width=800",
                date: "August 10, 2025",
                location: "Vintage Studio",
                price: 199,
                // Assign to Retreat Events category so it appears under that filter
                category: "Retreat Events",
                // Show badge as 'Retreat Events'
                badgeLabel: "Retreat Events",
                level: "Beginner",
                spotsLeft: 8,
                totalSpots: 16,
                rating: 4.6,
                instructor: "Classic Carl",
                duration: "5 hours",
                featured: true,
              },
              {
                id: "featured-6",
                title: "Rooftop Sunset Sessions",
                description:
                  "Magical sunset performances with breathtaking city views. Network with fellow music lovers while enjoying amazing sets.",
                image:
                  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
                date: "Every Weekend",
                location: "Sky Terrace",
                price: 75,
                category: "Sunset",
                badgeLabel: "Sunset",
                level: "All Levels",
                spotsLeft: 45,
                totalSpots: 120,
                rating: 4.8,
                instructor: "Various DJs",
                duration: "3 hours",
                featured: true,
              },
            ].filter((event) => {
                      const translate = (label: string) => {
                        if (!label) return label;
                        const mapEs: Record<string,string> = {
                          'Todos los eventos': 'All Events',
                          'Atardecer': 'Sunset',
                          'Noches de club': 'Club Nights',
                          'Eventos de retiro': 'Retreat Events',
                          'Brunch': 'Brunch',
                          'Sunrise Soul': 'Sunrise Soul'
                        };
                        return isEs ? (mapEs[label] || label) : label;
                      };
                      const active = translate(selectedFilter);
                      if (active === 'All Events') return true;
                      return (event.category === active) || event.category.toLowerCase().includes(active.toLowerCase());
                    }).map((event, index) => (
              <div
                key={event.id}
                className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <Card className="h-full bg-gradient-to-br from-slate-800/90 via-gray-800/70 to-slate-900/90 border-2 backdrop-blur-sm transition-all duration-500 hover:scale-105 overflow-hidden shadow-2xl" style={{borderColor: '#6efff8', boxShadow: '0 25px 50px -12px rgba(110, 255, 248, 0.2)'}}>
                  <div className="relative">
                    {(() => {
                      const buildUrl = (url: string, w: number) => {
                        if (!url) return url;
                        try {
                          if (url.includes('width=')) return url.replace(/width=\d+/, 'width=' + w);
                          if (url.includes('w=')) return url.replace(/w=\d+/, 'w=' + w);
                          return url.includes('?') ? url + `&width=${w}` : url + `?width=${w}`;
                        } catch (e) {
                          return url;
                        }
                      };

                      const src400 = buildUrl(event.image, 400);
                      const src800 = buildUrl(event.image, 800);
                      const src1600 = buildUrl(event.image, 1600);
                      const srcSetAll = `${src1600} 1600w, ${src800} 800w, ${src400} 400w`;

                      return (
                        <picture>
                          <source media="(min-width:1024px)" srcSet={srcSetAll} />
                          <source media="(min-width:640px)" srcSet={`${src800} 800w, ${src400} 400w`} />
                          <img src={src400} alt={event.title} className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                        </picture>
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {(() => {
                        const badgeLabel = (event as any).badgeLabel ?? event.category;
                        return (
                          <Badge className={`${getCategoryColor(badgeLabel)} text-white border-0`}>
                            {getCategoryIcon(badgeLabel)}
                            <span className="ml-1">{badgeLabel}</span>
                          </Badge>
                        );
                      })()}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            <span className="font-medium">{isEs ? ({
                            'featured-1': '15-17 de agosto de 2025',
                            'featured-2': '22 de julio de 2025',
                            'featured-3': 'Cada viernes',
                            'featured-4': '5-7 de septiembre de 2025',
                            'featured-5': '10 de agosto de 2025',
                            'featured-6': 'Cada fin de semana',
                          } as Record<string, string>)[event.id] || event.date : event.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="space-y-4 flex-grow flex flex-col">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold h-14 line-clamp-2 transition-colors" style={{color: '#6efff8'}}>
                          {isEs ? ({
                          'featured-1': 'Festival RANDOBA 2025',
                          'featured-2': 'Taller Maestros Legendarios',
                          'featured-3': 'Colectivo Underground',
                          'featured-4': 'Bootcamp de Producción',
                          'featured-5': 'Experiencia Vinilo Revival',
                          'featured-6': 'Sesiones Rooftop al Atardecer',
                        } as Record<string, string>)[event.id] || event.title : event.title}
                        </h3>
                        <p className="text-sm leading-relaxed h-20 line-clamp-4" style={{color: '#6efff8', opacity: '0.8'}}>
                          {isEs ? ({
                          'featured-1': 'Nuestra mayor celebración anual con más de 50 DJs internacionales en 5 escenarios. Vive el festival definitivo de música electrónica.',
                          'featured-2': 'Masterclass exclusiva con DJs de renombre mundial. Aprende técnicas avanzadas y secretos de la industria de los mejores.',
                          'featured-3': 'Sesiones íntimas y underground con talentos emergentes y sonidos experimentales. Conecta con la escena.',
                          'featured-4': 'Bootcamp intensivo de 3 días: desde creación de beats hasta mezcla y masterización. Todo el equipo incluido.',
                          'featured-5': 'Descubre el arte del DJ con vinilo: discos raros y técnicas clásicas. Experiencia práctica con giradiscos profesionales.',
                          'featured-6': 'Actuaciones mágicas al atardecer con vistas espectaculares de la ciudad. Conecta con amantes de la música mientras disfrutas de grandes sets.',
                        } as Record<string, string>)[event.id] || event.description : event.description}
                        </p>
                      </div>

                      <div className="space-y-2 h-24 flex flex-col justify-between">
                        <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                          <Mic className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          <span className="text-sm">
                            {isEs ? 'con' : 'with'} {event.instructor}
                          </span>
                        </div>
                        <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                          <MapPin className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                          <Clock className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          <span className="text-sm">{event.duration}</span>
                        </div>
                        <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                          <Users className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          <span className="text-sm">
                            {isEs ? `${event.spotsLeft} plazas disponibles de ${event.totalSpots}` : `${event.spotsLeft} spots left of ${event.totalSpots}`}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t h-16 flex items-center" style={{borderColor: '#6efff8', opacity: '0.3'}}>
                        <div>
                          <Badge className="bg-transparent border font-semibold" style={{color: '#6efff8', borderColor: '#6efff8'}}>
                            {isEs ? (event.level === 'All Levels' ? 'Todos los niveles' : event.level === 'Advanced' ? 'Avanzado' : event.level === 'Intermediate' ? 'Intermedio' : event.level === 'Beginner' ? 'Principiante' : event.level) : event.level}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-transparent border-2 font-semibold transition-all duration-300 hover:bg-opacity-10 mt-auto"
                        style={{color: '#6efff8', borderColor: '#6efff8', backgroundColor: 'rgba(110, 255, 248, 0.1)'}}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(110, 255, 248, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(110, 255, 248, 0.1)';
                        }}
                        onClick={() => {
                          const calendarEvent: CalendarEvent = {
                            id: event.id,
                            title: event.title,
                            instructor: event.instructor,
                            date: new Date(
                              event.date.includes("Every")
                                ? Date.now() + 7 * 24 * 60 * 60 * 1000
                                : event.date,
                            ),
                            time: "19:00",
                            duration: event.duration,
                            location: event.location,
                            price: event.price,
                            spotsLeft: event.spotsLeft,
                            totalSpots: event.totalSpots,
                            level: event.level as
                              | "Beginner"
                              | "Intermediate"
                              | "Advanced",
                            category: event.category as
                              | "Workshop"
                              | "Masterclass"
                              | "Live Event"
                              | "Course",
                            description: event.description,
                            rating: event.rating,
                          };
                          handleBookEvent(calendarEvent);
                        }}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                        {isEs ? 'Reservar ahora' : 'Book Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Archive Section */}
      <section id="event-archive" className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6" style={{color: '#6efff8'}}>
              {isEs ? 'Archivo de eventos: La vibra que creamos' : 'Event Archive: The Vibe We Create'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {isEs ? 'Descubre nuestros momentos distintivos: conceptos cuidados, sonido impecable y carteles que convierten espacios en destinos. Siente la energía que creamos: serenidad al amanecer, brillo de la hora dorada e impulso nocturno. ¿Quieres ser parte? Únete al próximo evento.' : 'Discover our signature moments - crafted concepts, flawless sound, and lineups that turn venues into destinations. Get a feel for the energy we create: sunrise serenity, golden hour glow, and late-night momentum. Want to be part of it? Join us at the next event.'}
            </p>
          </div>

          {/* Modern Archive Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {/* Gallery Item 1 - Large Video */}
            <div className="md:col-span-2 lg:row-span-2 group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105 h-full" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-video lg:aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F582882b48aaa45478a46a2ceceb0b453?format=webp&width=1600" />
                    <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F582882b48aaa45478a46a2ceceb0b453?format=webp&width=800" />
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F582882b48aaa45478a46a2ceceb0b453?format=webp&width=400" alt="RANDOBA Festival Main Stage" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-[#6efff8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>


                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1">RANDOBA Festival 2024</h3>
                    <p className="text-sm text-gray-300">Main Stage Highlights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 2 - Sunset Session */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F63280d718e1e447b90ddc97d7c691364?format=webp&width=1200" />
                    <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F63280d718e1e447b90ddc97d7c691364?format=webp&width=800" />
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F63280d718e1e447b90ddc97d7c691364?format=webp&width=400" alt="Sunset Session" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white">{isEs ? 'Sesiones al atardecer' : 'Sunset Sessions'}</h4>
                    <p className="text-xs text-gray-300">{isEs ? 'Vibras en azotea' : 'Rooftop Vibes'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 3 - Club Night */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F990a0582d84d44c1ab2207ea16f11d88?format=webp&width=1200" />
                    <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F990a0582d84d44c1ab2207ea16f11d88?format=webp&width=800" />
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F990a0582d84d44c1ab2207ea16f11d88?format=webp&width=400" alt="Club Night" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white">{isEs ? 'Noches de club' : 'Club Nights'}</h4>
                    <p className="text-xs text-gray-300">{isEs ? 'Energía underground' : 'Underground Energy'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 4 - Sunrise Soul */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Fa3a5fe65a08a49dd889ede9dbd41376a?format=webp&width=1200" />
                    <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Fa3a5fe65a08a49dd889ede9dbd41376a?format=webp&width=800" />
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Fa3a5fe65a08a49dd889ede9dbd41376a?format=webp&width=400" alt="Sunrise Soul" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white">Sunrise Soul</h4>
                    <p className="text-xs text-gray-300">{isEs ? 'Serenidad en la playa' : 'Beach Serenity'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 5 - Beach Club */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=1200&fit=crop" />
                    <source media="(min-width:640px)" srcSet="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop" />
                    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop" alt="Beach Club Event" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white">{isEs ? 'Clubes de playa' : 'Beach Clubs'}</h4>
                    <p className="text-xs text-gray-300">{isEs ? 'Ritmos costeros' : 'Coastal Rhythms'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 6 - Villa Private */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-square relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=1200&fit=crop" />
                    <source media="(min-width:640px)" srcSet="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=800&fit=crop" />
                    <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop" alt="Villa Private Event" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-sm font-bold text-white">{isEs ? 'Sesiones en villa' : 'Villa Sessions'}</h4>
                    <p className="text-xs text-gray-300">{isEs ? 'Encuentros íntimos' : 'Intimate Gatherings'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Item 7 - Large Landscape Video */}
            <div className="md:col-span-2 group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-105" style={{borderColor: '#6efff8', boxShadow: '0 10px 25px -5px rgba(110, 255, 248, 0.2)'}}>
                <div className="aspect-video relative">
                  <picture>
                    <source media="(min-width:1024px)" srcSet="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=900&fit=crop" />
                    <source media="(min-width:640px)" srcSet="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop" />
                    <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=225&fit=crop" alt="RANDOBA Event Compilation" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-[#6efff8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Play button overlay for video */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#6efff8]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#6efff8]/50 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 ml-0.5" style={{color: '#6efff8'}} />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-bold text-white mb-1">{isEs ? 'Resumen RANDOBA 2024' : 'RANDOBA 2024 Recap'}</h3>
                    <p className="text-sm text-gray-300">{isEs ? 'Todos nuestros momentos distintivos' : 'All our signature moments'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-transparent border-2 font-semibold px-10 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
              style={{
                color: '#6efff8',
                borderColor: '#6efff8',
                boxShadow: '0 10px 15px -3px rgba(110, 255, 248, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(110, 255, 248, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => setContactOpen(true)}
            >
              <CalendarIcon className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
              {isEs ? 'Únete a nuestro próximo evento' : 'Join Our Next Event'}
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Contact Modal */}
      <Dialog open={contactOpen} onOpenChange={(open) => !open ? setContactOpen(false) : setContactOpen(true)}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-md" style={{backgroundColor: '#0b0b0b', borderColor: '#6efff8'}}>
          <DialogHeader>
            <DialogTitle style={{color: '#6efff8'}}>{isEs ? 'Únete a nuestro próximo evento' : 'Join Our Next Event'}</DialogTitle>
            <DialogDescription style={{color: '#6efff8', opacity: 0.8}}>
              {isEs ? 'Déjanos tus datos y te contactaremos.' : 'Leave your details and we’ll get back to you.'}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const resp = await fetch('/api/bitrix/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: contactForm.name,
                    email: contactForm.email,
                    phone: contactForm.phone,
                    subject: 'Events Page Contact',
                    message: contactForm.message || 'Please contact me about events.',
                    source: 'events-page-contact',
                  }),
                });
                if (!resp.ok) throw new Error('Request failed');
                setContactOpen(false);
                setContactForm({ name: '', email: '', phone: '', message: '' });
              } catch (err) {
                alert(isEs ? 'Envío fallido. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="contact-name" style={{color: '#6efff8'}}>{isEs ? 'Nombre' : 'Name'}</Label>
              <Input
                id="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="mt-1"
                style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                placeholder={isEs ? 'Tu nombre completo' : 'Your full name'}
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-email" style={{color: '#6efff8'}}>{isEs ? 'Email' : 'Email'}</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="mt-1"
                style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-phone" style={{color: '#6efff8'}}>{isEs ? 'Teléfono' : 'Phone Number'}</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="mt-1"
                style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                placeholder={isEs ? '+34 600 000 000' : '+34 600 000 000'}
              />
            </div>
            <div>
              <Label htmlFor="contact-message" style={{color: '#6efff8'}}>{isEs ? 'Mensaje' : 'Message'}</Label>
              <Textarea
                id="contact-message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="mt-1 resize-none"
                style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                placeholder={isEs ? 'Cuéntanos sobre el evento que te interesa' : 'Tell us about the event you’re interested in'}
              />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold"
              style={{backgroundColor: '#6efff8', color: '#000', borderColor: '#6efff8'}}
            >
              {isEs ? 'Enviar solicitud' : 'Send Request'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        item={
          selectedBookingEvent
            ? {
                id: selectedBookingEvent.id,
                title: selectedBookingEvent.title,
                instructor: selectedBookingEvent.instructor,
                date: selectedBookingEvent.date.toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                time: selectedBookingEvent.time,
                duration: selectedBookingEvent.duration,
                location: selectedBookingEvent.location,
                price: selectedBookingEvent.price,
                type: "event",
              }
            : null
        }
      />
    </div>
  );
}
