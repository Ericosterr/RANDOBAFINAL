import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../contexts/AuthContext";
import { ArtistBookingModal } from "../components/ArtistBookingModal";
import { JoinRosterModal } from "../components/JoinRosterModal";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Users,
  Star,
  Music,
  Award,
  PlayCircle,
  CheckCircle,
  Send,
  Globe,
  TrendingUp,
  Heart,
  Zap,
  Target,
  ArrowRight,
  Instagram,
  Radio,
  ExternalLink,
  Calendar as CalendarIcon,
} from "lucide-react";


export default function Agency() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    artistName: "",
    phone: "",
    message: "",
  });

  // CRM Integration State for Bitrix24
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [artistsPage, setArtistsPage] = useState(1);
  const [totalArtists, setTotalArtists] = useState(50);

  // Utility function for Bitrix24 API integration
  // This would connect to your Bitrix24 CRM to fetch artist data
  const fetchArtistsFromCRM = async (page = 1, limit = 12) => {
    try {
      setIsLoadingArtists(true);
      return artists;
    } catch (error) {
      console.error('Error fetching artists from Bitrix24:', error);
      return [];
    } finally {
      setIsLoadingArtists(false);
    }
  };

  const [artistBookingModalOpen, setArtistBookingModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [joinRosterModalOpen, setJoinRosterModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = isEs
      ? `Solicitud de colaboración con la agencia: ${formData.artistName || formData.name}`
      : `Agency Partnership Request: ${formData.artistName || formData.name}`;
    const message = [
      formData.artistName ? (isEs ? `Artista/DJ: ${formData.artistName}` : `Artist/DJ: ${formData.artistName}`) : null,
      isEs ? `Teléfono: ${formData.phone}` : `Phone: ${formData.phone}`,
      formData.message ? (isEs ? `Sobre mí: ${formData.message}` : `About: ${formData.message}`) : null,
    ].filter(Boolean).join("\n");

    try {
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject,
          message,
          source: 'agency-form',
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }
      alert(isEs ? '¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto pronto.' : 'Thanks! Your request was sent. We\'ll be in touch shortly.');
      setFormData({ name: '', email: '', artistName: '', phone: '', message: '' });
    } catch (err) {
      alert(isEs ? 'El envío ha fallado. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
    }
  };

  // Artist data structure optimized for CRM integration (Bitrix24)
  const artists = [
    {
      id: "ARTIST_001",
      name: "Anton",
      realName: "RANDOBA Artist",
      genre: "Progressive House",
      followers: "2.5M",
      image: "https://cdn.builder.io/api/v1/image/assets%2F90761fbd00f24b528f497ee2aafc7fdd%2F475004e663c240d48570463ea2cbb2ad?format=webp&width=800",
      description: "Chart-topping progressive house sensation with residencies at world's top clubs.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration"
      ],
      status: "active",
      tier: "premium",
      bookingRate: 15000,
      availability: "worldwide",
      languages: ["EN", "ES", "DE"],
      specialties: ["Festivals", "Clubs", "Private Events"],
      lastUpdated: "2024-01-15T10:30:00Z",
      social: {
        instagram: "@dj_aurora",
        tiktok: "@djaurora",
        youtube: "DJAuroraOfficial",
      },
    },
    {
      id: 2,
      name: "Katia Gartner",
      realName: "RANDOBA Artist",
      genre: "Bass / Dubstep",
      followers: "1.8M",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2Feb60eb5deda04b57b81d4297df569909?format=webp&width=800",
      description:
        "Underground bass legend pushing boundaries with innovative sound design.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration",
      ],
      social: {
        instagram: "@bassphantom",
        tiktok: "@bassphantom_",
        youtube: "BassPhantomMusic",
      },
    },
    {
      id: 3,
      name: "Salim",
      realName: "RANDOBA Artist",
      genre: "Synthwave / Retrowave",
      followers: "3.2M",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2F4ef8fcec3c0a41ffb7267e38382bf122?format=webp&width=800",
      description:
        "Retro-futuristic pioneer bringing 80s nostalgia to modern dance floors.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration",
      ],
      social: {
        instagram: "@neondreams",
        tiktok: "@neondreamsmusic",
        youtube: "NeonDreamsOfficial",
      },
    },
    {
      id: 4,
      name: "Kansha",
      realName: "RANDOBA Artist",
      genre: "Techno / Minimal",
      followers: "1.5M",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      description:
        "Berlin-based techno virtuoso crafting hypnotic journeys through sound.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration",
      ],
      social: {
        instagram: "@technosage",
        tiktok: "@techno_sage",
        youtube: "TechnoSageOfficial",
      },
    },
    {
      id: 5,
      name: "Loo",
      realName: "RANDOBA Artist",
      genre: "Future Bass",
      followers: "2.1M",
      image:
        "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&h=400&fit=crop",
      description:
        "Melodic future bass artist creating emotional landscapes through music.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration",
      ],
      social: {
        instagram: "@luna_bass",
        tiktok: "@lunabassmusic",
        youtube: "LunaBassOfficial",
      },
    },
    {
      id: "ARTIST_006",
      name: "Cyber Pulse",
      realName: "RANDOBA Artist",
      genre: "Cyberpunk / Industrial",
      followers: "900K",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      description: "Cyberpunk visionary merging industrial beats with futuristic aesthetics.",
      achievements: [
        "Monstercat Artist",
        "Electric Forest",
        "OWSLA Collaboration"
      ],
      status: "active",
      tier: "emerging",
      bookingRate: 8000,
      availability: "worldwide",
      languages: ["EN", "KR", "JP"],
      specialties: ["Tech Events", "Gaming Conventions", "Virtual Reality"],
      lastUpdated: "2024-01-15T10:30:00Z",
      social: {
        instagram: "@cyberpulse",
        tiktok: "@cyber_pulse",
        youtube: "CyberPulseMusic",
      },
    },
  ];

  const cooperationTerms = [
    {
      title: "Your Art is Our Priority",
      description:
        "We create conditions that help artists grow, expand their reach, and achieve career goals faster.",
      icon: TrendingUp,
    },
    {
      title: "Open Partnership",
      description:
        "Clear terms and honest agreements so you always know where you stand.",
      icon: Globe,
    },
    {
      title: "Creative Collaborations",
      description:
        "Work with top musicians and labels to create unique content and unforgettable performances.",
      icon: Heart,
    },
    {
      title: "Your Music, Your Vision",
      description:
        "You keep full control over your musical style while we handle the organization and promotion.",
      icon: Target,
    },
    {
      title: "Personal Career Strategy",
      description:
        "A tailored strategy focused on your unique goals, guiding your professional and creative development to the next level.",
      icon: Zap,
    },
    {
      title: "Reliable Support",
      description:
        "We're with you at every step - from negotiations to stepping on stage.",
      icon: Award,
    },
  ];

  const terms = isEs ? [
    { title: 'Tu arte es nuestra prioridad', description: 'Creamos condiciones que ayudan a los artistas a crecer, ampliar su alcance y alcanzar objetivos de carrera más rápido.', icon: TrendingUp },
    { title: 'Alianza transparente', description: 'Términos claros y acuerdos honestos para que siempre sepas dónde estás.', icon: Globe },
    { title: 'Colaboraciones creativas', description: 'Trabaja con músicos y sellos top para crear contenido único y actuaciones inolvidables.', icon: Heart },
    { title: 'Tu música, tu visión', description: 'Mantienes el control total de tu estilo musical mientras nosotros nos encargamos de la organización y la promoción.', icon: Target },
    { title: 'Estrategia de carrera personal', description: 'Una estrategia a medida enfocada en tus metas, para llevar tu desarrollo profesional y creativo al siguiente nivel.', icon: Zap },
    { title: 'Soporte fiable', description: 'Estamos contigo en cada paso: desde la negociación hasta el escenario.', icon: Award },
  ] : cooperationTerms;

  const handleBookArtist = (artist: any) => {
    setSelectedArtist(artist);
    setArtistBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[100vh] overflow-hidden bg-black -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F04a79369a30d4d69bd5ac30aac5e71b7%2F7084a2b22444446fac728e208308d1a5?format=webp&width=800"
            alt="Agency Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
        </div>

        {/* Floating Elements - Responsive design */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-4 sm:top-20 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-32 right-8 sm:top-40 sm:right-20 w-4 h-4 sm:w-6 sm:h-6 bg-purple-500 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute bottom-32 left-8 sm:bottom-40 sm:left-20 w-6 h-6 sm:w-8 sm:h-8 bg-pink-400 rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-48 right-16 sm:top-60 sm:right-40 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8 sm:py-12 lg:py-16 min-h-[100vh] flex items-center z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8 text-white text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1">
                    <Users className="w-3 h-3 mr-1" />
                    {isEs ? 'Representación de artistas de élite' : 'Elite Artist Representation'}
                  </Badge>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span style={{color: '#6efff8'}}>
                      RANDOBA
                    </span>
                    <br />
                    <span className="text-white">{isEs ? 'Agencia de artistas' : 'Artist Agency'}</span>
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-200 max-w-full lg:max-w-lg leading-relaxed">
                    {isEs
                      ? 'Tu talento es impecable: ahora toca convertirlo en una marca poderosa. Llevamos a los DJs más allá de sus escenarios y cachés habituales, con estrategia, escenarios, contactos en la industria, gestión artística integral y soporte 24/7. Abrimos puertas a festivales, clubs y eventos premium. Tú haces la música: nosotros creamos las oportunidades que hacen crecer tu carrera.'
                      : `Your talent is flawless - now it's time to turn it into a powerful brand. We take DJs beyond their usual stages and fees, giving them strategy, stages, industry connections, full-scale artist management, and 24/7 support. We open the doors to festivals, clubs, and premium events. You make the music - we create the opportunities that grow your career.`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start max-w-md sm:max-w-none mx-auto lg:mx-0">
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-3 rounded-xl min-w-[160px]"
                    onClick={() => setJoinRosterModalOpen(true)}
                  >
                    <PlayCircle className="w-5 h-5 mr-2 text-[#6efff8]" />
                    {isEs ? 'Únete a nuestro roster' : 'Join Our Roster'}
                  </Button>
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-3 rounded-xl min-w-[160px]"
                    onClick={() => {
                      const artistSection =
                        document.getElementById("artist-roster");
                      if (artistSection) {
                        artistSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <Music className="w-5 h-5 mr-2 text-[#6efff8]" />
                    {isEs ? 'Ver artistas' : 'View Artists'}
                  </Button>
                </div>

              </div>

              <div className="relative mt-8 lg:mt-0">
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl transform rotate-0 lg:rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl"></div>
                  <div className="relative space-y-4 sm:space-y-6">
                    <div className="flex flex-col items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white text-center">
                        {isEs ? 'Puntos destacados de la agencia' : 'Agency Highlights'}
                      </h3>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {(isEs ? [
                        { label: "Escenarios sin fronteras", value: "100%" },
                        { label: "Red sólida de eventos", value: "1200+" },
                        { label: "Crecimiento en bookings y streaming", value: "400%" },
                        { label: "Gestión artística", value: "360°" },
                      ] : [
                        { label: "Stages without borders", value: "100%" },
                        { label: "Strong event network", value: "1200+" },
                        { label: "Booking & Streaming growth", value: "400%" },
                        { label: "Artist management", value: "360°" },
                      ]).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                        >
                          <span className="text-gray-300 text-sm sm:text-base italic">{item.label}</span>
                          <span className="text-cyan-400 font-bold text-sm sm:text-base">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Philosophy Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-48 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute top-64 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              {isEs ? 'Nuestra ' : 'Our '}
              <span className="animated-gradient-text">
                {isEs ? 'Filosofía: un apoyo fiable en cada etapa de tu crecimiento' : 'Philosophy: A Reliable Support At Every Stage Of Your Growth'}
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
              {isEs ? 'Deja de ser solo un buen DJ: es momento de convertirte en un artista en demanda. En una industria altamente competitiva, te damos ventaja: estrategia, contactos y apoyo mediático.' : `Stop being just a good DJ - it's time to become an in-demand artist. In a highly competitive industry, we give you an advantage: strategy, connections, and media support.`}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col items-center sm:items-start space-y-3 group p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2Faadd3c8d2f31484fb1f624962dd66f0c?format=webp&width=800"
                        alt="Artist Development"
                        className="w-7 h-7 sm:w-8 sm:h-8"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                        {isEs ? 'Desarrollo de artistas' : 'Artist Development'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {isEs ? 'Desde tus primeras pistas originales hasta una imagen única: te ayudamos a destacar y asegurar tu lugar en la cima. Construimos un camino personalizado hacia los escenarios con los que sueñas.' : 'From your first original tracks to a unique image - we help you stand out and secure your spot at the top. We build a personalized path to the stages you dream of.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start space-y-3 group p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2Fe80c856a67ad45788b01aec93868a714?format=webp&width=800"
                        alt="Access to New Stages"
                        className="w-7 h-7 sm:w-8 sm:h-8"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                        {isEs ? 'Acceso a nuevos escenarios' : 'Access to New Stages'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {isEs ? 'Te conectamos con festivales prestigiosos, clubs y eventos premium a los que miles de DJs aspiran a tocar.' : 'We connect you with prestigious festivals, clubs, and premium events that thousands of DJs aspire to play.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start space-y-3 group p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2F4a851ddfd58f4c4ea59a8e11024d6316?format=webp&width=800"
                        alt="Ongoing Growth"
                        className="w-7 h-7 sm:w-8 sm:h-8"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                        {isEs ? 'Crecimiento continuo' : 'Ongoing Growth'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {isEs ? 'Tu foco es la música. El nuestro: tu progreso, nuevos contratos y cachés al alza.' : 'Your focus is the music. Our focus is your progress, new contracts, and growing performance fees.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2F211f4a8dec6f4182b2e10e941543c2df?format=webp&width=800"
                alt="Creating Legends"
                className="relative w-full h-80 sm:h-96 lg:h-[30rem] object-cover rounded-2xl sm:rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 object-top"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl sm:rounded-3xl"></div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                <h4 className="text-base sm:text-lg font-bold">{isEs ? 'Creando leyendas' : 'Creating Legends'}</h4>
                <p className="text-xs sm:text-sm opacity-90">{isEs ? 'Donde la música se encuentra con el destino' : 'Where music meets destiny'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Roster Section */}
      <section
        id="artist-roster"
        className="py-12 sm:py-16 lg:py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight" style={{color: '#6efff8'}}>
              {isEs ? 'Nuestro roster de élite' : 'Our Elite Roster'}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
              {isEs ? 'Conoce a los artistas extraordinarios que definen el futuro de la música electrónica.' : 'Meet the extraordinary artists who define the future of electronic music.'}
            </p>
          </div>

          {/* Artist Grid - Mobile-first responsive design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {artists.filter(a => a.name !== "Kansha" && a.name !== "Cyber Pulse" && a.name !== "Loo").map((artist, index) => (
              <Card
                key={artist.id}
                className="flex flex-col h-full bg-black/90 backdrop-blur-xl border-white/10 overflow-hidden group hover:bg-black/95 hover:border-cyan-400/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Mobile-optimized Image Section */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={
                      artist.name === "Anton"
                        ? { objectPosition: "center 25%" }
                        : artist.name === "Salim"
                        ? { objectPosition: "center 30%" }
                        : artist.name === "Katia Gartner"
                        ? { objectPosition: "center 30%" }
                        : {}
                    }
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  {/* Artist Name Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate mb-1">
                      {artist.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 truncate">
                      {artist.realName}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-4 space-y-3 flex flex-col flex-grow">
                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {artist.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {isEs ? 'Logros clave' : 'Key Achievements'}
                    </h4>
                    <div className="space-y-1">
                      {artist.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-white text-xs leading-relaxed">
                            {achievement}
                          </span>
                        </div>
                      ))}
                      {artist.achievements.length > 2 && (
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-white text-xs">
                            {isEs ? 'Colaboración con OWSLA' : 'OWSLA Collaboration'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>


                  {/* Social Links and Buttons */}
                  <div className="pt-3 border-t border-white/10 mt-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 w-full flex-wrap">
                      {/* Social Media Icons */}
                      <div className="flex items-center space-x-4 sm:space-x-5 mb-3 sm:mb-0 flex-shrink-0">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Fec00151df3194966b462fbb12448bf4f%2F5ca0a42c46124628b1d48a4f0da90f66?format=webp&width=800"
                          alt="Instagram"
                          className="w-5 h-5 sm:w-5 sm:h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity filter hover:contrast-125"
                        />
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Fa744b605d0de4a0ab741e131768e825e%2Ff928e4d1deb341a8a27db30b57838c46?format=webp&width=800"
                          alt="Spotify"
                          className="w-5 h-5 sm:w-5 sm:h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity filter hover:contrast-125"
                        />
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Fa744b605d0de4a0ab741e131768e825e%2Fee6950fe321a4ea6978bb01136411d83?format=webp&width=800"
                          alt="SoundCloud"
                          className="w-5 h-5 sm:w-5 sm:h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity filter hover:contrast-125"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <div className="flex-1 sm:flex-none">
                          <Button
                            size="sm"
                            onClick={() => handleBookArtist(artist)}
                            className="w-full sm:w-auto bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
                          >
                            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#6efff8]" />
                            {isEs ? 'Reservar' : 'Book'}
                          </Button>
                        </div>
                        <div className="flex-1 sm:flex-none">
                          <Button
                            size="sm"
                            onClick={() => {
                              if (artist.name === "Katia Gartner") {
                              window.open("https://drive.google.com/file/d/16kFHUj3BLSFZECDN5hl4eLapwy7XOY_U/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                              return;
                            }
                              if (artist.name === "Salim") {
                                window.open("https://drive.google.com/file/d/1usUPrMw3dkFwc1kRjrD9Yjb9IyPzB_F_/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                                return;
                              }
                              if (artist.name === "Anton") {
                                window.open("https://cdn.builder.io/o/assets%2Fb9844da1d95f40cf905cdcd1d9ba83c8%2F274426cdf8c44238a56652fef8aac7fb?alt=media&token=5e84dfc2-3dfd-41da-bd29-070b58b75a28&apiKey=b9844da1d95f40cf905cdcd1d9ba83c8", "_blank", "noopener,noreferrer");
                                return;
                              }
                              const partnershipSection = document.querySelector('form');
                              if (partnershipSection) {
                                partnershipSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            } }
                            className="w-full sm:w-auto bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
                          >
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#6efff8]" />
                            {isEs ? 'Unirse' : 'Join'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* Terms of Cooperation Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full"></div>
          <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-radial from-purple-500/10 to-transparent rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full"></div>
        </div>

        {/* Geometric patterns - Mobile optimized */}
        <div className="absolute inset-0 opacity-10 hidden sm:block">
          <div className="absolute top-32 left-16 w-8 h-8 border border-cyan-400 rotate-45"></div>
          <div className="absolute top-48 right-24 w-6 h-6 border border-purple-400 rotate-12"></div>
          <div className="absolute bottom-32 left-32 w-10 h-10 border border-pink-400 rotate-45"></div>
          <div className="absolute bottom-48 right-16 w-4 h-4 border border-yellow-400 rotate-12"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              <span style={{color: '#6ef'}}>
                {isEs ? 'RANDOBA - Una alianza que impulsa tu carrera' : 'RANDOBA - Partnership That Drives Your Career'}
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
              {isEs ? 'La alianza con RANDOBA no es un trámite: es tu plataforma de lanzamiento. Convertimos tus ambiciones en resultados reales, abriendo puertas a un mundo donde tu crecimiento es inevitable.' : `Partnership with RANDOBA isn't just a formality - it's your personal career launchpad. We turn your ambitions into real results, opening doors to a world where your growth is inevitable.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {terms.map((term, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-black/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                    <term.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl text-white">
                    {term.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {term.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 px-2 sm:px-4 lg:px-0 leading-tight" style={{color: '#6efff8'}}>
                {isEs ? 'No solo reservamos shows: creamos leyendas.' : `We Don't Just Book Gigs - We Create Legends.`}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
                {isEs ? 'Tu éxito es nuestra misión. Así transformamos DJs con talento en referentes de la industria con desarrollo estratégico de carrera y oportunidades premium.' : `Your success is our mission. Here's how we transform talented DJs into industry icons with strategic career development and premium opportunities.`}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-cyan-400 mb-3">
                    {isEs ? '¿Te cuesta entrar en escenarios más grandes?' : 'Struggling to break into bigger stages?'}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {isEs ? 'Te conectamos con clubs, festivales y eventos premium donde actúan artistas de primer nivel.' : `We connect you to prestigious clubs, festivals, and premium events where top-tier artists perform.`}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-cyan-400 mb-3">
                    {isEs ? '¿Tus temas no reciben atención?' : "Your tracks aren't getting noticed?"}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {isEs ? 'Convertimos tu estilo en una marca potente y lo impulsamos en redes para que te vean y te escuchen.' : `We turn your style into a powerful brand and promote it across social media so you're seen and heard.`}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-cyan-400 mb-3">
                    {isEs ? '¿Sin bolos estables ni ingresos?' : 'No stable gigs or income?'}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {isEs ? 'Nos ocupamos del booking, la estrategia y la gestión integral para que tu música traiga reconocimiento y beneficios.' : `We take care of booking, strategy, and full-scale artist management so your music brings both recognition and profit.`}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partnership Request Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 p-4 sm:p-6 text-white text-center relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-800/95"></div>
                <div className="relative">
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 leading-tight">
                    {isEs ? 'Únete a la familia RANDOBA' : 'Join the RANDOBA Family'}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl opacity-90">
                    {isEs ? '¿Buscas escenarios más grandes, mejores cachés y mayor reconocimiento? Solicita ahora y recibe tu plan personalizado de crecimiento.' : 'Looking for bigger stages, higher fees, and greater recognition? Apply now and receive your custom career growth plan.'}
                  </p>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6 bg-gray-900/50">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Nombre completo *' : 'Full Name *'}
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 h-11"
                        placeholder={isEs ? 'Tu nombre completo' : 'Your full name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Correo electrónico *' : 'Email Address *'}
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 h-11"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Nombre artístico/DJ *' : 'Artist/DJ Name *'}
                      </label>
                      <Input
                        required
                        value={formData.artistName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            artistName: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 h-11"
                        placeholder={isEs ? 'Tu nombre artístico' : 'Your artist name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Teléfono *' : 'Phone Number *'}
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 h-11"
                        placeholder={isEs ? '+34 (663) 353 486' : '+34 (663) 353 486'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      {isEs ? 'Cuéntanos sobre ti *' : 'Tell Us About Yourself *'}
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50 resize-none"
                      placeholder={isEs ? 'Comparte tu historia, logros, objetivos y por qué te gustaría trabajar con RANDOBA...' : `Share your story, achievements, goals, and why you'd like to work with RANDOBA...`}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-[#6efff8] text-black hover:bg-[#6efff8]/90 font-semibold px-10 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-[#6efff8]/25 rounded-xl text-base max-w-xs sm:max-w-none mx-auto"
                    >
                      <Send className="w-5 h-5 mr-2 text-black" />
                      {isEs ? 'Enviar solicitud' : 'Submit Request'}
                      <ArrowRight className="w-5 h-5 ml-2 text-black" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Artist Booking Modal */}
      <ArtistBookingModal
        isOpen={artistBookingModalOpen}
        onClose={() => setArtistBookingModalOpen(false)}
        artist={selectedArtist}
      />

      {/* Join Roster Modal */}
      <JoinRosterModal
        isOpen={joinRosterModalOpen}
        onClose={() => setJoinRosterModalOpen(false)}
      />
    </div>
  );
}
