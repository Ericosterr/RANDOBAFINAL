import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedEqualizer } from "@/components/AnimatedEqualizer";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Music,
  Calendar,
  Users,
  PlayCircle,
  Star,
  Award,
  Headphones,
  Mic,
  Volume2,
  ArrowRight,
  CheckCircle,
  Clock,
  Trophy,
  Building2,
  Zap,
  Camera,
  Video,
  Download,
  Heart,
  MapPin,
  FileText,
  GraduationCap,
  Briefcase,
  Sparkles,
  Target,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  CreditCard,
  Mail,
  Phone,
  User,
  Ticket,
  Info,
  DollarSign,
} from "lucide-react";

export default function Index() {
  const { language } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [eventInfoModalOpen, setEventInfoModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({ name: "", email: "", phone: "", quantity: "1" });
  const [showIntro, setShowIntro] = useState(true);

  // Touch swipe support for events slider (mobile)
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchCurrentX.current == null) return;
    const delta = touchCurrentX.current - touchStartX.current;
    const threshold = 50; // px
    if (delta > threshold) {
      // swipe right -> previous
      setCurrentEventIndex((prev) => (prev > 0 ? prev - 1 : 3));
    } else if (delta < -threshold) {
      // swipe left -> next
      setCurrentEventIndex((prev) => (prev < 3 ? prev + 1 : 0));
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const [introAnimationPhase, setIntroAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setIntroAnimationPhase(2), 1500);
    const timer3 = setTimeout(() => setIntroAnimationPhase(3), 2500);
    const timer4 = setTimeout(() => setShowIntro(false), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  const featuresEn = [
    {
      icon: Headphones,
      title: "DJ School - Build Your Legend.",
      description:
        "Stop practicing for “someday” - start getting booked and become an in-demand artist. RANDOBA’s fast-track method turns raw skill into stage presence and paid gigs through one-to-one mentoring, pro studio sessions, and industry-backed showcase nights.",
    },
    {
      icon: Calendar,
      title: "Artist Agency - From Talent to Headliner.",
      description:
        "We design and scale careers end to end—brand, release strategy, partnerships, bookings. We move you from emerging to in-demand powered by hands-on mentorship from working artists and a robust network across the industry.",
    },
    {
      icon: Users,
      title: "Event Production - Premium, No Compromises.",
      description:
        "From private events to large-scale branded shows, we design moments that are memorable to guests and magnetic on social media. In-house music direction, premium sound, show calling. For private clients, for high-profile event managers, for clubs and venues.",
    },
    {
      icon: PlayCircle,
      title: "Technical Support - End-to-End, Risk-Free.",
      description:
        "Complete technical delivery at any scale - from pre-production to final cue: sound, lighting, staging, and on-site engineering. Advance planning, rider-accurate setups, built-in redundancy, and 24/7 support keep your show running flawlessly.",
    },
  ];

  const featuresEs = [
    {
      icon: Headphones,
      title: "Escuela de DJ - Construye tu leyenda.",
      description:
        "Deja de practicar para “algún día” y empieza a conseguir bookings para convertirte en un artista demandado. El método acelerado de RANDOBA transforma la técnica en presencia escénica y conciertos pagados mediante mentoría 1:1, sesiones en estudio profesional y showcases respaldados por la industria.",
    },
    {
      icon: Calendar,
      title: "Agencia de Artistas - De talento a cabeza de cartel.",
      description:
        "Diseñamos y escalamos carreras de principio a fin: marca, estrategia de lanzamientos, alianzas y bookings. Te llevamos de emergente a imprescindible con mentoría práctica de artistas en activo y una sólida red en toda la industria.",
    },
    {
      icon: Users,
      title: "Producción de Eventos - Premium, sin compromisos.",
      description:
        "Desde eventos privados hasta shows de marca a gran escala, diseñamos momentos memorables para el público y magnéticos en redes. Dirección musical propia, sonido premium y show calling. Para clientes privados, gestores de eventos y clubes/espacios.",
    },
    {
      icon: PlayCircle,
      title: "Soporte Técnico - De principio a fin, sin riesgos.",
      description:
        "Entrega técnica completa a cualquier escala: desde la preproducción hasta la última señal. Sonido, iluminación, staging e ingeniería on‑site. Planificación previa, riders exactos, redundancia y soporte 24/7 para un show impecable.",
    },
  ];

  const features = language === 'es' ? featuresEs : featuresEn;

  const stats = language === 'es'
    ? [
        { number: '500+', label: 'Estudiantes formados', icon: Users },
        { number: '50+', label: 'Eventos mensuales', icon: Calendar },
        { number: '15+', label: 'DJs expertos', icon: Award },
        { number: '98%', label: 'Tasa de éxito', icon: Trophy },
      ]
    : [
        { number: '500+', label: 'Students Trained', icon: Users },
        { number: '50+', label: 'Events Monthly', icon: Calendar },
        { number: '15+', label: 'Expert DJs', icon: Award },
        { number: '98%', label: 'Success Rate', icon: Trophy },
      ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Professional DJ",
      content:
        "RANDOBA transformed my mixing skills. The courses are incredibly detailed and practical.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Event Organizer",
      content:
        "The events are always top-notch. Perfect for networking and learning new techniques.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Music Producer",
      content:
        "The instructor quality is unmatched. I learned techniques I never found anywhere else.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Intro Animation */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Background particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Main animation content */}
          <div className="relative z-10 text-center">
            {/* Logo Animation */}
            <div className={`transition-all duration-1000 ${introAnimationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                RANDOBA
              </h1>
            </div>

            {/* Subtitle Animation */}
            <div className={`mt-8 transition-all duration-1000 delay-500 ${introAnimationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl md:text-3xl text-white font-light tracking-widest">
                {language === 'es' ? 'DONDE LA MÚSICA SE ENCUENTRA CON LA MAESTRÍA' : 'WHERE MUSIC MEETS MASTERY'}
              </p>
            </div>

            {/* Loading bar */}
            <div className={`mt-12 transition-all duration-1000 delay-1000 ${introAnimationPhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-[slideIn_1s_ease-out_forwards]"></div>
              </div>
              <p className="text-white/60 text-sm mt-4 tracking-wider">{language === 'es' ? 'CARGANDO EXPERIENCIA...' : 'LOADING EXPERIENCE...'}</p>
            </div>

            {/* Sound waves animation */}
            <div className={`mt-8 flex justify-center space-x-2 transition-all duration-1000 delay-1500 ${introAnimationPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 40}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/50"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-400/50"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-pink-400/50"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/50"></div>
        </div>
      )}

      {/* Main Content - only visible after intro */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-screen overflow-hidden bg-black -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2Fbecda4fd2e9546078cad8598fc155301?format=webp&width=1600" />
            <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2Fbecda4fd2e9546078cad8598fc155301?format=webp&width=800" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2Fbecda4fd2e9546078cad8598fc155301?format=webp&width=400" alt="DJ Performance" className="w-full h-full object-cover object-center opacity-60" loading="lazy" decoding="async" />
          </picture>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-32 min-h-[60vh] sm:min-h-screen flex items-start sm:items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center w-full">
            <div className="space-y-6 lg:space-y-8 text-white text-center lg:text-left">
              <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 inline-flex">
                <Mic className="w-3 h-3 mr-1" />
                {language === 'es' ? 'Formación Profesional de DJ' : 'Professional DJ Training'}
              </Badge>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight hero-title hero-title-glow">
                  RANDOBA
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 max-w-lg mx-auto lg:mx-0">
                  {language === 'es'
                    ? 'Un ecosistema donde los artistas crecen y los eventos que marcan titulares cobran vida. Una agencia de talentos de primer nivel con su propio plantel de DJs. La escuela de DJ n.º 1 en España: creando leyendas. Producción integral de eventos a cualquier escala: del concepto y la contratación al sonido, la iluminación y la escenografía.'
                    : 'An ecosystem where artists grow and headline-making events come to life. A premier talent agency with its own DJ roster. The No. 1 DJ school in Spain - creating legends. End-to-end event production at any scale - from concept and booking to sound, lighting, and staging.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="outline"
                  className="neon-outline-button font-semibold w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('randoba-universe')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {language === 'es' ? 'Elige tu formato' : 'Choose Your Format'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="neon-outline-button w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('randoba-events')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {language === 'es' ? 'Nuestros Eventos' : 'Our Events'}
                </Button>
              </div>

            </div>

            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <Volume2 className="w-8 h-8 text-white mb-2" />
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Escuela de DJ' : 'DJ School'}
                    </div>
                    <div className="text-xs text-gray-300">
                      {language === 'es' ? 'Donde nacen las leyendas' : 'Where Legends Begin'}
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <Headphones className="w-8 h-8 text-white mb-2" />
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Soporte Tecnico' : 'Technical support'}
                    </div>
                    <div className="text-xs text-gray-300">
                      {language === 'es' ? 'Fiabilidad de principio a fin' : 'End-to-end reliability'}
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <Users className="w-8 h-8 text-white mb-2" />
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Agencia de Talentos' : 'Talent Agency'}
                    </div>
                    <div className="text-xs text-gray-300">{language === 'es' ? 'Gestión centrada en el artista' : 'Artist-first management'}</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <Award className="w-8 h-8 text-white mb-2" />
                    <div className="text-sm font-medium text-white">
                      {language === 'es' ? 'Producción de Eventos' : 'Event Production'}
                    </div>
                    <div className="text-xs text-gray-300">
                      {language === 'es' ? 'Del concepto al impacto' : 'Concept to impact'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Equalizer positioned below the feature box */}
              <div className="relative mt-6 flex justify-center">
                <div className="flex items-end space-x-1 opacity-60">
                  <AnimatedEqualizer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="randoba-universe" className="py-20 bg-black relative">
        {/* Background DJ Image */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 hidden lg:block">
          <picture>
            <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F5162040532814e68be8c052691aa2f68?format=webp&width=1600" />
            <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F5162040532814e68be8c052691aa2f68?format=webp&width=800" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F5162040532814e68be8c052691aa2f68?format=webp&width=400" alt="DJ at work" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
          </picture>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              {language === 'es' ? 'El Universo RANDOBA' : 'The RANDOBA Universe'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {language === 'es'
                ? 'RANDOBA es más que una empresa: es un estudio y una agencia centrados en el artista. Impulsamos a la nueva generación de talento y producimos eventos que se convierten en momentos culturales. Creemos que los verdaderos artistas no siguen las reglas: las escriben. Nuestra misión es darte herramientas, conocimiento y oportunidades para que tu voz se escuche, del estudio al main stage, en España y más allá.'
                : 'RANDOBA is more than a company - it’s an artist-first studio and agency. We grow the next generation of talent and produce events that become cultural moments. We believe true artists don’t follow rules - they write them. Our mission is to give you the tools, knowledge, and opportunities so your voice is heard - from the studio to the main stage, across Spain and beyond.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-[#6efff8] transition-all duration-300 group shadow-xl hover:shadow-[#6efff8]/20 h-full flex flex-col"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#6efff8]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#6efff8] transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-[#6efff8] group-hover:text-black transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-[#6efff8] transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col">
                  <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-1">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4">
                    {index === 0 && (
                      <Button
                        variant="outline"
                        className="border-[#6efff8] text-[#6efff8] bg-transparent hover:bg-[#6efff8]/10 transition-colors duration-300"
                        asChild
                      >
                        <Link to="/courses">
                          {language === 'es' ? 'Elige tu curso' : 'Choose Your Course'}
                        </Link>
                      </Button>
                    )}
                    {index === 1 && (
                      <Button
                        variant="outline"
                        className="border-[#6efff8] text-[#6efff8] bg-transparent hover:bg-[#6efff8]/10 transition-colors duration-300"
                        asChild
                      >
                        <Link to="/agency">
                          {language === 'es' ? 'Únete al roster' : 'Join The Roster'}
                        </Link>
                      </Button>
                    )}
                    {index === 2 && (
                      <Button
                        variant="outline"
                        className="border-[#6efff8] text-[#6efff8] bg-transparent hover:bg-[#6efff8]/10 transition-colors duration-300"
                        asChild
                      >
                        <Link to="/events-production">
                          {language === 'es' ? 'Planifica tu evento' : 'Plan Your Event'}
                        </Link>
                      </Button>
                    )}
                    {index === 3 && (
                      <Button
                        variant="outline"
                        className="border-[#6efff8] text-[#6efff8] bg-transparent hover:bg-[#6efff8]/10 transition-colors duration-300"
                        asChild
                      >
                        <Link to="/support">
                          {language === 'es' ? 'Solicitar presupuesto técnico' : 'Get a Technical Quote'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Events Carousel Section */}
      <section id="randoba-events" className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {language === 'es' ? 'Nuestros Eventos: ' : 'Our Events: '}
              <span className="underline decoration-4 underline-offset-8">
                {language === 'es' ? 'El estándar RANDOBA' : 'The RANDOBA Standard'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {language === 'es' ? 'Club, rooftop, villa, festival, sesiones underground: escalables por diseño y perfectos en ejecución.' : 'Club, rooftop, villa, festival, underground sessions - scalable by design and seamless in delivery.'}
            </p>
          </div>

          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {[
                {
                  id: 1,
                  title: "Underground Sessions",
                  description:
                    "Intimate underground events featuring emerging and established DJs in unique venues.",
                  image:
                    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
                  date: "Every Friday",
                  location: "Various Locations",
                  time: "10:00 PM - 4:00 AM",
                  price: 25,
                  vipPrice: 50,
                  capacity: 200,
                  genre: "Deep House / Techno",
                  ageLimit: "21+",
                  fullDescription: "Experience the underground scene with carefully curated lineups featuring both emerging talent and established artists. Each session takes place in unique venues across the city, creating an intimate atmosphere where music lovers can connect with the raw energy of electronic music.",
                },
                {
                  id: 2,
                  title: "RANDOBA Festival",
                  description:
                    "Our flagship annual festival bringing together the best DJs from around the globe.",
                  image:
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
                  date: "Summer 2024",
                  location: "Main Arena",
                  time: "2:00 PM - 2:00 AM",
                  price: 150,
                  vipPrice: 300,
                  capacity: 10000,
                  genre: "Multi-Genre",
                  ageLimit: "18+",
                  fullDescription: "The biggest electronic music event of the year featuring 3 stages, 50+ international DJs, and 12 hours of non-stop music. From techno to house, trance to drum & bass, experience the full spectrum of electronic music culture.",
                },
                {
                  id: 3,
                  title: "Masterclass Workshops",
                  description:
                    "Exclusive workshops with industry legends sharing their secrets and techniques.",
                  image:
                    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
                  date: "Monthly",
                  location: "RANDOBA Studio",
                  time: "7:00 PM - 10:00 PM",
                  price: 75,
                  vipPrice: 125,
                  capacity: 50,
                  genre: "Educational",
                  ageLimit: "16+",
                  fullDescription: "Learn from industry legends in intimate workshop settings. Each session covers specific techniques, equipment mastery, and career insights. Limited to 50 participants for maximum interaction and personalized feedback.",
                },
                {
                  id: 4,
                  title: "Rooftop Sessions",
                  description:
                    "Sunset performances with breathtaking city views and curated musical journeys.",
                  image:
                    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
                  date: "Weekends",
                  location: "Sky Terrace",
                  time: "6:00 PM - 12:00 AM",
                  price: 40,
                  vipPrice: 80,
                  capacity: 300,
                  genre: "Melodic House / Progressive",
                  ageLimit: "21+",
                  fullDescription: "Watch the sunset while enjoying carefully curated sets from talented DJs. Our rooftop venue offers 360-degree city views, premium cocktails, and an unmatched atmosphere for music lovers seeking a sophisticated party experience.",
                },
              ].map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 sm:h-64 md:h-96 object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async"
                      />
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <Badge className="bg-white/20 text-white border-white/30">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </Badge>
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.date}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-6 text-white">
                      <h3 className="text-3xl font-bold">{event.title}</h3>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex space-x-4">
                        <Button
                          className="bg-white text-black hover:bg-gray-200"
                          onClick={() => {
                            setSelectedEvent(event);
                            setTicketModalOpen(true);
                          }}
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          {language === 'es' ? 'Reservar' : 'Book Now'}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-white text-black bg-white hover:bg-gray-100"
                          onClick={() => {
                            setSelectedEvent(event);
                            setEventInfoModalOpen(true);
                          }}
                        >
                          <Info className="w-4 h-4 mr-2" />
                          {language === 'es' ? 'Ver evento' : 'View Event'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentEventIndex((prev) => (prev > 0 ? prev - 1 : 3))
              }
              className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                setCurrentEventIndex((prev) => (prev < 3 ? prev + 1 : 0))
              }
              className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentEventIndex === index ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {language === 'es' ? 'Momentos de Nuestros Eventos.' : 'Moments from Our Events.'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the energy of our shows - watch the moments, get inspired, and let’s build yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-6 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-center">Aftermovies</h3>
              <div className="grid gap-4 grid-cols-1">
                {[
                  {
                    title: "Festival 2024 Highlights",
                    thumbnail:
                      "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F1e397e3a642e449cab965a6ecb1e3ecc?format=webp&width=800",
                    duration: "3:45",
                  },
                  {
                    title: "Underground Sessions Vol. 5",
                    thumbnail:
                      "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F1e397e3a642e449cab965a6ecb1e3ecc?format=webp&width=800",
                    duration: "2:30",
                  },
                ].map((video, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      <Video className="w-3 h-3 mr-1 inline" />
                      Video
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-center">Photography</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  {
                    title: "Neon Nights Collection",
                    image:
                      "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Ff1e758adcec9498d8574cbcd3c2c09db?format=webp&width=800",
                  },
                  {
                    title: "Behind the Decks",
                    image:
                      "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F69309b423fbc4b33a580fead9a1fabfc?format=webp&width=800",
                  },
                  {
                    title: "Crowd Energy",
                    image:
                      "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Fbe8bd489ba594a6fb624b43ba5f6406d?format=webp&width=800",
                  },
                ].map((photo, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      <Camera className="w-3 h-3 mr-1 inline" />
                      Photo
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {language === 'es' ? 'Acerca de ' : 'About '}
              <span className="underline decoration-4 underline-offset-8">
                RANDOBA
              </span>
              {language === 'es' ? ' - Artistas, Shows, Resultados' : ' - Artists, Shows, Results'}
            </h2>
          </div>

          {/* Philosophy and Mission */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-white">
                <h3 className="text-3xl font-bold">{language === 'es' ? 'Nuestra Filosofía y Misión' : 'Our Philosophy & Mission'}</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? "En RANDOBA creemos que la música es el lenguaje universal que conecta almas y trasciende fronteras. Nuestra misión es impulsar a la próxima generación de DJs y creadores mientras expandimos los límites de lo posible en la música electrónica."
                    : "At RANDOBA, we believe music is the universal language that connects souls and transcends boundaries. Our mission is to nurture the next generation of DJs and music creators while pushing the boundaries of what's possible in electronic music."}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? "Nos comprometemos a ofrecer formación de clase mundial, crear experiencias inolvidables y construir una comunidad donde la pasión se convierta en profesión. Cada beat, cada mezcla, cada momento se crea con propósito y precisión."
                    : "We're committed to providing world-class education, creating unforgettable experiences, and building a community where passion meets profession. Every beat, every mix, every moment is crafted with purpose and precision."}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? "La historia de RANDOBA comenzó con el encuentro de dos mundos: el genio creativo de Anton Bodnar y la visión estratégica de Anatoli. En esa sinergia nació la idea: no solo crear otro proyecto musical, sino un ecosistema completo donde el arte y el negocio no discuten, se potencian."
                    : "The story of RANDOBA began with the meeting of two worlds: the creative genius of Anton Bodnar and the strategic vision of Anatoli. It was in this synergy that the idea was born—not just to create another music project, but a complete ecosystem where art and business don't argue, but amplify one another."}
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop"
                  alt="RANDOBA Philosophy"
                  className="w-full h-48 sm:h-64 md:h-96 object-cover object-center rounded-2xl" loading="lazy" decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2Faf2ac072e444479186629229dd2ffa17?format=webp&width=800"
                  alt="Anton Bodnar - Founder"
                  className="w-full h-56 sm:h-72 md:h-96 object-cover object-center rounded-2xl" style={{ objectPosition: 'center -40px' }} loading="lazy" decoding="async"
                />
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-4">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Anton Bodnar</h4>
                    <p className="text-xs sm:text-sm text-gray-300">{language === 'es' ? 'Fundador y CEO' : 'Founder & CEO'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 text-white">
                <h3 className="text-3xl font-bold">Anton Bodnar</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'RANDOBA no es solo un proyecto musical: es energía viva nacida del impulso interior de Anton Bodnar por crear un espacio de profundidad, belleza y libertad. No se propuso construir una marca; se propuso construir un lugar donde habla el alma, donde todos se sienten reales, bienvenidos y vistos.'
                    : 'Randoba isn’t just a music project - it’s living energy born from Anton Bodnar’s inner drive to create a space of depth, beauty, and freedom. He didn’t set out to build a brand; he set out to build a place where the soul speaks - where everyone feels real, welcomed, and seen.'}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'Anton ha volcado su visión en RANDOBA: una fusión de arte, atención plena y presencia en vivo. Cada evento, cada viaje musical, cada detalle es intencional. RANDOBA no es un formato: es un ritual, una invitación a un mundo donde la música no es un fondo, sino un lenguaje vivo del alma.'
                    : 'Anton has poured his vision into Randoba: a fusion of art, mindfulness, and live presence. Every event, every musical journey, every detail is intentional. Randoba isn’t a format - it’s a ritual, an invitation into a world where music isn’t background but a living language of the soul.'}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'Anton Bodnar fundó RANDOBA con la visión de revolucionar la educación para DJs y la experiencia de los eventos. Con más de 15 años en la industria musical, Anton ha actuado en algunos de los festivales y salas más prestigiosos del mundo.'
                    : "Anton Bodnar founded RANDOBA with a vision to revolutionize DJ education and event experiences. With over 15 years in the music industry, Anton has performed at some of the world's most prestigious venues and festivals."}
                </p>
              </div>
            </div>
          </div>

          {/* Co-Founder Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-white">
                <h3 className="text-3xl font-bold">Anatoli Ille</h3>

                {/* Mobile: show image directly under the title */}
                <div className="block lg:hidden relative my-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2Ffa55753aae7441948ab0229a80569395?format=webp&width=800"
                    alt="Anatoli Ille - Co-Founder | The Catalyst"
                    className="w-full h-48 object-cover object-center rounded-2xl" style={{ objectPosition: 'center 10%' }} loading="lazy" decoding="async"
                  />
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2">
                      <h4 className="text-sm font-bold text-white">Anatoli Ille</h4>
                      <p className="text-xs text-gray-300">{language === 'es' ? 'Cofundador | El Catalizador' : 'Co-Founder | The Catalyst'}</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'Su función principal en RANDOBA es ser el arquitecto de la base que se transforma en una carrera de éxito: construir procesos de negocio, modelos financieros y alianzas estratégicas que permiten a los artistas centrarse en lo que más importa: su arte.'
                    : 'His primary role at RANDOBA is to be the architect of foundation to transform into a successful career: building the business processes, financial models, and strategic partnerships that allow artists to focus on what matters most - their art.'}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'Como «El Catalizador», Anatoli es la fuerza motriz que acelera cada proceso del ecosistema. Convierte ideas audaces en planes concretos, forja conexiones con actores clave de la industria y crea oportunidades donde otros ven obstáculos. Su energía y sus 15 años de experiencia en desarrollo de negocio impulsan a RANDOBA de forma constante.'
                    : 'As "The Catalyst," Anatoli is the driving force that accelerates every process within the ecosystem. He is the one who turns bold ideas into concrete plans, forges connections with key industry players, and creates opportunities where others see obstacles. His energy and 15 years of experience in business development constantly propel RANDOBA forward.'}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {language === 'es'
                    ? 'Cree que, construyendo una comunidad fuerte y profesional, RANDOBA puede convertirse en el núcleo que cambie el paisaje cultural de toda la región.'
                    : 'He believes that by building a strong and professional community, RANDOBA can become the nucleus that will change the cultural landscape of the entire region.'}
                </p>
              </div>

              <div className="relative hidden lg:block">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2Ffa55753aae7441948ab0229a80569395?format=webp&width=800"
                  alt="Anatoli Ille - Co-Founder | The Catalyst"
                  className="w-full h-48 sm:h-64 md:h-96 object-cover object-center rounded-2xl" style={{ objectPosition: 'center 10%' }} loading="lazy" decoding="async"
                />
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-4">
                    <h4 className="text-sm sm:text-xl font-bold text-white">Anatoli Ille</h4>
                    <p className="text-xs sm:text-sm text-gray-300">{language === 'es' ? 'Cofundador | El Catalizador' : 'Co-Founder | The Catalyst'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              {language === 'es' ? 'Nuestro equipo: Haciendo historia en RANDOBA' : 'Our Team: Making RANDOBA History'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  role: "Igor",
                  icon: Headphones,
                  description: language === 'es' ? 'Manager digital' : 'Digital Manager',
                  image:
                    "https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2F0a3c39bb0b1d47cfb946341af6e6e911?format=webp&width=800",
                },
                {
                  role: "Anna",
                  icon: Sparkles,
                  description: language === 'es' ? 'Responsable de eventos' : 'Event Manager',
                  image:
                    "https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2F6b7dcd8f4c914d5da180ab35f37c22ee?format=webp&width=800",
                },
                {
                  role: "Katya",
                  icon: Star,
                  description: language === 'es' ? 'Productora de artistas' : 'Artist Producer',
                  image:
                    "https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2Fd95446640ccd46d9bfde789725d6adf9?format=webp&width=800",
                },
                {
                  role: "Denis",
                  icon: Music,
                  description: language === 'es' ? 'Productor creativo' : 'Creative Producer',
                  image:
                    "https://cdn.builder.io/api/v1/image/assets%2F5815ec0e10314d90b6a9c0df6da32787%2Ff5945473ef494d319561f00f07805760?format=webp&width=800",
                },
              ].map((team, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-white/20 text-center p-4 sm:p-6"
                >
                  <CardHeader>
                    <div className="relative mx-auto mb-4 overflow-hidden rounded-2xl w-full max-w-xs flex items-center justify-center bg-black/10">
                      <img
                        src={team.image}
                        alt={team.role}
                        className="max-w-full max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-64 object-contain object-center p-2" loading="lazy" decoding="async"
                      />
                    </div>
                    <CardTitle className="text-white">{team.role}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {team.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RANDOBA Key Aspects Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {language === 'es' ? 'Por qué elegir ' : 'Why Choose '}
              <span className="underline decoration-4 underline-offset-8">RANDOBA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'es'
                ? 'RANDOBA es escuela, agencia, productora y equipo técnico en uno. Cubrimos el ciclo completo: formación, producción, estrategia, contratación, concepto, iluminación y sonido premium, y ejecución in situ. Ahorras tiempo y obtienes resultados consistentes, impulsados por nuestra red en la industria.'
                : 'RANDOBA is a school, agency, production house, and technical support team in one. We cover the full cycle - training, production, strategy, booking, concept, premium lighting & sound, and on-site delivery. You save time and get consistent results, powered by our industry network.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <Card className="h-full bg-white border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">
                    {language === 'es' ? 'Crecimiento profesional' : 'Career Growth'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {language === 'es'
                      ? 'Convertimos el potencial en demanda: branding, lanzamientos, alianzas y contrataciones, con mentoría de artistas en activo y una red sólida de salas.'
                      : 'We turn potential into demand - branding, releases, partnerships, and bookings, backed by mentorship from working artists and a strong venue network.'}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full bg-white border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">{language === 'es' ? 'Producción sin caos' : 'Production Without Chaos.'}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {language === 'es'
                      ? 'Un solo socio se encarga del concepto, el talento, los cronogramas, la logística y la regiduría: sin perseguir proveedores ni perder plazos.'
                      : 'One partner handles concept, talent, timelines, logistics, and show calling - no vendor chasing and no missed deadlines.'}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full bg-white border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">{language === 'es' ? 'De principiante a cabeza de cartel' : 'From Newcomer to Headliner.'}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {language === 'es'
                      ? 'Una ruta de crecimiento clara: de los primeros sets a actuaciones seguras y cabezas de cartel. Una comunidad fuerte acelera tu carrera, define tu estilo y reputación y genera un flujo constante de shows.'
                      : 'A clear growth path - from first sets to confident performances and headline slots. A strong community accelerates your career, shaping your style, reputation, and a steady pipeline of shows.'}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="h-full bg-white border-gray-200 hover:border-black transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">
                    {language === 'es' ? 'Fiabilidad técnica 24/7' : '24/7 Technical Reliability'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {language === 'es'
                      ? 'Montajes fieles al rider, redundancia en sistemas críticos y soporte 24/7 mantienen sonido e iluminación consistentes en cualquier sala.'
                      : 'Rider-accurate setups, redundancy on critical systems, and round-the-clock support keep sound and lighting consistent at any venue.'}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Course Detail Modal */}
      <Dialog
        open={!!selectedCourse}
        onOpenChange={() => setSelectedCourse(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCourse.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedCourse.banner}
                  alt={selectedCourse.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold">Duration</div>
                    <div className="text-gray-600">
                      {selectedCourse.duration}
                    </div>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold">Level</div>
                    <div className="text-gray-600">{selectedCourse.level}</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold">Price</div>
                    <div className="text-gray-600">{selectedCourse.price}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-3">Course Description</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCourse.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-3">Instructors</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCourse.teachers.map((teacher, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <div>
                          <h5 className="font-semibold">{teacher.name}</h5>
                          <p className="text-sm text-gray-600">{teacher.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Enroll Now - {selectedCourse.price}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Syllabus
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Ticket Booking Modal */}
      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center">
                  <Ticket className="w-6 h-6 mr-2" />
                  {language === 'es' ? 'Reservar - ' : 'Book Tickets - '}{selectedEvent.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-gray-500" />
                      <span>{selectedEvent.genre}</span>
                    </div>
                  </div>
                </div>


                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-bold text-lg">{language === 'es' ? 'Información de contacto' : 'Contact Information'}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === 'es' ? 'Nombre completo' : 'Full Name'}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder={language === 'es' ? 'Introduce tu nombre completo' : 'Enter your full name'}
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === 'es' ? 'Correo electrónico' : 'Email'}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder={language === 'es' ? 'Introduce tu correo electrónico' : 'Enter your email'}
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === 'es' ? 'Teléfono' : 'Phone'}</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder={language === 'es' ? 'Introduce tu número de teléfono' : 'Enter your phone number'}
                          value={ticketForm.phone}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{language === 'es' ? 'Cantidad' : 'Quantity'}</label>
                      <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" value={ticketForm.quantity} onChange={(e) => setTicketForm(prev => ({ ...prev, quantity: e.target.value }))}>
                        <option value="1">{language === 'es' ? '1 Entrada' : '1 Ticket'}</option>
                        <option value="2">{language === 'es' ? '2 Entradas' : '2 Tickets'}</option>
                        <option value="3">{language === 'es' ? '3 Entradas' : '3 Tickets'}</option>
                        <option value="4">{language === 'es' ? '4 Entradas' : '4 Tickets'}</option>
                        <option value="5">{language === 'es' ? '5+ Entradas' : '5+ Tickets'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setTicketModalOpen(false)}
                  >
                    {language === 'es' ? 'Cancelar' : 'Cancel'}
                  </Button>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800" onClick={async () => {
                    if (!ticketForm.name || !ticketForm.email) return alert(language === 'es' ? 'Por favor, introduce nombre y correo electrónico' : 'Please fill in name and email');
                    try {
                      const subject = `${language === 'es' ? 'Reserva de evento' : 'Event Booking'}: ${selectedEvent.title}`;
                      const message = `Event: ${selectedEvent.title}\nDate: ${selectedEvent.date}\nTime: ${selectedEvent.time}\nLocation: ${selectedEvent.location}\nTickets: ${ticketForm.quantity}`;
                      const resp = await fetch('/api/bitrix/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: ticketForm.name,
                          email: ticketForm.email,
                          phone: ticketForm.phone,
                          subject,
                          message,
                          source: 'index-event-book',
                        }),
                      });
                      if (!resp.ok) throw new Error('Request failed');
                      setTicketModalOpen(false);
                      setTicketForm({ name: '', email: '', phone: '', quantity: '1' });
                      alert(language === 'es' ? '¡Gracias! Tu solicitud de reserva ha sido enviada.' : 'Thank you! Your booking request was sent.');
                    } catch (err) {
                      alert(language === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
                    }
                  }}>
                    <Mail className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Contáctanos' : 'Contact Us'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Info Modal */}
      <Dialog open={eventInfoModalOpen} onOpenChange={setEventInfoModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center">
                  <Info className="w-6 h-6 mr-2" />
                  {selectedEvent.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">{language === 'es' ? 'Detalles del evento' : 'Event Details'}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Fecha' : 'Date'}</div>
                          <div className="text-gray-600">{selectedEvent.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Hora' : 'Time'}</div>
                          <div className="text-gray-600">{selectedEvent.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Ubicación' : 'Location'}</div>
                          <div className="text-gray-600">{selectedEvent.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Music className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{language === 'es' ? 'G��nero' : 'Genre'}</div>
                          <div className="text-gray-600">{selectedEvent.genre}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Aforo' : 'Capacity'}</div>
                          <div className="text-gray-600">{selectedEvent.capacity} {language === 'es' ? 'personas' : 'people'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">{language === 'es' ? 'Información de entradas' : 'Ticket Information'}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Entrada general' : 'General Admission'}</div>
                          <div className="text-sm text-gray-600">{language === 'es' ? 'Acceso estándar' : 'Standard entry'}</div>
                        </div>
                        <div className="text-xl font-bold">${selectedEvent.price}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{language === 'es' ? 'Acceso VIP' : 'VIP Access'}</div>
                          <div className="text-sm text-gray-600">{language === 'es' ? 'Experiencia premium' : 'Premium experience'}</div>
                        </div>
                        <div className="text-xl font-bold">${selectedEvent.vipPrice}</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {language === 'es' ? 'Edad mínima' : 'Age Requirement'}: {selectedEvent.ageLimit}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">{language === 'es' ? 'Sobre este evento' : 'About This Event'}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEventInfoModalOpen(false)}
                  >
                    {language === 'es' ? 'Cerrar' : 'Close'}
                  </Button>
                  <Button
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                    onClick={() => {
                      setEventInfoModalOpen(false);
                      setTicketModalOpen(true);
                    }}
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Reservar' : 'Book Now'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* History Of Success Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">{language === 'es' ? 'Historias de Éxito' : 'History Of Success'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(language === 'es' ? [
              {
                name: 'Sabina',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2Fa6d805adf5f547509e7d704848fe2116?format=webp&width=800',
                subtitle: '«La música es energía que puedes oír»',
                description: 'En solo dos meses de formación empezó a ganar dinero y recuperó el coste del curso.',
              },
              {
                name: 'Stella',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F986423600aec4c2d9befe2d5adf75cc6?format=webp&width=800',
                subtitle: '«De alumna a estrella de grandes festivales»',
                description: 'Tech house vibrante y contagioso con toques de R&B, funk y sabor latino clásico.',
              },
              {
                name: 'Alyona',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F8d6ec2445411449dbb4257a03fbb8a04?format=webp&width=800',
                subtitle: '«De cero al escenario»',
                description: 'En un solo curso pasó de principiante absoluto a su primer set en Burning Man.',
              },
              {
                name: 'Nico',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F103611153fdf4999b143abd2843fbc64?format=webp&width=800',
                subtitle: '«Anton fue mi profesor; la pista es mi destino»',
                description: 'En un solo curso pasó de cero a su primer booking y nuevas invitaciones a tocar.',
              },
            ] : [
              {
                name: 'Sabina',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2Fa6d805adf5f547509e7d704848fe2116?format=webp&width=800',
                subtitle: '«Music is energy you can hear»',
                description: 'Within only two months of training, she began earning and had already covered the full cost of the course',
              },
              {
                name: 'Stella',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F986423600aec4c2d9befe2d5adf75cc6?format=webp&width=800',
                subtitle: '«From student to star of major festivals»',
                description: 'Vibrant, infectious tech house laced with R&B, funk, and classic Latin flair.',
              },
              {
                name: 'Alyona',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F8d6ec2445411449dbb4257a03fbb8a04?format=webp&width=800',
                subtitle: '«From zero to the stage»',
                description: 'Within just one course of training, she went from absolute beginner to performing her first set at Burning Man.',
              },
              {
                name: 'Nico',
                image:
                  'https://cdn.builder.io/api/v1/image/assets%2F123e836024694f37b99e45c5590fc826%2F103611153fdf4999b143abd2843fbc64?format=webp&width=800',
                subtitle: '«Anton was my teacher; the dancefloor is my destiny»',
                description: 'Within a single course, he moved from absolute beginner to his first booked set and ongoing invitations to perform.',
              },
            ]).map((person, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-center p-4 sm:p-6">
                <CardHeader>
                  <div className="relative mx-auto mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                    />
                  </div>
                  <CardTitle className="text-white text-lg sm:text-xl md:text-2xl">{person.name}</CardTitle>
                  {person.subtitle && (
                    <p className="text-sm text-gray-300 italic mt-1 line-clamp-2 sm:line-clamp-3">{person.subtitle}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {person.description && (
                    <CardDescription className="text-gray-300 line-clamp-3 sm:line-clamp-4">{person.description}</CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative">
        {/* Background DJ Turntables Image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F0621012368ea4f3387f4daba7a12b868?format=webp&width=800"
            alt="DJ Turntables"
            className="w-full h-full object-cover object-center" loading="lazy" decoding="async"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-black">
              {language === 'es' ? 'Únete al mundo RANDOBA' : 'Join the World of RANDOBA'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'es' ? 'Pasa de la práctica a los shows pagados con formación profesional, mentoría y escenarios de presentación. Consigue producción del concepto al escenario, sonido premium y una ejecución fluida que eleva tu marca.' : 'Go from practice to paid gigs with pro training, mentorship, showcase stages. Get concept-to-stage production, premium sound, and seamless delivery that elevates your brand.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 font-semibold"
              >
                {language === 'es' ? 'Únete al roster' : 'Join the Roster'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black/10"
              >
                {language === 'es' ? 'Elige tu curso' : 'Choose Your Course'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black/10"
              >
                {language === 'es' ? 'Reserva un evento' : 'Book an Event'}
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* RANDOBA Partners Section */}
      <section className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">
            {language === 'es' ? 'Socios de RANDOBA' : 'RANDOBA Partners'}
          </h2>

          {/* Partners Image Slider */}
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-left py-8 items-center">
              <div className="flex space-x-4 animate-slide-left whitespace-nowrap">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7f9a29b7714547379d73b434f940a7b4?format=webp&width=800"
                  alt="Partner 1"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fa6144fb5a2ee4822a13cd624340bf8e0?format=webp&width=800"
                  alt="Partner 2"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fc84da5b3eaab4e73b0864b68d683b73a?format=webp&width=800"
                  alt="Partner 3"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F4d1b11aab88641c6ac37707bd74b92ad?format=webp&width=800"
                  alt="Partner 4"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7293bbc86b134b09b7d6eb8298033c33?format=webp&width=800"
                  alt="Partner 5"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                {/* Duplicate set for seamless loop */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7f9a29b7714547379d73b434f940a7b4?format=webp&width=800"
                  alt="Partner 1"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fa6144fb5a2ee4822a13cd624340bf8e0?format=webp&width=800"
                  alt="Partner 2"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fc84da5b3eaab4e73b0864b68d683b73a?format=webp&width=800"
                  alt="Partner 3"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F4d1b11aab88641c6ac37707bd74b92ad?format=webp&width=800"
                  alt="Partner 4"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7293bbc86b134b09b7d6eb8298033c33?format=webp&width=800"
                  alt="Partner 5"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                {/* Third set for extra smoothness */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7f9a29b7714547379d73b434f940a7b4?format=webp&width=800"
                  alt="Partner 1"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fa6144fb5a2ee4822a13cd624340bf8e0?format=webp&width=800"
                  alt="Partner 2"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2Fc84da5b3eaab4e73b0864b68d683b73a?format=webp&width=800"
                  alt="Partner 3"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F4d1b11aab88641c6ac37707bd74b92ad?format=webp&width=800"
                  alt="Partner 4"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F69f8f568ccb845f5af204d0200760ccd%2F7293bbc86b134b09b7d6eb8298033c33?format=webp&width=800"
                  alt="Partner 5"
                  className="h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
