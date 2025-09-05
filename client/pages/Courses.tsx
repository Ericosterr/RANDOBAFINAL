import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ModernEqualizer } from "@/components/ModernEqualizer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../contexts/AuthContext";
import { BookingModal } from "../components/BookingModal";
import { useLanguage } from "../contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import {
  Users,
  ArrowRight,
  GraduationCap,
  Award,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Send,
  Phone,
  MessageSquare,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  whoItsFor: string;
  whatYoullLearn: string[];
  outcome: string;
  price: number;
  currency: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Mixing" | "Production" | "Business" | "Equipment" | "Performance";
  image: string;
  displayLevel?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
}

interface Graduate {
  id: string;
  name: string;
  title: string;
  achievement: string;
  quote: string;
  image: string;
  tags: string[];
  gradientColors: {
    from: string;
    via: string;
    to: string;
  };
  borderColor: string;
  tagColor: string;
  icon: string;
}

export default function Courses() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [detailsCourse, setDetailsCourse] = useState<Course | null>(null);
  const [languageSelectCourse, setLanguageSelectCourse] = useState<Course | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const openMultipleUrls = (urls: string[]) => {
    urls.forEach((url) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  // Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Contact Form Handlers
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, source: 'courses' }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }

      setSubmitMessage(isEs ? '¡Gracias por tu mensaje! Te responderemos en 24 horas.' : "Thank you for your message! We'll get back to you within 24 hours.");
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage(isEs ? 'Algo salió mal. Inténtalo de nuevo.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const courses: Course[] = [
    {
      id: "1",
      title: "DJ Culture Immersion",
      whoItsFor: "Absolute beginners and anyone stepping behind the decks for the first time.",
      whatYoullLearn: [
        "Gear essentials",
        "Tempo & rhythm",
        "Basic mixing/beatmatching",
        "Set structure",
        "dancefloor psychology - with plenty of hands-on practice on real equipment."
      ],
      outcome: "Your first promo mix, confident command of core techniques, and readiness for your first gig.",
      price: 299,
      currency: "USD",
      level: "Beginner",
      displayLevel: "BASIC",
      category: "Mixing",
      image: "https://cdn.builder.io/api/v1/image/assets%2Fa832971d2ffa4a0db09dc1e13a1ba972%2Fe507f0a59065467ea23eeb2c97ae0cb5?format=webp&width=800",
      imageFit: "cover",
      imagePosition: "center bottom",
    },
    {
      id: "2",
      title: "Artist on Stage",
      whoItsFor: "Gigging DJs ready to level up on stage.",
      whatYoullLearn: [
        "Advanced mixing and creative FX",
        "Phrasing and energy flow",
        "Crowd reading",
        "Developing a signature sound and set identity"
      ],
      outcome: "A RANDOBA showcase performance and a polished press kit you can pitch to venues and festivals.",
      price: 599,
      currency: "USD",
      level: "Advanced",
      displayLevel: "PRO",
      category: "Performance",
      image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F0f88636ffdc04f14b276904dec77e56b?format=webp&width=800",
    },
    {
      id: "3",
      title: "Music Production",
      whoItsFor: "DJs and musicians ready to write original tracks.",
      whatYoullLearn: [
        "Ableton Live workflow",
        "Sound design and sampling",
        "Drum programming",
        "Arrangement arcs",
        "Mixdown",
        "Mastering basics—plus finishing habits that get tracks done."
      ],
      outcome: "A release-ready original track and a clear roadmap for your next releases.",
      price: 449,
      currency: "USD",
      level: "Intermediate",
      displayLevel: "CREATOR",
      category: "Production",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    },
    {
      id: "4",
      title: "BEGINNER: Kids DJ Course",
      whoItsFor: "Children aged 8–14 - from first-timers to budding performers.",
      whatYoullLearn: [
        "Gear basics: controllers, headphones; vinyl intro",
        "BPM, structure, beatmatching",
        "Effects & EQ for clean transitions",
        "Playlists and Rekordbox",
        "Reading the crowd; themed mini-sets",
        "Personal feedback (≤5 per group)"
      ],
      outcome: "Confident command of the decks and software, your own rehearsed set, live performance experience, and a course completion certificate.",
      price: 299,
      currency: "USD",
      level: "Beginner",
      category: "Performance",
      image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F2314485c49924d1885fe91e421d847be?format=webp&width=800",
    }
  ];

  // Spanish translations for course fields
  const esCourseMap: Record<string, Partial<Course>> = {
    '1': {
      title: 'Inmersión en la cultura DJ',
      whoItsFor: 'Principiantes absolutos y cualquiera que se ponga por primera vez tras los platos.',
      whatYoullLearn: [
        'Elementos esenciales del equipo',
        'Tempo y ritmo',
        'Mezcla básica/beatmatching',
        'Estructura del set',
        'Psicología de la pista: mucha práctica con equipo real'
      ],
      outcome: 'Tu primer mix promocional, dominio de las técnicas básicas y preparación para tu primer show.',
      displayLevel: 'BÁSICO'
    },
    '2': {
      title: 'Artista en el escenario',
      whoItsFor: 'DJs activos listos para subir de nivel en el escenario.',
      whatYoullLearn: [
        'Mezcla avanzada y FX creativos',
        'Fraseo y flujo de energía',
        'Lectura de público',
        'Desarrollo de un sonido propio e identidad de set'
      ],
      outcome: 'Showcase RANDOBA y press kit pulido para proponer a salas y festivales.'
    },
    '3': {
      title: 'Producción musical',
      whoItsFor: 'DJs y músicos listos para escribir temas originales.',
      whatYoullLearn: [
        'Flujo de trabajo en Ableton Live',
        'Diseño de sonido y muestreo',
        'Programación de baterías',
        'Arco de arreglos',
        'Mezcla',
        'Mastering básico y hábitos para acabar temas'
      ],
      outcome: 'Un tema original listo para lanzar y un plan claro para tus próximos lanzamientos.',
      displayLevel: 'CREADOR'
    },
    '4': {
      title: 'INICIACIÓN: Curso de DJ para niños',
      whoItsFor: 'Niños de 8 a 14 años: desde primeros pasos hasta pequeños intérpretes.',
      whatYoullLearn: [
        'Equipo básico: controladoras, cascos; introducción al vinilo',
        'BPM, estructura, beatmatching',
        'Efectos y EQ para transiciones limpias',
        'Playlists y Rekordbox',
        'Lectura del público; mini‑sets temáticos',
        'Feedback personal (≤5 por grupo)'
      ],
      outcome: 'Dominio del equipo y software, tu propio set ensayado, experiencia en vivo y certificado de finalización.'
    }
  };

  const graduates: Graduate[] = [
    { id: "1", name: "Sasha", title: "Melodic", achievement: "", quote: "", image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Ff0ffc895ea7344b39b18a30b80ed0b9e?format=webp&width=400", tags: [], gradientColors: { from: "green-600/30", via: "emerald-600/20", to: "green-700/30" }, borderColor: "green-400", tagColor: "green", icon: "🎵" },
    { id: "2", name: "SharaLopez", title: "Afro house", achievement: "", quote: "", image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F818247d25f894b70bac3b73cd87ae1c7?format=webp&width=400", tags: [], gradientColors: { from: "blue-600/30", via: "cyan-600/20", to: "blue-700/30" }, borderColor: "blue-400", tagColor: "blue", icon: "📻" },
    { id: "3", name: "Kansha", title: "Afro House", achievement: "", quote: "", image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F85234732f01c4dbba14944c1b8006238?format=webp&width=400", tags: [], gradientColors: { from: "purple-600/30", via: "pink-600/20", to: "purple-700/30" }, borderColor: "purple-400", tagColor: "purple", icon: "🎤" },
    { id: "4", name: "Nico", title: "Afro House", achievement: "", quote: "", image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Ff43f693acfa54011b78eba3857d1e65b?format=webp&width=400", tags: [], gradientColors: { from: "orange-600/30", via: "red-600/20", to: "pink-700/30" }, borderColor: "orange-400", tagColor: "orange", icon: "🎪" }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-300 border-green-400/50 backdrop-blur-sm";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/50 backdrop-blur-sm";
      case "Advanced":
        return "bg-red-500/20 text-red-300 border-red-400/50 backdrop-blur-sm";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50 backdrop-blur-sm";
    }
  };

  const tLevel = (value: string) => {
    if (!isEs) return value;
    const map: Record<string, string> = { 'Beginner': 'Principiante', 'Intermediate': 'Intermedio', 'Advanced': 'Avanzado', 'BASIC': 'BÁSICO', 'CREATOR': 'CREADOR', 'PRO': 'PRO' };
    return map[value] || value;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[60vh] overflow-hidden bg-black -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width:1024px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F04a79369a30d4d69bd5ac30aac5e71b7%2Fae1b6f21497a432c9114d09caf330e17?format=webp&width=1600" />
            <source media="(min-width:640px)" srcSet="https://cdn.builder.io/api/v1/image/assets%2F04a79369a30d4d69bd5ac30aac5e71b7%2Fae1b6f21497a432c9114d09caf330e17?format=webp&width=800" />
            <img src="https://cdn.builder.io/api/v1/image/assets%2F04a79369a30d4d69bd5ac30aac5e71b7%2Fae1b6f21497a432c9114d09caf330e17?format=webp&width=400" alt="DJ Course Background" className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
          </picture>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 min-h-[60vh] flex items-center z-10">
          <div className="text-center w-full">
            <div className="space-y-8 text-white">
              <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 mx-auto backdrop-blur-sm">
                <GraduationCap className="w-3 h-3 mr-1" />
                {isEs ? 'Formación profesional de DJ' : 'Professional DJ Education'}
              </Badge>

              <div className="space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight drop-shadow-lg max-w-4xl mx-auto">
                  <span className="block animated-gradient-text relative">
                    {isEs ? 'Escuela de DJ RANDOBA' : 'RANDOBA DJ School'}
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#6efff8] via-[#4fd1c7] to-[#6efff8] rounded-full opacity-60"></div>
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md px-4">
                  {isEs
                    ? 'Nuestra escuela es tu catalizador de transformación: el camino de la técnica a la expresión propia, una mentalidad nueva y una firma creativa única. Con el método de Anton Bodnar y mentoría práctica, los principiantes pasan de sus primeras mezclas a sus primeros shows, y los DJs en activo afilan un sonido propio, fortalecen su marca y consiguen mejores bookings y lanzamientos.'
                    : "Our school is your catalyst for transformation. Your path from skills to self-expression. Your new mindset and your unique creative signature. With Anton Bodnar's method and hands-on mentoring, beginners move from first mixes to first gigs, while working DJs sharpen an unique sound, build a stronger brand, and land bigger bookings and releases."}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6efff8] via-[#4fd1c7] to-[#6efff8] bg-clip-text text-transparent max-w-2xl mx-auto drop-shadow-lg px-4 mt-6">
                  {isEs ? 'Aplica a RANDOBA: convierte tus habilidades de DJ en una carrera artística.' : 'Apply to RANDOBA - turn your DJ skills into an artist career.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 w-auto px-8"
                  onClick={() => {
                    document.getElementById('course-packages-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <PlayCircle className="w-5 h-5 mr-2 text-[#6efff8]" />
                  {isEs ? 'Ver cursos' : 'Browse Courses'}
                </Button>
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 w-auto px-8"
                  onClick={() => {
                    document.getElementById('mentors-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Users className="w-5 h-5 mr-2 text-[#6efff8]" />
                  {isEs ? 'Conoce a los instructores' : 'Meet Instructors'}
                </Button>
              </div>

              {/* Modern Equalizer */}
              <div className="flex justify-center mt-8 opacity-60">
                <ModernEqualizer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Content Section */}
      <section id="course-packages-section" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-4" style={{color: '#6efff8'}}>
              {isEs ? 'Rutas de aprendizaje para cada ' : 'Learning Paths for Every '}
              <span className="underline decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8" style={{textDecorationColor: '#6efff8'}}>
                {isEs ? 'nivel y objetivo' : 'Level & Goal'}
              </span>
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto px-4" style={{color: '#6efff8', opacity: '0.8'}}>
              {isEs ? 'Elige tu camino: START pone cómodos a los principiantes en la cabina y dentro de la cultura DJ; PRO ayuda a los DJs en activo a afilar un sonido propio y subir el nivel en vivo; CREATOR te lleva a producir temas originales. Nuestros mentores y comunidad convierten tu talento y práctica en resultados reales: actuaciones, cabezas de cartel y una marca artística reconocible.' : 'Choose your path - START gets beginners comfortable on the decks and inside DJ culture, PRO helps working DJs sharpen a signature sound and raise their game live, CREATOR takes you into producing original tracks. Our mentors and community help turn your talent and practice into real results: successful performances, headline slots, and a standout artist brand.'}
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course) => {
              const es = esCourseMap[course.id];
              const title = isEs && es?.title ? es.title : course.title;
              const who = isEs && es?.whoItsFor ? es.whoItsFor! : course.whoItsFor;
              const learn = (isEs && es?.whatYoullLearn ? es.whatYoullLearn! : course.whatYoullLearn);
              const outc = isEs && es?.outcome ? es.outcome! : course.outcome;
              const badge = tLevel((course.displayLevel ?? course.level));
              return (
                <Card
                  key={course.id}
                  className="bg-gradient-to-br from-slate-800/90 via-gray-800/70 to-slate-900/90 border-gray-700 transition-all duration-500 group shadow-2xl overflow-hidden backdrop-blur-sm hover:scale-105 flex flex-col h-full"
                  style={{borderColor: '#6efff8', boxShadow: '0 25px 50px -12px rgba(110, 255, 248, 0.2)'}}
                >
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

                      const src400 = buildUrl(course.image, 400);
                      const src800 = buildUrl(course.image, 800);
                      const src1600 = buildUrl(course.image, 1600);
                      const srcSetAll = `${src1600} 1600w, ${src800} 800w, ${src400} 400w`;
                      const className = `w-full ${course.imageFit === 'contain' ? 'h-40 sm:h-56 object-contain bg-black/40' : 'h-40 sm:h-48 md:h-56 object-cover object-center'} group-hover:scale-105 transition-transform duration-300`;

                      return (
                        <picture>
                          <source media="(min-width:1024px)" srcSet={srcSetAll} />
                          <source media="(min-width:640px)" srcSet={`${src800} 800w, ${src400} 400w`} />
                          <img src={src400} alt={title} className={className} style={{ objectPosition: course.imagePosition ?? 'center' }} loading="lazy" decoding="async" />
                        </picture>
                      );
                    })()}
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelColor(course.level)}>
                        {badge}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="space-y-3">
                    <CardTitle className="text-xl transition-colors" style={{color: '#6efff8'}}>
                      {title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow">
                    <div className="space-y-3 flex-grow">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center" style={{color: '#6efff8'}}>
                          <Users className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          {isEs ? 'Para quién es' : "Who it's for"}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{color: '#6efff8', opacity: '0.8'}}>
                          {who}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center" style={{color: '#6efff8'}}>
                          <GraduationCap className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          {isEs ? 'Lo que aprenderás' : "What you'll learn"}
                        </h4>
                        <ul className="text-sm space-y-1" style={{color: '#6efff8', opacity: '0.8'}}>
                          {learn.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#6efff8'}}></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center" style={{color: '#6efff8'}}>
                          <Award className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                          {isEs ? 'Resultado' : 'Outcome'}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{color: '#6efff8', opacity: '0.8'}}>
                          {outc}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6 pt-4">
                      <Button
                        size="sm"
                        className="group font-semibold px-4 py-2 rounded-md shadow-md transition-all duration-300 border text-sm hover:bg-[#6efff8]/10 hover:border-[#6efff8] hover:shadow-lg hover:shadow-[#6efff8]/20 hover:-translate-y-0.5"
                        style={{ backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8', boxShadow: '0 6px 10px -3px rgba(110, 255, 248, 0.25)' }}
                        onClick={() => { setSelectedCourse(course); setBookingModalOpen(true); }}
                      >
                        {isEs ? 'Inscribirme' : 'Enroll Now'}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" style={{color: '#6efff8'}} />
                      </Button>
                      <Button
                        size="sm"
                        className="group font-semibold px-4 py-2 rounded-md shadow-md transition-all duration-300 border text-sm hover:bg-[#6efff8]/10 hover:border-[#6efff8] hover:shadow-lg hover:shadow-[#6efff8]/20 hover:-translate-y-0.5"
                        style={{ backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8', boxShadow: '0 6px 10px -3px rgba(110, 255, 248, 0.25)' }}
                        onClick={() => setLanguageSelectCourse(course)}
                      >
                        {isEs ? 'Ver más' : 'Learn More'}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" style={{color: '#6efff8'}} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Language Selection Dialog for Learn More */}
          <Dialog open={!!languageSelectCourse} onOpenChange={(open) => { if (!open) setLanguageSelectCourse(null); }}>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-sm" style={{backgroundColor: '#0b0b0b', borderColor: '#6efff8'}}>
              <DialogHeader>
                <DialogTitle style={{color: '#6efff8'}}>{isEs ? 'Elige tu idioma' : 'Choose your language'}</DialogTitle>
                <DialogDescription style={{color: '#6efff8', opacity: 0.8}}>
                  {isEs ? 'Consulta los detalles del curso en tu idioma preferido.' : 'View course details in your preferred language.'}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button
                  className="font-semibold px-6 py-2 rounded-lg border"
                  style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}}
                  onClick={() => {
                    if (languageSelectCourse && languageSelectCourse.title === "DJ Culture Immersion") {
                      window.open("https://drive.google.com/file/d/1Hwd235NnXY7Y3tRrKLVu2ehguFDimryQ/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "Artist on Stage") {
                      window.open("https://drive.google.com/file/d/1PC6Zu1QmN11X3IvqIFiK7S4FDIwekNus/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "Music Production") {
                      window.open("https://drive.google.com/file/d/1oFHDVBXcR9_QKlRu_QN0Ca1klRGyMB7Z/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "BEGINNER: Kids DJ Course") {
                      openMultipleUrls([
                        "https://drive.google.com/file/d/10A3M3lwP-Sd79dn3awMRIjWuzQnXmCPu/view?usp=drivesdk",
                        "https://drive.google.com/file/d/10eREFnfgM3doPmrnfGtUMGYd9Ylnezhu/view?usp=drivesdk",
                        "https://drive.google.com/file/d/10xO3BOCRA97-KOXoHzakGtGEvzLmo1ZQ/view?usp=drivesdk",
                      ]);
                      setLanguageSelectCourse(null);
                      return;
                    }
                    setSelectedLanguage('en');
                    if (languageSelectCourse) setDetailsCourse(languageSelectCourse);
                    setLanguageSelectCourse(null);
                  }}
                >
                  {isEs ? 'Inglés' : 'English'}
                </Button>
                <Button
                  className="font-semibold px-6 py-2 rounded-lg border"
                  style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}}
                  onClick={() => {
                    if (languageSelectCourse && languageSelectCourse.title === "DJ Culture Immersion") {
                      window.open("https://drive.google.com/file/d/1udNWPIaAbnH5AOzSqKKacQEGWbkNN93B/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "Artist on Stage") {
                      window.open("https://drive.google.com/file/d/1uq61RSOJleMUx7-OXOX1qkzgoRnh3Wz_/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "Music Production") {
                      window.open("https://drive.google.com/file/d/1EJwjKX9I4gaXDzNCxT-32sGXhn2oNlgo/view?usp=drivesdk", "_blank", "noopener,noreferrer");
                      setLanguageSelectCourse(null);
                      return;
                    } else if (languageSelectCourse && languageSelectCourse.title === "BEGINNER: Kids DJ Course") {
                      openMultipleUrls([
                        "https://drive.google.com/file/d/1a6IXO9Wvzff0KlRzVpfujJf3cqUX85qH/view?usp=drivesdk",
                        "https://drive.google.com/file/d/1OXRUhz4S5dYgvXQuxWCwwGiRPh9-SESP/view?usp=drivesdk",
                        "https://drive.google.com/file/d/17hY5XTLTKkUrEU4sBwCDuRreCAi52w-U/view?usp=drivesdk",
                      ]);
                      setLanguageSelectCourse(null);
                      return;
                    }
                    setSelectedLanguage('es');
                    if (languageSelectCourse) setDetailsCourse(languageSelectCourse);
                    setLanguageSelectCourse(null);
                  }}
                >
                  {isEs ? 'Español' : 'Spanish'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Course Details Dialog */}
          <Dialog open={!!detailsCourse} onOpenChange={(open) => { if (!open) setDetailsCourse(null); }}>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-lg" style={{backgroundColor: '#0b0b0b', borderColor: '#6efff8'}}>
              <DialogHeader>
                <DialogTitle style={{color: '#6efff8'}}>{(isEs && detailsCourse && esCourseMap[detailsCourse.id]?.title) ? esCourseMap[detailsCourse.id]!.title! : detailsCourse?.title}</DialogTitle>
                <DialogDescription style={{color: '#6efff8', opacity: 0.8}}>
                  {isEs ? 'Idioma' : 'Language'}: {selectedLanguage === 'en' ? (isEs ? 'Inglés' : 'English') : (isEs ? 'Español' : 'Spanish')}
                </DialogDescription>
              </DialogHeader>
              {detailsCourse && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{color: '#6efff8'}}>{isEs ? 'Para quién es' : "Who it's for"}</h4>
                    <p className="text-sm" style={{color: '#6efff8', opacity: 0.8}}>{selectedLanguage === 'es' && esCourseMap[detailsCourse.id]?.whoItsFor ? esCourseMap[detailsCourse.id]!.whoItsFor! : detailsCourse.whoItsFor}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{color: '#6efff8'}}>{isEs ? 'Lo que aprenderás' : "What you'll learn"}</h4>
                    <ul className="text-sm space-y-1" style={{color: '#6efff8', opacity: 0.8}}>
                      {(selectedLanguage === 'es' && esCourseMap[detailsCourse.id]?.whatYoullLearn ? esCourseMap[detailsCourse.id]!.whatYoullLearn! : detailsCourse.whatYoullLearn).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#6efff8'}}></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{color: '#6efff8'}}>{isEs ? 'Resultado' : 'Outcome'}</h4>
                    <p className="text-sm" style={{color: '#6efff8', opacity: 0.8}}>{selectedLanguage === 'es' && esCourseMap[detailsCourse.id]?.outcome ? esCourseMap[detailsCourse.id]!.outcome! : detailsCourse.outcome}</p>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button className="font-semibold px-6 py-2 rounded-lg border" style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}} onClick={() => setDetailsCourse(null)}>
                      {isEs ? 'Cerrar' : 'Close'}
                    </Button>
                    <Button className="font-semibold px-6 py-2 rounded-lg border" style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}} onClick={() => { setSelectedCourse(detailsCourse); setBookingModalOpen(true); setDetailsCourse(null); }}>
                      {isEs ? 'Inscribirme' : 'Enroll Now'}
                      <ArrowRight className="w-4 h-4 ml-2" style={{color: '#6efff8'}} />
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Start Here / Level Up Section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[50vh] lg:min-h-[70vh] relative overflow-hidden">
              {/* Background overlay for dark theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Start Here - Beginners */}
              <div className="bg-gradient-to-br from-cyan-600/20 via-sky-600/10 to-teal-700/20 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-start relative overflow-hidden backdrop-blur-sm border-r border-white/10">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full shadow-lg shadow-cyan-400/50"></div>
                  <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full shadow-lg shadow-sky-400/50"></div>
                  <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-cyan-300 to-sky-400 rounded-full shadow-lg shadow-cyan-300/50"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0 pt-8 lg:pt-12">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-cyan-400/30">
                      <Users className="w-4 h-4 mr-2" />
                      {isEs ? 'Para principiantes' : 'For Beginners'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                      {isEs ? 'Empieza aquí' : 'Start Here'}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      {isEs
                        ? 'Amas la música y las grandes noches, pero el escenario aún parece lejano. Falta de equipo, contactos y dudas pueden hacerte pensar “¿y si no es para mí?”. Lo que quieres de verdad es expresarte y encontrar tu lugar real en la escena, no solo aprender botones.'
                        : 'You love music and big nights, but the stage still feels far. Gear, no contacts, and self-doubt can make you think "Maybe it\'s not for me?" What you really want is self-expression and a real place in the scene, not just button skills.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(isEs ? [
                      'Con mentores que cuidan y un espacio seguro, usarás la técnica como herramienta: sentir la música, leer la sala y guiar su energía.',
                      'Te ayudamos a vencer el síndrome del impostor, ganar confianza y encontrar tu voz.',
                      'Con apoyo real, comunidad real y un primer escenario para comenzar tu camino artístico.',
                      'Entrena con equipo profesional y DJs/productores en activo, recibe feedback claro, construye gusto y timing. Saldrás con mezclas ajustadas, música lista para lanzar y tiempo real de escenario. Únete a START y da un paso real hacia tu sueño.'
                    ] : [
                      "With caring mentors and a safe space, you'll use technique as a tool: feel the music, read the room, guide its energy.",
                      "We help you beat imposter syndrome, build confidence, and find your voice.",
                      "With real support, a real community, and a first stage to start your artist journey.",
                      "Train on pro gear with working DJs and producers, get clear feedback, build taste and timing. You'll leave with tight mixes, release-ready music, and real stage time. Join START and take a real step toward your dream."
                    ]).map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level Up - Experienced */}
              <div className="bg-gradient-to-br from-cyan-600/20 via-sky-600/10 to-teal-700/20 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-start relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full shadow-lg shadow-cyan-400/50"></div>
                  <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full shadow-lg shadow-sky-400/50"></div>
                  <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-br from-cyan-300 to-sky-400 rounded-full shadow-lg shadow-cyan-300/50"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0 pt-8 lg:pt-12">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-cyan-400/30">
                      <Award className="w-4 h-4 mr-2" />
                      {isEs ? 'Para DJs con experiencia' : 'For Experienced DJs'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                      {isEs ? 'Sube de nivel' : 'Level Up'}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      {isEs ? 'Ya dominas lo básico y puedes mover a la gente, pero quieres ir más allá de los sets estándar. Quieres crear tu propio sonido, conquistar escenarios más grandes y convertir tu pasión en una carrera sostenible. Es hora de romper el techo y convertirte en el artista que imaginas.' : "You've mastered the basics and can rock a crowd, but you're ready to evolve beyond standard sets. You want to create your own sound, command bigger stages, and turn your passion into a sustainable career. It's time to break through the ceiling and become the artist you envision."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(isEs ? [
                      'Pulimos tu marca y EPK, afinamos el posicionamiento y abrimos puertas a mejores slots de cartel a través de nuestra red de agencia.',
                      'Rompemos mesetas, definimos un sonido propio y fortalecemos tu marca para generar verdadero impulso.',
                      'Obtienes mentoría práctica, una estrategia clara y acceso directo a la escena.',
                      'Con la mentoría de Anton Bodnar y un plan claro pasas de la meseta al impulso: salas más grandes, mejores cachés, más demanda. ¿Listo para dar el salto? Únete a PRO o CREATOR.'
                    ] : [
                      'We polish your brand and EPK, sharpen positioning, open doors to better lineup slots through our agency network.',
                      'We break plateaus, shape a signature sound, and strengthen your brand for real momentum.',
                      'You get hands-on mentoring, a clear strategy, and direct access to the scene.',
                      'With mentoring from Anton Bodnar and a clear plan, you move from plateau to momentum - bigger rooms, better fees, more demand. Ready to step up? Join PRO or CREATOR.'
                    ]).map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Section */}
          <div id="mentors-section" className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10 py-20 lg:py-24">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-[#6efff8] via-[#6efff8] to-[#6efff8] bg-clip-text text-transparent">
                      {isEs ? 'Mentores que convierten tus habilidades en carreras' : 'Mentors Who Turn Your Skills Into Careers'}
                    </span>
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    {isEs ? 'Entrena con DJs, productores e ingenieros de sonido en activo liderados por Anton Bodnar. Aportan experiencia real de club y estudio, instrucciones claras y práctica actualizada en cada sesión. Gracias a la red de RANDOBA, abren puertas a showcases, huecos en carteles y una mentoría que continúa mucho después de clase.' : "Train with working DJs, producers, and sound engineers led by Anton Bodnar. They bring real club and studio experience, clear instruction, and up-to-date industry practice to every session. Through RANDOBA's network, they open doors to showcases, lineup slots, and mentors who keep supporting you long after class."}
                  </p>
                </div>
                {/* Mentors Grid (content unchanged, names/skills mostly proper nouns) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {/* Mentor 1 */}
                  <div className="group">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 backdrop-blur-sm border border-white/10 transition-all duration-500 h-full">
                      <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#6efff8]/30 group-hover:border-[#6efff8]/60 transition-all duration-300">
                          <img src="https://cdn.builder.io/api/v1/image/assets%2Fec00151df3194966b462fbb12448bf4f%2F7b77b6582f8d4eaaab800bf251d840a5?format=webp&width=800" alt="Anton" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: '#6efff8'}}>
                          <span className="text-black text-xs font-bold">★</span>
                        </div>
                      </div>
                      <div className="text-center flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2" style={{color: '#6efff8'}}>Anton Bodnar</h3>
                        <p className="text-sm font-medium mb-3" style={{color: '#6efff8', opacity: '0.8'}}>{isEs ? 'Especialista en producción técnica' : 'Technical Production Specialist'}</p>
                        <p className="text-sm leading-relaxed mb-4 min-h-[120px]" style={{color: '#6efff8', opacity: '0.7'}}>
                          {isEs ? 'DJ y productor musical, fundador de Randoba. Con más de 19 años de experiencia profesional, ha formado a más de 1.000 alumnos en todo el mundo. Como mentor de DJ, inspira a sus estudiantes a sentir la música y transformarla en arte.' : 'DJ and music producer, founder of Randoba. With over 19 years of professional experience, he has trained more than 1,000 students worldwide. As a dedicated DJing mentor, he inspires his students to truly feel the music and transform it into art.'}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['Performance','Branding','Crowd','Reading','Artistic Identity'].map((s,i)=> (
                            <span key={i} className="px-3 py-1 text-xs rounded-full border" style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}}>
                              {isEs ? (['Actuación','Branding','Público','Lectura','Identidad artística'][i]) : s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mentor 2 */}
                  <div className="group">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 backdrop-blur-sm border border-white/10 transition-all duration-500 h-full">
                      <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#6efff8]/30 group-hover:border-[#6efff8]/60 transition-all duration-300">
                          <img src="https://cdn.builder.io/api/v1/image/assets%2Fb4a3227fcc8443aaad6628c5c9bd9fe4%2Fd8969e74e29c4732ab0037380afe66d5?format=webp&width=800" alt="Saim" className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" style={{objectPosition: 'center 20%'}} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: '#6efff8'}}>
                          <span className="text-black text-xs font-bold">★</span>
                        </div>
                      </div>
                      <div className="text-center flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2" style={{color: '#6efff8'}}>Saim</h3>
                        <p className="text-sm font-medium mb-3" style={{color: '#6efff8', opacity: '0.8'}}>{isEs ? 'Estratega de performance y marca' : 'Performance & Brand Strategist'}</p>
                        <p className="text-sm leading-relaxed mb-4 min-h-[120px]" style={{color: '#6efff8', opacity: '0.7'}}>
                          {isEs ? 'DJ con experiencia en Ibiza, Marbella y Berlín. Experto en mezcla, cultura musical, psicología de pista y marca de artista.' : 'DJ with experience in Ibiza, Marbella & Berlin. Expert in mixing, music culture, dancefloor psychology & artist branding.'}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['Performance','Branding','Crowd','Reading','Artistic Identity'].map((s,i)=> (
                            <span key={i} className="px-3 py-1 text-xs rounded-full border" style={{backgroundColor: 'transparent', color: '#6efff8', borderColor: '#6efff8'}}>
                              {isEs ? (['Actuación','Branding','Público','Lectura','Identidad artística'][i]) : s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Learn With Us Section */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-2xl animate-pulse" style={{backgroundColor: '#6efff8'}}></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#6efff8', animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full blur-xl animate-pulse" style={{backgroundColor: '#6efff8', animationDelay: '3s'}}></div>
            </div>

            <div className="relative z-10 py-20 lg:py-24">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-[#6efff8] via-[#6efff8] to-[#6efff8] bg-clip-text text-transparent">
                      {isEs ? 'Por qué aprender con nosotros' : 'Why learn with us'}
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
                  <div className="group relative h-full">
                    <div className="absolute inset-0 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500" style={{backgroundColor: '#6efff8', opacity: '0.1'}}></div>
                    <div className="relative bg-gradient-to-br from-slate-800/80 via-gray-800/60 to-slate-900/80 rounded-3xl p-8 lg:p-10 backdrop-blur-sm border border-white/10 transition-all duration-500 transform group-hover:-translate-y-2 h-full flex flex-col" style={{borderColor: '#6efff8'}}>
                      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-bounce" style={{backgroundColor: '#6efff8'}}></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" style={{backgroundColor: '#6efff8'}}></div>
                      <div className="space-y-6 flex-grow">
                        {(isEs ? [
                          'Mentoría 1:1 y laboratorios en grupos reducidos: confianza en cabina, feedback preciso y progreso rápido.',
                          'De la técnica al arte: no solo botones; leer la sala, modelar la energía y diseñar el arco del set.',
                          'Método propio de Anton Bodnar: camino estructurado desde fundamentos hasta identidad artística única.',
                          'Artist Development: sonido propio, flujo en Ableton, diseño sonoro, arreglos, mezcla, mastering y sistemas para terminar temas listos para lanzar.'
                        ] : [
                          '1:1 mentoring and small-group labs: build confidence in the booth, get precise feedback, and progress fast.',
                          'From technique to artistry: not just buttons, but read the room, shape energy, and design the arc of a set.',
                          "Anton Bodnar's signature method: a structured path from fundamentals to a distinct artist identity.",
                          'Artist Development: signature sound, Ableton Live workflow, sound design, arrangement, mixdown, mastering, finishing systems for release-ready tracks.'
                        ]).map((item, index) => (
                          <div key={index} className="flex items-start space-x-4 group/item">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 shadow-lg group-hover/item:scale-110 transition-all duration-300" style={{backgroundColor: '#6efff8', boxShadow: '0 10px 15px -3px rgba(110, 255, 248, 0.3)'}}>
                              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                            </div>
                            <p className="leading-relaxed transition-colors duration-300 flex-1" style={{color: '#6efff8'}}>
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="group relative h-full">
                    <div className="absolute inset-0 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500" style={{backgroundColor: '#6efff8', opacity: '0.1'}}></div>
                    <div className="relative bg-gradient-to-br from-slate-800/80 via-gray-800/60 to-slate-900/80 rounded-3xl p-8 lg:p-10 backdrop-blur-sm border border-white/10 transition-all duration-500 transform group-hover:-translate-y-2 h-full flex flex-col" style={{borderColor: '#6efff8'}}>
                      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-bounce" style={{backgroundColor: '#6efff8', animationDelay: '0.5s'}}></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" style={{backgroundColor: '#6efff8', animationDelay: '1s'}}></div>
                      <div className="space-y-6 flex-grow">
                        {(isEs ? [
                          'Estrategia de carrera: posicionamiento, press kit, branding del artista, tarifas y negociación.',
                          'Networking y acceso: contactos directos, showcases y huecos en carteles a través de la agencia RANDOBA.',
                          'Escenarios reales: primeros bolos para principiantes; salas más grandes y mejores cachés para pros.',
                          'Comunidad que apoya: entorno seguro y motivador con feedback continuo y sentido real de pertenencia.'
                        ] : [
                          'Career strategy: positioning, press kit, artist branding, rates, and negotiation.',
                          "Networking & access: direct contacts, showcases, and line-up slots through RANDOBA's agency.",
                          'Real stages: first gigs for newcomers, bigger rooms and better fees for pros.',
                          'Supportive community: a safe, motivating environment with ongoing feedback and a real sense of belonging.'
                        ]).map((item, index) => (
                          <div key={index} className="flex items-start space-x-4 group/item">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 shadow-lg group-hover/item:scale-110 transition-all duration-300" style={{backgroundColor: '#6efff8', boxShadow: '0 10px 15px -3px rgba(110, 255, 248, 0.3)'}}>
                              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                            </div>
                            <p className="leading-relaxed transition-colors duration-300 flex-1" style={{color: '#6efff8'}}>
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RANDOBA Graduates Section - Carousel */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900"></div>
            <div className="absolute inset-0 overflow-hidden opacity-15">
              <div className="absolute top-20 right-20 w-48 h-48 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#6efff8'}}></div>
              <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#6efff8', animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse" style={{backgroundColor: '#6efff8', animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 py-20 lg:py-24">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-[#6efff8] via-[#6efff8] to-[#6efff8] bg-clip-text text-transparent">
                      {isEs ? 'Graduados RANDOBA - Resultados reales, carreras reales' : 'RANDOBA Graduates - Real Results, Real Careers'}
                    </span>
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                    <Button onClick={scrollPrev} size="icon" className="backdrop-blur-sm border rounded-full shadow-lg hover:shadow-xl transition-all duration-300" style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}>
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                    <Button onClick={scrollNext} size="icon" className="backdrop-blur-sm border rounded-full shadow-lg hover:shadow-xl transition-all duration-300" style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}>
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex items-stretch">
                      {graduates.map((graduate) => (
                        <div key={graduate.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 flex">
                          <div className="relative w-full flex flex-col h-full">
                            <div className="absolute inset-0 rounded-2xl" style={{backgroundColor: '#6efff8', opacity: '0.05'}}></div>
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-gray-800/70 to-slate-900/90 rounded-2xl p-6 backdrop-blur-sm border border-white/10 flex flex-col h-full min-h-[480px]" style={{borderColor: '#6efff8'}}>
<>
                                  <div className="mb-6 mx-auto w-full">
                                    <div className="w-full h-64 md:h-80 overflow-hidden rounded-2xl border-2 shadow-md" style={{borderColor: '#6efff8', boxShadow: '0 12px 24px -6px rgba(110, 255, 248, 0.12)'}}>
                                      <img src={graduate.image} alt={graduate.name} className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
                                    </div>
                                  </div>
                                  <div className="text-center mt-4">
                                    <h3 className="text-2xl font-bold mb-1" style={{color: '#6efff8'}}>{graduate.name}</h3>
                                    <p className="text-lg font-medium" style={{color: '#6efff8', opacity: '0.9'}}>{graduate.title}</p>
                                  </div>
                                </>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Request Form Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-[#6efff8]/10 to-transparent rounded-full"></div>
            <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-radial from-[#4fd1c7]/10 to-transparent rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-radial from-[#2dd4bf]/5 to-transparent rounded-full"></div>
          </div>

          <div className="absolute inset-0 opacity-10 hidden sm:block">
            <div className="absolute top-32 left-16 w-8 h-8 border border-[#6efff8] rotate-45"></div>
            <div className="absolute top-48 right-24 w-6 h-6 border border-[#4fd1c7] rotate-12"></div>
            <div className="absolute bottom-32 left-32 w-10 h-10 border border-[#2dd4bf] rotate-45"></div>
            <div className="absolute bottom-48 right-16 w-4 h-4 border border-[#14b8a6] rotate-12"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                <span className="bg-gradient-to-r from-[#6efff8] to-[#4fd1c7] bg-clip-text text-transparent">
                  {isEs ? '¿Listo para empezar tu camino?' : 'Ready to Start Your Journey?'}
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 lg:px-0">
                {isEs ? '¿Tienes dudas sobre nuestros cursos o listo para aplicar? Ponte en contacto con nuestro equipo y te ayudaremos a encontrar el camino perfecto para lograr tus metas como DJ y productor musical.' : "Have questions about our courses or ready to apply? Get in touch with our team and we'll help you find the perfect path to achieve your DJ and music production goals."}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 p-4 sm:p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-800/90"></div>
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 leading-tight" style={{color: '#6efff8'}}>
                      {isEs ? 'Únete a la familia RANDOBA' : 'Join the RANDOBA Family'}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl opacity-90" style={{color: '#6efff8'}}>
                      {isEs ? '¿Buscas escenarios más grandes, mejores cachés y mayor reconocimiento? Solicita ahora y recibe tu plan de crecimiento personalizado.' : 'Looking for bigger stages, higher fees, and greater recognition? Apply now and receive your custom career growth plan.'}
                    </p>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6 bg-gray-900/50">
                  <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          {isEs ? 'Nombre completo *' : 'Full Name *'}
                        </label>
                        <Input required name="name" value={contactForm.name} onChange={handleContactFormChange} className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/50 h-11" placeholder={isEs ? 'Tu nombre completo' : 'Your full name'} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          {isEs ? 'Correo electrónico *' : 'Email Address *'}
                        </label>
                        <Input type="email" required name="email" value={contactForm.email} onChange={handleContactFormChange} className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/50 h-11" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          {isEs ? 'Nombre artístico/DJ *' : 'Artist/DJ Name *'}
                        </label>
                        <Input required name="subject" value={contactForm.subject} onChange={handleContactFormChange} className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/50 h-11" placeholder={isEs ? 'Tu nombre artístico' : 'Your artist name'} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          {isEs ? 'Teléfono *' : 'Phone Number *'}
                        </label>
                        <Input type="tel" required name="phone" value={contactForm.phone} onChange={handleContactFormChange} className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/50 h-11" placeholder={isEs ? '+34 (663) 353 486' : '+34 (663) 353 486'} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Cuéntanos sobre ti *' : 'Tell Us About Yourself *'}
                      </label>
                      <Textarea required rows={5} name="message" value={contactForm.message} onChange={handleContactFormChange} className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/50 resize-none" placeholder={isEs ? 'Comparte tu historia, logros, objetivos y por qué te gustaría trabajar con RANDOBA...' : "Share your story, achievements, goals, and why you'd like to work with RANDOBA..."} />
                    </div>

                    {submitMessage && (
                      <div className={`p-4 rounded-lg ${submitMessage.includes('Gracias') || submitMessage.includes('Thank you') ? 'bg-green-500/10 border border-green-400/30 text-green-300' : 'bg-red-500/10 border border-red-400/30 text-red-300'}`}>
                        {submitMessage}
                      </div>
                    )}

                    <div className="text-center">
                      <Button type="submit" disabled={isSubmitting} size="lg" className="bg-gradient-to-r from-[#6efff8] via-[#4fd1c7] to-[#2dd4bf] text-black hover:from-[#5de8db] hover:via-[#44d4c1] hover:to-[#14b8a6] font-semibold px-10 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-[#6efff8]/25 rounded-xl text-base max-w-xs sm:max-w-none mx-auto">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <span>{isEs ? 'Enviando...' : 'Sending...'}</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {isEs ? 'Enviar solicitud' : 'Submit Request'}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          item={selectedCourse ? { id: selectedCourse.id, title: (isEs && esCourseMap[selectedCourse.id]?.title) ? esCourseMap[selectedCourse.id]!.title! : selectedCourse.title, instructor: isEs ? 'Instructor profesional' : 'Professional Instructor', duration: isEs ? 'Curso integral' : 'Comprehensive Course', location: isEs ? 'Plataforma online' : 'Online Learning Platform', price: selectedCourse.price, type: 'course' } : null}
        />
      </section>
    </div>
  );
}
