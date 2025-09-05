import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactModal } from "@/components/ContactModal";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Calendar as CalendarIcon,
  Users,
  Star,
  Music,
  Play,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function EventsProduction() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [isVisible, setIsVisible] = useState(false);
  const [contactModal, setContactModal] = useState<{isOpen: boolean, preset: 'general' | 'project' | 'partner' | 'support', title: string, description: string}>({
    isOpen: false,
    preset: 'general',
    title: isEs ? 'Contáctanos' : 'Contact Us',
    description: isEs ? 'Ponte en contacto con nuestro equipo' : 'Get in touch with our team'
  });
  const [discussOpen, setDiscussOpen] = useState(false);
  const [discussForm, setDiscussForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openContactModal = (preset: 'general' | 'project' | 'partner' | 'support', title: string, description: string) => {
    setContactModal({isOpen: true, preset, title, description});
  };

  const closeContactModal = () => {
    setContactModal(prev => ({...prev, isOpen: false}));
  };

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

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(2deg);
            }
            66% {
              transform: translateY(-10px) rotate(-1deg);
            }
          }

          @keyframes glow {
            0%, 100% {
              filter: drop-shadow(0 0 20px rgba(110, 255, 248, 0.4));
            }
            50% {
              filter: drop-shadow(0 0 40px rgba(110, 255, 248, 0.8));
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }

          .hero-image {
            animation: float 6s ease-in-out infinite, glow 3s ease-in-out infinite;
          }

          .animated-gradient-bg {
            background: linear-gradient(-45deg, #000, #111, #222, #000);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #6efff8;
            opacity: 0.6;
            animation: particle-float 8s linear infinite;
          }

          @keyframes particle-float {
            0% {
              transform: translateY(100vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(-100px) translateX(100px);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Animated Hero Section */}
      <section className="relative min-h-screen overflow-hidden animated-gradient-bg">
        {/* Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Animated Background Gradients - Reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden opacity-10 sm:opacity-20">
          <div
            className="absolute top-10 sm:top-20 left-5 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"
            style={{animationDuration: '4s'}}
          ></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse"
            style={{animationDelay: '2s', animationDuration: '5s'}}
          ></div>
          <div
            className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] rounded-full blur-2xl animate-pulse"
            style={{animationDelay: '3s', animationDuration: '6s'}}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32 min-h-[85vh] sm:min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center w-full">
            
            {/* Content Side */}
            <div className={`space-y-6 sm:space-y-8 lg:space-y-10 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4 sm:space-y-6">
                <Badge 
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 inline-flex animate-pulse"
                  style={{borderColor: '#6efff8', color: '#6efff8'}}
                >
                  <Sparkles className="w-3 h-3 mr-1" style={{color: '#6efff8'}} />
                  {isEs ? 'Excelencia en producción de eventos' : 'Event Production Excellence'}
                </Badge>

                <div className="space-y-3 sm:space-y-4">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                    style={{
                      color: '#6efff8',
                      textShadow: '0 0 30px rgba(110, 255, 248, 0.5)'
                    }}
                  >
                    {isEs ? 'Producción de eventos' : 'Events Production'}
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                    {isEs
                      ? 'RANDOBA crea eventos que tus invitados recuerdan: sonido impecable, conceptos originales y una atmósfera magnética. Desde celebraciones privadas en villas hasta grandes showcases de marca, convertimos ideas en experiencias inolvidables. Un solo equipo, un solo contrato, cero estr��s de coordinación: nos encargamos del concepto, la contratación de artistas y la producción integral para que tú te centres en tus invitados.'
                      : 'RANDOBA creates events your guests remember - impeccable sound, original concepts, a magnetic atmosphere. From private villa celebrations to large-scale brand showcases, we turn ideas into unforgettable experiences. One team, one contract, zero coordination stress: we handle concept design, artist booking, and end-to-end production so you can focus on your guests.'}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3 sm:space-y-4">
                {(isEs ? [
                  'Eventos privados',
                  'Eventos corporativos',
                  'Eventos de marca',
                ] : [
                  'Private Events',
                  'Corporate Events',
                  'Branded Events',
                ]).map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-3 transform transition-all duration-500"
                    style={{
                      animationName: isVisible ? 'fadeInUp' : 'none',
                      animationDuration: isVisible ? '0.8s' : '0s',
                      animationTimingFunction: 'ease-out',
                      animationFillMode: isVisible ? 'forwards' : 'none',
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{color: '#6efff8'}} />
                    <span className="text-gray-300 text-base sm:text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Button
                  size="lg"
                  className="bg-transparent border-2 font-semibold px-6 py-3 sm:px-8 sm:py-4 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl group text-sm sm:text-base"
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
                  onClick={() => openContactModal(
                    'project',
                    isEs ? 'Empieza tu proyecto' : 'Start Your Project',
                    isEs ? 'Cuéntanos sobre tu evento y recibe un presupuesto personalizado' : 'Tell us about your event and get a custom quote'
                  )}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                  {isEs ? 'Empieza tu proyecto' : 'Start Your Project'}
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" style={{color: '#6efff8'}} />
                </Button>

              </div>
            </div>

            {/* Image Side */}
            <div className={`relative flex justify-center items-center mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* Glow effect background */}
                <div 
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(110, 255, 248, 0.3) 0%, transparent 70%)',
                    transform: 'scale(1.2)'
                  }}
                ></div>
                
                {/* Main Image */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fd8cd475c5e9d49c6b471be0095277392%2F62e0ed1a030e45b1b92fb7f86ddbdb27?format=webp&width=800"
                  alt="Events Production Concept"
                  className="hero-image relative z-10 w-full max-w-lg h-auto object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)',
                    maxWidth: '500px'
                  }}
                />

                {/* Rotating rings around image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-96 h-96 border border-[#6efff8]/20 rounded-full animate-spin"
                    style={{animationDuration: '20s'}}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-80 h-80 border border-[#6efff8]/10 rounded-full animate-spin"
                    style={{animationDuration: '15s', animationDirection: 'reverse'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Detailed Services Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-40 left-40 w-64 h-64 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-40 w-72 h-72 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{color: '#6efff8'}}>
              {isEs ? 'Para clientes privados y gestores de eventos de alto perfil' : 'For Private Clients & High-Profile Event Managers'}
            </h2>
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-[#6efff8]/20">
              <p className="text-lg text-gray-200 leading-relaxed">
                <span className="font-semibold" style={{color: '#6efff8'}}>{isEs ? 'Para quién es:' : "Who it's for:"}</span> {isEs ? 'clientes privados, gestores de eventos de marcas de lujo y venues premium en España que quieren un único partner llave en mano para diseñar y ejecutar eventos con música de principio a fin, sin riesgos.' : "private clients, luxury brand event managers, and premium venues in Spain who want a single turnkey partner to design and deliver music-led events end to end, without the risk."}
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {(isEs ? [
              {
                number: "01",
                title: "Selección perfecta de artistas",
                description: "sistema propio de matching (estilo, experiencia, encaje con la audiencia) y casting minucioso para tu formato."
              },
              {
                number: "02",
                title: "Entrega técnica impecable",
                description: "equipos premium, instalación limpia y logística sin fisuras."
              },
              {
                number: "03",
                title: "Arco musical de la noche",
                description: "desde la bienvenida y la cena hasta el set de baile; playlists por zonas y un tono alineado con la marca."
              },
              {
                number: "04",
                title: "Valor de marca",
                description: "una atmósfera que construye estatus y fidelidad, con contenido listo para medios y playlists de marca."
              },
              {
                number: "05",
                title: "Gestión del riesgo",
                description: "run-of-show y permisos, plan B técnico y por clima, cumplimiento del venue/ruido y pruebas de sonido obligatorias."
              },
              {
                number: "06",
                title: "Presupuestos transparentes",
                description: "estimaciones detalladas sin sorpresas y opciones de upgrade según objetivo y escala."
              }
            ] : [
              {
                number: "01",
                title: "Perfect artist match",
                description: "a proprietary artist-matching system (style, experience, audience fit) and meticulous casting for your format."
              },
              {
                number: "02",
                title: "Flawless technical delivery",
                description: "premium equipment, tidy installation, and seamless logistics."
              },
              {
                number: "03",
                title: "The musical arc of the night",
                description: "from welcome and dinner to the peak dance set; zone playlists and a brand-aligned tone."
              },
              {
                number: "04",
                title: "Brand value",
                description: "a status-building atmosphere guests return for, with media-ready content and branded playlists."
              },
              {
                number: "05",
                title: "Risk management",
                description: "run-of-show and permits, weather and technical plan B, venue/noise compliance, and mandatory soundchecks."
              },
              {
                number: "06",
                title: "Transparent budgeting",
                description: "line-item estimates with no surprises, plus upgrade options by goal and scale."
              }
            ]).map((service, index) => (
              <div
                key={service.number}
                className="group relative p-6 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-[#6efff8]/20 hover:border-[#6efff8]/40 transition-all duration-500 hover:scale-105"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Number Badge */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg mb-4 border-2"
                  style={{
                    backgroundColor: 'rgba(110, 255, 248, 0.1)',
                    borderColor: '#6efff8',
                    color: '#6efff8'
                  }}
                >
                  {service.number}
                </div>

                <h3 className="text-xl font-bold mb-3" style={{color: '#6efff8'}}>
                  {service.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6efff8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm border-2 border-[#6efff8]/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#6efff8'}}>
                {isEs ? '¿Quieres el factor wow sin riesgo?' : 'Want the wow factor risk-free?'}
              </h3>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                {isEs ? 'Envíanos tu briefing: te propondremos escenarios a distintas escalas, con el lineup óptimo y un plan de producción a medida de tu venue y audiencia.' : "Send us your brief - we'll propose scenarios at different scales, with the optimal lineup and a tailored production plan for your venue and audience."}
              </p>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-transparent border-2 font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
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
                  onClick={() => openContactModal('general', isEs ? 'Contáctanos' : 'Contact Us', isEs ? 'Ponte en contacto con nuestro equipo de producción de eventos' : 'Get in touch with our events production team')}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                  {isEs ? 'Contáctanos' : 'Contact Us'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs & Venues Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 inline-flex mb-8 animate-pulse"
              style={{borderColor: '#6efff8', color: '#6efff8'}}
            >
              <Music className="w-3 h-3 mr-1" style={{color: '#6efff8'}} />
              {isEs ? 'Alianzas con salas y locales' : 'Venue Partnerships'}
            </Badge>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight px-2"
              style={{
                color: '#6efff8',
                textShadow: '0 0 30px rgba(110, 255, 248, 0.3)'
              }}
            >
              {isEs ? 'Para clubs y locales: construye una identidad musical' : 'For Clubs & Venues - to Build a Musical Identity'}
            </h2>

            {/* Who it's for */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border border-[#6efff8]/20 mx-2">
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                <span className="font-semibold" style={{color: '#6efff8'}}>{isEs ? 'Para quién es:' : "Who it's for:"}</span> {isEs ? 'propietarios y gestores de restaurantes premium, beach clubs y hoteles boutique, así como venues y azoteas que buscan construir una firma musical clara y una programación consistente de residentes.' : 'owners and managers of premium restaurants, beach clubs, and boutique hotels, as well as venues and bar/rooftop spaces looking to build a clear musical signature and a consistent resident lineup.'}
              </p>
            </div>

            {/* Detailed Services */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-2">
              {(isEs ? [
                {
                  number: "01",
                  title: "ADN musical para tu venue",
                  description: "concepto de serie, posicionamiento, calendario de eventos y un programa de residentes a medida de tu audiencia."
                },
                {
                  number: "02",
                  title: "Carteles exclusivos",
                  description: "acceso a nuestra red de artistas y headliners invitados; casting preciso por estilo y nivel."
                },
                {
                  number: "03",
                  title: "Producción integral",
                  description: "idea → booking → sonido/luces/escenario → visuales y regiduría → entrega impecable in situ."
                },
                {
                  number: "04",
                  title: "Sonido impecable",
                  description: "equipos premium, pruebas de sonido obligatorias y estricto cumplimiento de límites de dB y requisitos del venue."
                },
                {
                  number: "05",
                  title: "Promoción y ticketing",
                  description: "plan de medios, creatividades, foto/vídeo y venta de entradas."
                },
                {
                  number: "06",
                  title: "Hype y reputación",
                  description: "eventos de los que se habla; playlists y menciones en medios que consolidan tu estatus de 'place to be'."
                }
              ] : [
                {
                  number: "01",
                  title: "Musical DNA for your venue",
                  description: "series concept, positioning, event calendar, and a resident program tailored to your audience."
                },
                {
                  number: "02",
                  title: "Exclusive lineups",
                  description: "access to our network of artists and guest headliners, precise casting by style and level."
                },
                {
                  number: "03",
                  title: "End-to-end production",
                  description: "idea → booking → sound/lighting/stage → visuals & showcalling → flawless on-site delivery."
                },
                {
                  number: "04",
                  title: "Impeccable sound",
                  description: "premium equipment, mandatory soundchecks, and strict compliance with dB limits and venue requirements."
                },
                {
                  number: "05",
                  title: "Promo & ticketing",
                  description: "media plan, artwork, photo/video content, and ticket sales."
                },
                {
                  number: "06",
                  title: "Hype & reputation",
                  description: "events people talk about; playlists and media mentions that cement your \"place to be\" status."
                }
              ]).map((service, index) => (
                <div
                  key={service.number}
                  className="group relative p-6 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-[#6efff8]/20 hover:border-[#6efff8]/40 transition-all duration-500 hover:scale-105"
                  style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 150}ms`,
                }}
                >
                  {/* Number Badge */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg mb-4 border-2"
                    style={{
                      backgroundColor: 'rgba(110, 255, 248, 0.1)',
                      borderColor: '#6efff8',
                      color: '#6efff8'
                    }}
                  >
                    {service.number}
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{color: '#6efff8'}}>
                    {service.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6efff8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>

            {/* Call to Action Question */}
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-[#6efff8]/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#6efff8'}}>
                {isEs ? '¿Quieres convertir tu venue en un imán para el público adecuado?' : 'Want to turn your venue into a magnet for the right crowd?'}
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                {isEs ? 'Envíanos un briefing desde la web: desarrollaremos un concepto, propondremos residentes y definiremos un plan de promoción con un presupuesto adaptado a tu audiencia y formato.' : "Send us a brief via the site - we'll develop a concept, propose residents, and outline a promo plan with a budget tailored to your audience and format."}
              </p>
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
                onClick={() => openContactModal('partner', isEs ? 'Colabora con nosotros' : 'Partner With Us', isEs ? 'Explora oportunidades de colaboración con RANDOBA' : 'Explore partnership opportunities with RANDOBA')}
              >
                <Music className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                {isEs ? 'Colabora con nosotros' : 'Partner With Us'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Formats Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-800 via-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 inline-flex mb-8 animate-pulse"
              style={{borderColor: '#6efff8', color: '#6efff8'}}
            >
              <Sparkles className="w-3 h-3 mr-1" style={{color: '#6efff8'}} />
              {isEs ? 'Formatos de evento' : 'Event Formats'}
            </Badge>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{
                color: '#6efff8',
                textShadow: '0 0 30px rgba(110, 255, 248, 0.3)'
              }}
            >
              {isEs ? 'Elige tu experiencia: formatos RANDOBA' : 'Choose Your Experience: RANDOBA Event Formats'}
            </h2>
          </div>

          {/* Event Format Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">

            {/* Private Events */}
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#6efff8]/20 hover:border-[#6efff8]/50 transition-all duration-300 h-full hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6efff8]/10 flex items-center justify-center mr-3 ring-1 ring-[#6efff8]/30">
                  <Users className="w-5 h-5" style={{color: '#6efff8'}} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{color: '#6efff8'}}>
                  {isEs ? 'Eventos privados' : 'Private Events'}
                </h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Formatos' : 'Formats'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'bodas, fiestas, cumpleaños, aniversarios, pedidas, etc.' : 'weddings, parties, birthdays, anniversaries, engagements, etc.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Planificación concierge' : 'Concierge planning'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'un solo productor: sin coordinador por tu parte.' : 'one producer - no coordinator on your end.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Producción premium discreta' : 'Discreet premium production'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'audio de estudio, iluminación arquitectónica.' : 'studio audio, architectural lighting.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Talento seleccionado' : 'Handpicked talent'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'DJs, actuaciones en vivo, maestros de ceremonias: a tu gusto.' : 'DJs, live acts, MCs - to your taste.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Ejecución fluida' : 'Seamless delivery'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'cronograma, regiduría y presupuesto claro.' : 'timeline, show calling, clear budget.'}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Corporate Events */}
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#6efff8]/20 hover:border-[#6efff8]/50 transition-all duration-300 h-full hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6efff8]/10 flex items-center justify-center mr-3 ring-1 ring-[#6efff8]/30">
                  <Star className="w-5 h-5" style={{color: '#6efff8'}} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{color: '#6efff8'}}>
                  {isEs ? 'Eventos corporativos' : 'Corporate Events'}
                </h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Formatos' : 'Formats'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'lanzamientos, showcases, inauguraciones, pop-ups, galas, premios, etc.' : 'launches, showcases, openings, pop-ups, galas, awards, etc.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Un partner de principio a fin' : 'One partner, end-to-end'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'concepto, booking, A/V y operación in situ.' : 'concept, booking, A/V, on-site.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Experiencia alineada con tu marca' : 'Brand‑aligned experience'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'música + creatividad en tu identidad.' : 'music + creative in your identity.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'A/V premium y compliance' : 'Premium A/V & compliance'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'sonido, iluminación, escenario y control de riesgos.' : 'sound, lighting, stage, risk control.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Talento y presentadores' : 'Talent & hosts'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'DJs, artistas en vivo y presentadores.' : 'DJs, live acts, presenters.'}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Branded Events */}
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#6efff8]/20 hover:border-[#6efff8]/50 transition-all duration-300 h-full hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6efff8]/10 flex items-center justify-center mr-3 ring-1 ring-[#6efff8]/30">
                  <Music className="w-5 h-5" style={{color: '#6efff8'}} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{color: '#6efff8'}}>
                  {isEs ? 'Eventos de marca' : 'Branded Events'}
                </h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Formatos' : 'Formats'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'residencias, temporadas, takeovers de beach club, sesiones en azoteas, showcases de sello, etc.' : 'residencies, seasonal runs, beach-club takeovers, rooftop sessions, label showcases, etc.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Un partner llave en mano' : 'One turnkey partner'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'productor dedicado, contrato único y producción completa.' : 'dedicated producer, single contract, full production.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Identidad musical y residentes' : 'Musical identity & residents'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'series curadas, roster de residentes y headliners invitados.' : 'curated series, resident roster - guest headliners.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Sonido y control de riesgos' : 'Sound & risk control'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'A/V premium, pruebas de sonido y cumplimiento de dB.' : 'premium A/V, sound checks, dB compliance.'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{color: '#6efff8'}} />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border" style={{color: '#6efff8', borderColor: '#6efff8'}}>{isEs ? 'Impacto medible' : 'Measurable impact'}</span>
                    <p className="text-gray-300 mt-2">{isEs ? 'más afluencia, más ingresos y estatus de “place to be”.' : 'more foot traffic, more revenue, "place-to-be" status.'}</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-transparent border-2 font-semibold px-12 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
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
              onClick={() => setDiscussOpen(true)}
            >
              <CalendarIcon className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
              {isEs ? 'Hablemos de tu evento' : 'Discuss Your Event'}
            </Button>

            {/* Discuss Your Event - Contact Modal */}
            <Dialog open={discussOpen} onOpenChange={(open) => !open ? setDiscussOpen(false) : setDiscussOpen(true)}>
              <DialogContent className="bg-gray-900 border-gray-700 max-w-md" style={{backgroundColor: '#0b0b0b', borderColor: '#6efff8'}}>
                <DialogHeader>
                  <DialogTitle style={{color: '#6efff8'}}>{isEs ? 'Hablemos de tu evento' : 'Discuss Your Event'}</DialogTitle>
                  <DialogDescription style={{color: '#6efff8', opacity: 0.8}}>
                    {isEs ? 'Déjanos tus datos y nos pondremos en contacto contigo.' : 'Leave your details and we’ll get back to you.'}
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
                          name: discussForm.name,
                          email: discussForm.email,
                          phone: discussForm.phone,
                          subject: isEs ? 'Hablemos de tu evento' : 'Discuss Your Event',
                          message: discussForm.message || (isEs ? 'Por favor, contáctame sobre mi evento.' : 'Please contact me about my event.'),
                          source: 'events-discuss',
                        }),
                      });
                      if (!resp.ok) throw new Error('Request failed');
                      setDiscussOpen(false);
                      setDiscussForm({ name: '', email: '', phone: '', message: '' });
                    } catch (err) {
                      alert(isEs ? 'El envío ha fallado. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="discuss-name" style={{color: '#6efff8'}}>{isEs ? 'Nombre' : 'Name'}</Label>
                    <Input
                      id="discuss-name"
                      value={discussForm.name}
                      onChange={(e) => setDiscussForm({...discussForm, name: e.target.value})}
                      className="mt-1"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder={isEs ? 'Tu nombre completo' : 'Your full name'}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="discuss-email" style={{color: '#6efff8'}}>{isEs ? 'Email' : 'Email'}</Label>
                    <Input
                      id="discuss-email"
                      type="email"
                      value={discussForm.email}
                      onChange={(e) => setDiscussForm({...discussForm, email: e.target.value})}
                      className="mt-1"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="discuss-phone" style={{color: '#6efff8'}}>{isEs ? 'Teléfono' : 'Phone Number'}</Label>
                    <Input
                      id="discuss-phone"
                      type="tel"
                      value={discussForm.phone}
                      onChange={(e) => setDiscussForm({...discussForm, phone: e.target.value})}
                      className="mt-1"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder={isEs ? '+34 600 000 000' : '+34 600 000 000'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discuss-message" style={{color: '#6efff8'}}>{isEs ? 'Mensaje' : 'Message'}</Label>
                    <Textarea
                      id="discuss-message"
                      rows={4}
                      value={discussForm.message}
                      onChange={(e) => setDiscussForm({...discussForm, message: e.target.value})}
                      className="mt-1 resize-none"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.08)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder={isEs ? 'Cuéntanos sobre tu evento' : 'Tell us about your event'}
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
          </div>
        </div>
      </section>

      {/* Event Portfolio Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-slate-800 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#6efff8] to-[#4fd1c7] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-[#4fd1c7] to-[#2dd4bf] rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-[#2dd4bf] to-[#14b8a6] rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 inline-flex mb-8 animate-pulse"
              style={{borderColor: '#6efff8', color: '#6efff8'}}
            >
              <Star className="w-3 h-3 mr-1" style={{color: '#6efff8'}} />
              {isEs ? 'Portafolio' : 'Portfolio Showcase'}
            </Badge>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{
                color: '#6efff8',
                textShadow: '0 0 30px rgba(110, 255, 248, 0.3)'
              }}
            >
              {isEs ? 'Portafolio de eventos: nuestros mejores proyectos' : 'Event Portfolio: Our Best Projects'}
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {isEs ? 'Desde celebraciones privadas íntimas hasta grandes experiencias de marca, descubre cómo RANDOBA convierte visiones en momentos inolvidables.' : 'From intimate private celebrations to large-scale branded experiences, discover how RANDOBA transforms visions into unforgettable moments.'}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 auto-rows-fr">
            {[
              {
                id: 1,
                title: "Villa Marbella Private Wedding",
                category: "Private Event",
                description: "An intimate 120-guest celebration with custom lighting design, curated jazz ensemble, and seamless day-to-night musical transition.",
                image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Fb8154c7aa9864cf4993175dba65c564c?format=webp&width=600",
                year: "2024"
              },
              {
                id: 2,
                title: "Mercedes-Benz Launch Event",
                category: "Corporate Event",
                description: "Brand activation for 300 VIP guests featuring dynamic A/V production, custom soundscape, and renowned DJ headliners.",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
                year: "2024"
              },
              {
                id: 3,
                title: "Ibiza Beach Club Residency",
                category: "Branded Event",
                description: "12-week summer residency program establishing musical identity with international resident DJs and weekly guest artists.",
                image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F17684337357742afb707e08b753b79a6?format=webp&width=600",
                year: "2024"
              },
              {
                id: 4,
                title: "Tech Summit Barcelona",
                category: "Corporate Event",
                description: "3-day conference for 800 attendees with multi-stage production, live streaming, and networking event entertainment.",
                image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F9afd44c5e1a04e579d39e7df6550c44b?format=webp&width=600",
                year: "2024"
              },
              {
                id: 5,
                title: "Luxury Hotel Opening Gala",
                category: "Branded Event",
                description: "Grand opening celebration with orchestrated entertainment program, celebrity performances, and VIP guest experience.",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
                year: "2023"
              },
              {
                id: 6,
                title: "Anniversary Celebration Mallorca",
                category: "Private Event",
                description: "50th anniversary party for 80 guests featuring live band, custom playlist curation, and sophisticated ambient lighting.",
                image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F734d471b810b46e5a0c6ff36e366d530?format=webp&width=600",
                year: "2023"
              }
            ].map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="bg-gradient-to-br from-slate-800/90 via-gray-800/70 to-slate-900/90 border-2 backdrop-blur-sm transition-all duration-500 hover:scale-105 overflow-hidden shadow-2xl rounded-2xl h-full flex flex-col" style={{borderColor: '#6efff8', boxShadow: '0 25px 50px -12px rgba(110, 255, 248, 0.2)'}}>

                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#6efff8]/20 text-white border border-[#6efff8]/50 backdrop-blur-sm">
                        {isEs ? (
                          project.category === 'Private Event' ? 'Evento privado' :
                          project.category === 'Corporate Event' ? 'Evento corporativo' :
                          project.category === 'Branded Event' ? 'Evento de marca' : project.category
                        ) : project.category}
                      </Badge>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/50 text-white border border-white/20 backdrop-blur-sm">
                        {project.year}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-3 transition-colors" style={{color: '#6efff8'}}>
                        {isEs ? (
                          project.id === 1 ? 'Boda privada en villa de Marbella' :
                          project.id === 2 ? 'Evento de lanzamiento de Mercedes‑Benz' :
                          project.id === 3 ? 'Residencia en beach club de Ibiza' :
                          project.id === 4 ? 'Cumbre tecnológica de Barcelona' :
                          project.id === 5 ? 'Gala de apertura de hotel de lujo' :
                          project.id === 6 ? 'Celebración de aniversario en Mallorca' : project.title
                        ) : project.title}
                      </h3>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {isEs ? (
                          project.id === 1 ? 'Celebración íntima para 120 invitados con diseño de iluminación a medida, conjunto de jazz curado y transición musical fluida de día a noche.' :
                          project.id === 2 ? 'Activaci��n de marca para 300 invitados VIP con producción A/V dinámica, paisaje sonoro a medida y DJs headliners de renombre.' :
                          project.id === 3 ? 'Residencia de verano de 12 semanas que establece identidad musical con DJs residentes internacionales y artistas invitados semanales.' :
                          project.id === 4 ? 'Conferencia de 3 días para 800 asistentes con producción en múltiples escenarios, streaming en vivo y entretenimiento para el networking.' :
                          project.id === 5 ? 'Gala de inauguración con programa de entretenimiento orquestado, actuaciones de celebridades y experiencia VIP.' :
                          project.id === 6 ? 'Fiesta de 50 aniversario para 80 invitados con banda en vivo, curación de playlists personalizadas e iluminación ambiental sofisticada.' : project.description
                        ) : project.description}
                      </p>
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#6efff8]/20 mt-auto">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {isEs ? 'Caso de estudio' : 'Case Study'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#6efff8] hover:bg-[#6efff8]/10 p-0 h-auto"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {(isEs ? [
              { number: "150+", label: "Eventos realizados" },
              { number: "50K+", label: "Invitados atendidos" },
              { number: "25+", label: "Locales asociados" },
              { number: "98%", label: "Satisfacción del cliente" }
            ] : [
              { number: "150+", label: "Events Delivered" },
              { number: "50K+", label: "Guests Entertained" },
              { number: "25+", label: "Venues Partnered" },
              { number: "98%", label: "Client Satisfaction" }
            ]).map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-[#6efff8]/10"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{color: '#6efff8'}}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#6efff8]/30 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{color: '#6efff8'}}>
                {isEs ? '¿Listo para crear tu próximo evento inolvidable?' : 'Ready to Create Your Next Unforgettable Event?'}
              </h3>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                {isEs ? 'Únete a nuestro portafolio de eventos exitosos. Hablemos de cómo RANDOBA puede dar vida a tu visión con la misma atención al detalle y excelencia creativa.' : "Join our portfolio of successful events. Let's discuss how RANDOBA can bring your vision to life with the same attention to detail and creative excellence."}
              </p>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-transparent border-2 font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl"
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
                  onClick={() => openContactModal('project', isEs ? 'Empieza tu proyecto' : 'Start Your Project', isEs ? 'Cuéntanos sobre tu evento y recibe un presupuesto personalizado' : 'Tell us about your event and get a custom quote')}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" style={{color: '#6efff8'}} />
                  {isEs ? 'Empieza tu proyecto' : 'Start Your Project'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={closeContactModal}
        title={contactModal.title}
        description={contactModal.description}
        preset={contactModal.preset}
      />
    </div>
  );
}
