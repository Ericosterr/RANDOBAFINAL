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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Headphones,
  Star,
  Music,
  Award,
  PlayCircle,
  CheckCircle,
  Send,
  Globe,
  TrendingUp,
  Zap,
  ArrowRight,
  ShoppingCart,
  Clock,
  Shield,
  Volume2,
  Mic,
  Radio,
  Settings,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  DollarSign,
  Package,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [rentalModalOpen, setRentalModalOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    phone: "",
    equipmentPackage: "",
  });
  const [rentalFormData, setRentalFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPackage: "",
  });

  const { language } = useLanguage();
  const isEs = language === "es";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const subject = `Support Contact: ${formData.serviceType || 'General'}`;
      const message = `Service: ${formData.serviceType || 'N/A'}\n${formData.message}`;
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject,
          message,
          source: 'support-bottom-form',
        }),
      });

      if (!resp.ok) throw new Error('Request failed');

      alert(isEs ? '¡Gracias! Tu mensaje se ha enviado correctamente.' : 'Thank you! Your message has been sent successfully.');
      setFormData({ name: "", email: "", phone: "", serviceType: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(isEs ? 'Lo sentimos, hubo un error al enviar tu mensaje. Inténtalo de nuevo.' : 'Sorry, there was an error sending your message. Please try again.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const subject = 'Contact Us (Equipment / Support)';
      const message = `Equipment Package: ${contactFormData.equipmentPackage || 'N/A'}`;
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactFormData.name,
          email: '',
          phone: contactFormData.phone,
          subject,
          message,
          source: 'support-hero-contact',
        }),
      });

      if (!resp.ok) throw new Error('Request failed');

      alert(isEs ? '¡Gracias! Te contactaremos en breve sobre tus necesidades de equipo.' : 'Thank you! We will contact you shortly about your equipment needs.');
      setContactModalOpen(false);
      setContactFormData({ name: "", phone: "", equipmentPackage: "" });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert(isEs ? 'Lo sentimos, hubo un error al enviar tu mensaje. Inténtalo de nuevo.' : 'Sorry, there was an error sending your message. Please try again.');
    }
  };

  const handleRentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const subject = `Equipment Rental: ${rentalFormData.selectedPackage || 'Package'}`;
      const message = `Requested Pack: ${rentalFormData.selectedPackage || 'N/A'}`;
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rentalFormData.name,
          email: rentalFormData.email,
          phone: rentalFormData.phone,
          subject,
          message,
          source: 'support-rental-pack',
        }),
      });

      if (!resp.ok) throw new Error('Request failed');

      alert(isEs ? '¡Gracias! Tu solicitud de alquiler ha sido enviada. Te contactaremos en breve para confirmar los detalles.' : 'Thank you! Your rental request has been submitted. We will contact you shortly to confirm details.');
      setRentalModalOpen(false);
      setRentalFormData({ name: "", email: "", phone: "", selectedPackage: "" });
    } catch (error) {
      console.error('Error submitting rental form:', error);
      alert('Sorry, there was an error sending your rental request. Please try again.');
    }
  };

  const equipment = [
    {
      id: "cdj-3000",
      name: "Pioneer CDJ-3000",
      category: "DJ Players",
      price: 150,
      period: "per day",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Professional DJ media player with advanced features and pristine sound quality.",
      features: ["9-inch Touch Screen", "Master Quality Audio", "Wi-Fi Connectivity", "Cloud Library Access"],
      specs: { power: "37W", dimensions: "31.9 × 41.0 × 10.5 cm", weight: "4.6 kg" }
    },
    {
      id: "djm-900",
      name: "Pioneer DJM-900NXS2",
      category: "DJ Mixers",
      price: 120,
      period: "per day",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Industry-standard 4-channel DJ mixer with superior sound and professional effects.",
      features: ["4-Channel Mixer", "Sound Color FX", "Beat FX", "USB Recording"],
      specs: { power: "41W", dimensions: "42.6 × 45.9 × 10.8 cm", weight: "5.7 kg" }
    },
    {
      id: "technics-1200",
      name: "Technics SL-1200MK7",
      category: "Turntables",
      price: 80,
      period: "per day",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      description: "Legendary direct-drive turntable reimagined for the digital age.",
      features: ["Direct Drive Motor", "High Torque", "Reverse Play", "LED Needle Light"],
      specs: { power: "16W", dimensions: "45.0 × 36.2 × 17.1 cm", weight: "9.6 kg" }
    },
    {
      id: "rcf-hdl20",
      name: "RCF HDL 20-A",
      category: "PA Systems",
      price: 200,
      period: "per day",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
      description: "Professional line array speaker system for high-quality sound reinforcement.",
      features: ["Active Line Array", "1400W Peak Power", "DSP Processing", "Weather Resistant"],
      specs: { power: "1400W", dimensions: "69.5 �� 28.0 × 45.6 cm", weight: "32 kg" }
    },
    {
      id: "shure-sm58",
      name: "Shure SM58",
      category: "Microphones",
      price: 25,
      period: "per day",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "World's most popular vocal microphone, legendary for its durability and sound.",
      features: ["Cardioid Pattern", "Shock Mount", "Built-in Filter", "Rugged Construction"],
      specs: { frequency: "50-15,000 Hz", dimensions: "16.2 �� 5.4 cm", weight: "298 g" }
    },
    {
      id: "lighting-pack",
      name: "LED Par Light Set",
      category: "Lighting",
      price: 100,
      period: "per day",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      description: "Professional LED par lights with RGB color mixing and DMX control.",
      features: ["RGB Color Mixing", "DMX Control", "Sound Activation", "Remote Control"],
      specs: { power: "60W each", leds: "36 × 3W LEDs", beam: "25°", weight: "2.1 kg each" }
    },
    {
      id: "dj-controller",
      name: "Native Instruments S4 MK3",
      category: "Controllers",
      price: 90,
      period: "per day",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Professional 4-deck DJ controller with premium build quality and Traktor integration.",
      features: ["4-Deck Control", "Traktor Pro 3", "RGB Performance Pads", "Premium Jog Wheels"],
      specs: { power: "USB Bus Power", dimensions: "48.5 × 32.0 × 6.0 cm", weight: "3.9 kg" }
    },
    {
      id: "monitoring",
      name: "KRK Rokit 8 G4",
      category: "Monitors",
      price: 60,
      period: "per day",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
      description: "Professional studio monitors with exceptional clarity and powerful low-end.",
      features: ["8-inch Woofer", "DSP-driven EQ", "Room Tuning", "Multiple Inputs"],
      specs: { power: "203W", frequency: "35Hz-40kHz", dimensions: "42.9 × 28.4 × 34.7 cm" }
    }
  ];

  const equipmentPacks = [
    {
      id: "starter-dj",
      name: "Turnkey DJ Setup Rental",
      price: 280,
      period: "per day",
      originalPrice: 340,
      description: "Flagship Pioneer rig with rock-solid sound and balanced lighting. We handle delivery and on-site setup. You play - we'll make sure it sounds flawless.",
      equipment: ["Pioneer DJ (CDJ-3000, XDJ-AZ, DJM V10, A9)", "Sound & lighting", "Technician available on request", "Flexible rentals: by the day, night, or hour"],
      features: ["Setup Included", "Basic Lighting", "Technical Support", "Insurance Covered"],
      image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2Ff6dbea8c89cf4f22b84e8802558d6040?format=webp&width=800",
      popular: false
    },
    {
      id: "professional-setup",
      name: "Sound & Lighting for Events",
      price: 450,
      period: "per day",
      originalPrice: 580,
      description: "A balanced mix of clean sound and expressive lighting tailored to your format and run-of-show. Any scale - from intimate house parties to full festivals.",
      equipment: ["Lighting design", "PA for 20 to 500+ guests", "Delivery, installation, teardown", "Lighting/sound engineer (optional)"],
      features: ["Professional Setup", "Advanced Lighting", "Full Technical Support", "Backup Equipment"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      popular: true
    },
    {
      id: "festival-grade",
      name: "Dedicated DJ Package",
      price: 800,
      period: "per day",
      originalPrice: 1100,
      description: "Everything you need for a confident, seamless set: a reliable DJ system, accurate monitor speakers, and fast setup. Demo before booking, plus delivery and hookup.",
      equipment: ["DJ system (CDJ-3000 + DJM V10, A9, Opus, AZ)", "Monitor speakers", "Pre-booking demo available", "Delivery & setup"],
      features: ["Festival Setup Team", "24/7 Technical Support", "Backup Systems", "Insurance & Security"],
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
      popular: false
    },
    {
      id: "mobile-dj",
      name: "Club / Bar / Late-Night Party",
      price: 320,
      period: "per day",
      originalPrice: 420,
      description: "Club package for bars and late-night parties: punchy dance-floor sound, dynamic lighting, and a ready-to-play DJ setup. Professional level, fully rider-compliant.",
      equipment: ["DJ setup: Pioneer CDJ-3000 + DJM-A9 / V10", "Professional subwoofers and tops", "Lighting, DJ monitor speakers", "Microphones", "Installation and sound/lighting check"],
      features: ["Portable Setup", "Quick Assembly", "Transport Cases", "Mobile Support"],
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
      popular: false
    },
    {
      id: "corporate-event",
      name: "Open-Air / Beach / Rooftop",
      price: 380,
      period: "per day",
      originalPrice: 480,
      description: "Powerful long-throw sound and professional execution with rider compliance and permits handled. A scalable sound and lighting solution for the outdoors.",
      equipment: ["Line array or high-output active speakers", "Weather-resistant equipment", "Generator (if there's no on-site power)", "Club-grade DJ setup", "Lighting on request (open-air lighting design)"],
      features: ["Corporate Setup", "Presentation Audio", "Wireless Systems", "Professional Support"],
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
      popular: false
    },
    {
      id: "wedding-premium",
      name: "Retreat / Wellness / Tantra / Yoga",
      price: 520,
      period: "per day",
      originalPrice: 680,
      description: "Delicate sound for ambient, deep, and ceremonial music. Calm audio, soft lighting, and warm vocals to create a therapeutic space without technical stress.",
      equipment: ["PA system", "Ambient lighting: candles, soft warm light", "Host microphone", "Off-grid option available", "From €450"],
      features: ["Wedding Ceremony Setup", "Reception Audio", "Romantic Lighting", "Dedicated Coordinator"],
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
      popular: false
    }
  ];

  const supportServices = [
    {
      title: "Audit",
      description: "Site assessment. Briefing - goals, format, schedule, budget. Technical concept development.",
      icon: Settings,
    },
    {
      title: "Design & Calculations",
      description: "Sound system modeling for your specific space. Lighting design, brand integration. Power infrastructure planning and load calculations.",
      icon: HelpCircle,
    },
    {
      title: "Service",
      description: "Logistics, delivery, setup, soundcheck, on-site coordination, teardown. Firm timelines and transparent quoting.",
      icon: Phone,
    },
    {
      title: "Safety",
      description: "Backups for critical components, weather protection, certified equipment, standalone power and generators.",
      icon: Wrench,
    },
    {
      title: "Turnkey events",
      description: "Concept, venue sourcing, technical production, scheduling, catering, logistics, coordination.",
      icon: Zap,
    },
    {
      title: "Fast booking",
      description: "Submit a request on the website - we'll propose custom options tailored to your run-of-show and budget.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black -mt-16 pt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F04a79369a30d4d69bd5ac30aac5e71b7%2F3290132036ff4009b9e0220b3eede625?format=webp&width=800"
            alt="Technical Support Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50"></div>
        </div>

        {/* Disco Ball Animated Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <style>
            {`
              @keyframes disco-1 {
                0% { background: #ff0080; transform: scale(1) rotate(0deg); }
                25% { background: #00d4ff; transform: scale(1.2) rotate(90deg); }
                50% { background: #ff4000; transform: scale(0.8) rotate(180deg); }
                75% { background: #8000ff; transform: scale(1.1) rotate(270deg); }
                100% { background: #ff0080; transform: scale(1) rotate(360deg); }
              }
              @keyframes disco-2 {
                0% { background: #00ff80; transform: scale(0.8) rotate(0deg); }
                25% { background: #ff8000; transform: scale(1.3) rotate(120deg); }
                50% { background: #0080ff; transform: scale(1) rotate(240deg); }
                75% { background: #ff0040; transform: scale(1.2) rotate(300deg); }
                100% { background: #00ff80; transform: scale(0.8) rotate(360deg); }
              }
              @keyframes disco-3 {
                0% { background: #ff4080; transform: scale(1.1) rotate(45deg); }
                30% { background: #40ff80; transform: scale(0.9) rotate(135deg); }
                60% { background: #8040ff; transform: scale(1.4) rotate(225deg); }
                100% { background: #ff4080; transform: scale(1.1) rotate(405deg); }
              }
              @keyframes disco-float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
              @keyframes disco-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.5); }
                25% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.7); }
                50% { box-shadow: 0 0 25px rgba(255, 64, 0, 0.6); }
                75% { box-shadow: 0 0 35px rgba(128, 0, 255, 0.8); }
              }
            `}
          </style>

          {/* Large disco circles */}
          <div
            className="absolute top-20 left-10 w-8 h-8 rounded-full opacity-70"
            style={{
              animation: 'disco-1 3s infinite, disco-float 6s infinite, disco-glow 3s infinite'
            }}
          ></div>
          <div
            className="absolute top-40 right-20 w-12 h-12 rounded-full opacity-60"
            style={{
              animation: 'disco-2 4s infinite reverse, disco-float 8s infinite, disco-glow 4s infinite'
            }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-16 h-16 rounded-full opacity-50"
            style={{
              animation: 'disco-3 5s infinite, disco-float 7s infinite reverse, disco-glow 5s infinite'
            }}
          ></div>
          <div
            className="absolute top-60 right-40 w-6 h-6 rounded-full opacity-80"
            style={{
              animation: 'disco-1 2.5s infinite reverse, disco-float 5s infinite, disco-glow 2.5s infinite'
            }}
          ></div>
          <div
            className="absolute bottom-60 right-60 w-10 h-10 rounded-full opacity-65"
            style={{
              animation: 'disco-2 3.5s infinite, disco-float 9s infinite, disco-glow 3.5s infinite'
            }}
          ></div>

          {/* Medium disco circles */}
          <div
            className="absolute top-32 left-32 w-4 h-4 rounded-full opacity-75"
            style={{
              animation: 'disco-3 2s infinite, disco-float 4s infinite reverse, disco-glow 2s infinite'
            }}
          ></div>
          <div
            className="absolute top-80 right-32 w-6 h-6 rounded-full opacity-55"
            style={{
              animation: 'disco-1 4.5s infinite reverse, disco-float 6s infinite, disco-glow 4.5s infinite'
            }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-8 h-8 rounded-full opacity-70"
            style={{
              animation: 'disco-2 3s infinite reverse, disco-float 5s infinite reverse, disco-glow 3s infinite'
            }}
          ></div>

          {/* Small disco circles */}
          <div
            className="absolute top-96 left-60 w-3 h-3 rounded-full opacity-85"
            style={{
              animation: 'disco-1 1.5s infinite, disco-float 3s infinite, disco-glow 1.5s infinite'
            }}
          ></div>
          <div
            className="absolute top-24 right-60 w-5 h-5 rounded-full opacity-60"
            style={{
              animation: 'disco-3 3.8s infinite reverse, disco-float 7s infinite reverse, disco-glow 3.8s infinite'
            }}
          ></div>
          <div
            className="absolute bottom-80 right-80 w-4 h-4 rounded-full opacity-75"
            style={{
              animation: 'disco-2 2.2s infinite, disco-float 4.5s infinite, disco-glow 2.2s infinite'
            }}
          ></div>
          <div
            className="absolute top-52 left-80 w-7 h-7 rounded-full opacity-50"
            style={{
              animation: 'disco-1 5.5s infinite reverse, disco-float 8s infinite reverse, disco-glow 5.5s infinite'
            }}
          ></div>

          {/* Extra sparkle circles */}
          <div
            className="absolute top-72 right-12 w-2 h-2 rounded-full opacity-90"
            style={{
              animation: 'disco-3 1s infinite, disco-float 2s infinite, disco-glow 1s infinite'
            }}
          ></div>
          <div
            className="absolute bottom-96 left-12 w-3 h-3 rounded-full opacity-80"
            style={{
              animation: 'disco-2 1.8s infinite reverse, disco-float 3.5s infinite reverse, disco-glow 1.8s infinite'
            }}
          ></div>
          <div
            className="absolute top-16 left-96 w-4 h-4 rounded-full opacity-65"
            style={{
              animation: 'disco-1 2.8s infinite, disco-float 5.5s infinite, disco-glow 2.8s infinite'
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 min-h-screen flex items-center z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-8 text-white">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 backdrop-blur-sm">
                  <Headphones className="w-3 h-3 mr-1" />
                  {isEs ? 'Alquiler de equipo profesional y soporte' : 'Professional Equipment Rental & Support'}
                </Badge>

                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="animated-gradient-text">
                      {isEs ? 'Técnico' : 'Technical'}
                    </span>
                    <br />
                    <span className="text-white">{isEs ? 'Centro de soporte' : 'Support Hub'}</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
                    {isEs ? 'RANDOBA es tu socio de producción técnica en España. Sonido impecable, iluminación precisa, equipos DJ de alta gama, logística exacta y soluciones a medida a cualquier escala. Pondremos tu evento a pleno rendimiento.' : "RANDOBA is your technical production partner in Spain. Pristine sound, flawless lighting, high-end DJ setups, precise logistics, and tailored solutions at any scale. We'll get your event running at full power."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 w-auto px-8"
                    onClick={() => document.getElementById('equipment-packages')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Music className="w-5 h-5 mr-2 text-[#6efff8]" />
                    {isEs ? 'Ver equipos' : 'Browse Equipment'}
                  </Button>
                  <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8] font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 w-auto px-8"
                      >
                        <Phone className="w-5 h-5 mr-2 text-[#6efff8]" />
                        {isEs ? 'Contáctanos' : 'Contact Us'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] backdrop-blur-xl border text-white" style={{backgroundColor: '#1a1a1a', borderColor: '#6efff8'}}>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center" style={{color: '#6efff8'}}>
                          {isEs ? 'Ponte en contacto' : 'Get In Touch'}
                        </DialogTitle>
                        <DialogDescription className="text-center" style={{color: '#6efff8', opacity: '0.8'}}>
                          {isEs ? 'Cuéntanos qué paquete de equipo te interesa y te responderemos en breve.' : "Let us know which equipment package interests you and we'll get back to you shortly."}
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleContactSubmit} className="space-y-6 mt-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                              {isEs ? 'Nombre completo *' : 'Full Name *'}
                            </label>
                            <Input
                              required
                              value={contactFormData.name}
                              onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="h-12"
                              style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                              placeholder={isEs ? 'Tu nombre completo' : 'Enter your full name'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                              {isEs ? 'Teléfono *' : 'Phone Number *'}
                            </label>
                            <Input
                              type="tel"
                              required
                              value={contactFormData.phone}
                              onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                              className="h-12"
                              style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                              placeholder={isEs ? '+34 600 000 000' : '+1 (555) 123-4567'}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                              {isEs ? 'Paquete de equipo *' : 'Equipment Package *'}
                            </label>
                            <Select
                              value={contactFormData.equipmentPackage}
                              onValueChange={(value) => setContactFormData(prev => ({ ...prev, equipmentPackage: value }))}
                              required
                            >
                              <SelectTrigger className="h-12" style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}>
                                <SelectValue placeholder={isEs ? 'Elige un paquete de equipo' : 'Choose an equipment package'} style={{color: '#6efff8', opacity: '0.7'}} />
                              </SelectTrigger>
                              <SelectContent style={{backgroundColor: '#1a1a1a', borderColor: '#6efff8'}}>
                                <SelectItem value="turnkey-dj" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Alquiler DJ llave en mano' : 'Turnkey DJ Setup Rental'}</SelectItem>
                                <SelectItem value="sound-lighting" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Sonido e iluminación para eventos' : 'Sound & Lighting for Events'}</SelectItem>
                                <SelectItem value="dedicated-dj" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Paquete DJ dedicado' : 'Dedicated DJ Package'}</SelectItem>
                                <SelectItem value="club-bar" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Club / Bar / Fiesta nocturna' : 'Club / Bar / Late-Night Party'}</SelectItem>
                                <SelectItem value="open-air" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Aire libre / Playa / Azotea' : 'Open-Air / Beach / Rooftop'}</SelectItem>
                                <SelectItem value="retreat-wellness" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Retiro / Wellness / Tantra / Yoga' : 'Retreat / Wellness / Tantra / Yoga'}</SelectItem>
                                <SelectItem value="custom" style={{color: '#6efff8'}} className="hover:bg-[#6efff8]/10">{isEs ? 'Solución a medida' : 'Custom Solution'}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            onClick={() => setContactModalOpen(false)}
                            className="flex-1 h-12 font-semibold transition-all duration-300"
                            style={{backgroundColor: 'transparent', borderColor: '#6efff8', color: '#6efff8', border: '2px solid #6efff8'}}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(110, 255, 248, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {isEs ? 'Cancelar' : 'Cancel'}
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 h-12 font-semibold transition-all duration-300"
                            style={{backgroundColor: '#6efff8', color: 'black', border: '2px solid #6efff8'}}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#6efff8';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#6efff8';
                              e.currentTarget.style.color = 'black';
                            }}
                          >
                            <Send className="w-4 h-4 mr-2" style={{color: 'inherit'}} />
                            {isEs ? 'Enviar mensaje' : 'Send Message'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Rental Modal */}
                <Dialog open={rentalModalOpen} onOpenChange={setRentalModalOpen}>
                  <DialogContent className="sm:max-w-[500px] backdrop-blur-xl border text-white" style={{backgroundColor: '#1a1a1a', borderColor: '#6efff8'}}>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center" style={{color: '#6efff8'}}>
                        {isEs ? 'Alquilar paquete de equipo' : 'Rent Equipment Package'}
                      </DialogTitle>
                      <DialogDescription className="text-center" style={{color: '#6efff8', opacity: '0.8'}}>
                        {isEs ? 'Completa el siguiente formulario para alquilar el paquete de equipo seleccionado.' : 'Fill out the form below to rent your selected equipment package.'}
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleRentalSubmit} className="space-y-6 mt-6">
                      <div className="space-y-4">
                        {/* Selected Package Display */}
                        <div className="bg-[#6efff8]/10 border border-[#6efff8]/30 rounded-lg p-4 mb-6">
                          <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                            {isEs ? 'Paquete seleccionado:' : 'Selected Package:'}
                          </label>
                          <div className="text-lg font-bold" style={{color: '#6efff8'}}>
                            {rentalFormData.selectedPackage}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                            {isEs ? 'Nombre completo *' : 'Full Name *'}
                          </label>
                          <Input
                            required
                            value={rentalFormData.name}
                            onChange={(e) => setRentalFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="h-12"
                            style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                            placeholder={isEs ? 'Tu nombre completo' : 'Enter your full name'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                            {isEs ? 'Correo electrónico *' : 'Email Address *'}
                          </label>
                          <Input
                            type="email"
                            required
                            value={rentalFormData.email}
                            onChange={(e) => setRentalFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="h-12"
                            style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2" style={{color: '#6efff8'}}>
                            {isEs ? 'Teléfono *' : 'Phone Number *'}
                          </label>
                          <Input
                            type="tel"
                            required
                            value={rentalFormData.phone}
                            onChange={(e) => setRentalFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="h-12"
                            style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                            placeholder={isEs ? '+34 600 000 000' : '+1 (555) 123-4567'}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setRentalModalOpen(false)}
                          className="flex-1 h-12 font-semibold transition-all duration-300"
                          style={{backgroundColor: 'transparent', borderColor: '#6efff8', color: '#6efff8', border: '2px solid #6efff8'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(110, 255, 248, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {isEs ? 'Cancelar' : 'Cancel'}
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-12 font-semibold transition-all duration-300"
                          style={{backgroundColor: '#6efff8', color: 'black', border: '2px solid #6efff8'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#6efff8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#6efff8';
                            e.currentTarget.style.color = 'black';
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" style={{color: 'inherit'}} />
                          {isEs ? 'Enviar solicitud de alquiler' : 'Submit Rental Request'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

              </div>

              <div className="relative">
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{isEs ? 'Aspectos destacados del servicio' : 'Service Highlights'}</h3>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { label: isEs ? 'Mejor equipo' : 'Best Equipment', value: '100%' },
                        { label: isEs ? 'Packs especiales de equipo' : 'Special Equipment Packs', value: '6+' },
                        { label: isEs ? 'Soluciones a medida' : 'Custom Solutions', value: '∞' },
                        { label: isEs ? 'Cualquier escala' : 'Any Scale', value: isEs ? 'de 20 a 1.000+ invitados' : 'from 20 to 1,000+ guests' },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="font-bold" style={{color: '#6efff8'}}>{item.value}</span>
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


      {/* Why Choose RANDOBA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-32 left-16 w-8 h-8 border border-blue-400 rotate-45 animate-pulse"></div>
          <div className="absolute top-48 right-24 w-6 h-6 border border-purple-400 rotate-12 animate-bounce"></div>
          <div className="absolute bottom-32 left-32 w-10 h-10 border border-cyan-400 rotate-45 animate-ping"></div>
          <div className="absolute bottom-48 right-16 w-4 h-4 border border-pink-400 rotate-12 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1: Technical Excellence */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="p-6 relative z-10">
                <div className="space-y-5">
                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Escalable' : 'Scalable'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'desde sets íntimos hasta festivales a gran escala' : 'from intimate sets to large-scale festivals'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Un solo proveedor para todo.' : 'Single Vendor For Everything.'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'menor riesgo y plazos fiables' : 'lower risk and reliable deadlines'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Cualquier formato' : 'Any Format'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'interior o exterior, en toda España' : 'indoor or outdoor, across Spain'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Complete Support */}
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardContent className="p-6 relative z-10">
                <div className="space-y-5">
                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Sin sorpresas' : 'No Surprises'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'estrictamente según briefing/rider técnico' : 'strictly by brief/tech rider'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Montaje rápido, desmontaje cuidadoso' : 'Fast Setup, Careful Load-Out'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'logística precisa y soporte completo el día del evento' : 'precise logistics and full day-of support'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group/item hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-pink-400/50" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">{isEs ? 'Precios transparentes' : 'Transparent Pricing'}</h4>
                      <p className="text-gray-400 leading-relaxed">{isEs ? 'condiciones claras' : 'clear terms'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Equipment Packs Section */}
      <section id="equipment-packages" className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#6efff8'}}>
              {isEs ? 'DJ • Concierto • Evento | Packs de equipo profesional para cualquier formato' : 'DJ • Concert • Event | Pro Equipment Packages for Any Format'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {isEs ? '¿Necesitas un gran impacto sin dolores de coordinación? Elige nuestros packs listos para usar — sonido, iluminación y efectos especiales — adaptados a tu formato y aforo. Escalamos y ajustamos todo a tu espacio, concepto y timeline. Seguimos tu briefing y rider técnico, y nos encargamos de la logística, instalación y soporte técnico en el lugar.' : 'Need a big impact without the coordination headache? Choose our ready-to-go packages - sound, lighting, and special effects - tailored to your format and guest count. We scale and fine-tune everything to your venue, concept, and timeline. We follow your brief and tech rider, and we handle logistics, installation, and on-site engineering support.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {equipmentPacks.map((pack, index) => (
              <Card
                key={pack.id}
                className={`bg-gray-900/90 backdrop-blur-xl border-[#6efff8]/20 overflow-hidden group hover:bg-gray-800/90 hover:border-[#6efff8]/40 transition-all duration-500 transform hover:-translate-y-2 shadow-lg shadow-[#6efff8]/10 ${pack.popular ? 'ring-2 ring-[#6efff8] scale-105' : ''} h-full flex flex-col`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {pack.popular && (
                  <div className="bg-[#6efff8] text-black text-center py-2 text-sm font-semibold">
                    {isEs ? 'Más popular' : 'Most Popular'}
                  </div>
                )}
                
                <div className="relative">
                  <img
                    src={pack.image}
                    alt={pack.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{isEs ? ({'starter-dj':'Alquiler DJ llave en mano','professional-setup':'Sonido e iluminación para eventos','festival-grade':'Paquete DJ dedicado','mobile-dj':'Club / Bar / Fiesta nocturna','corporate-event':'Aire libre / Playa / Azotea','wedding-premium':'Retiro / Wellness / Tantra / Yoga'} as Record<string,string>)[pack.id] || pack.name : pack.name}</h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {isEs ? ({'starter-dj':'Equipo insignia de Pioneer con sonido sólido y luz equilibrada. Nos encargamos de la entrega y el montaje in situ. Tú tocas; nosotros nos aseguramos de que suene impecable.','professional-setup':'Mezcla equilibrada de sonido limpio e iluminación expresiva adaptada a tu formato y programa. Cualquier escala: desde fiestas en casa hasta festivales.','festival-grade':'Todo lo necesario para un set seguro y fluido: sistema DJ fiable, monitores precisos y montaje rápido. Demo previa a la reserva, entrega y conexión.','mobile-dj':'Pack club para bares y fiestas nocturnas: sonido contundente en pista, iluminación dinámica y setup de DJ listo para tocar. Nivel profesional, compatible con riders.','corporate-event':'Sonido de largo alcance y ejecución profesional con cumplimiento de rider y permisos. Solución escalable de sonido e iluminación para exterior.','wedding-premium':'Sonido delicado para música ambiental, deep y ceremonial. Audio calmado, iluminación cálida y voces nítidas para un espacio terapéutico sin estrés técnico.'} as Record<string,string>)[pack.id] || pack.description : pack.description}
                  </p>

                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-2">{isEs ? 'Incluye' : 'Included In The Pack'}</h4>
                    <div className="space-y-1">
                      {pack.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3" style={{color: '#6efff8'}} />
                          <span className="text-xs text-gray-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-auto pt-4">
                    <Button
                      className="bg-transparent border-2 border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8] hover:text-black font-semibold transform hover:scale-105 transition-all duration-300 px-8 w-full"
                      onClick={() => {
                        setRentalFormData(prev => ({ ...prev, selectedPackage: pack.name }));
                        setRentalModalOpen(true);
                      }}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      {isEs ? 'Alquilar este pack' : 'Rent This Pack'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Support Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#6efff8'}}>
              {isEs ? 'Soluciones a medida a cualquier escala — Un plan, cero estrés' : 'Custom Solutions At Any Scale - One Plan, Zero Stress'}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {isEs ? '¿No encontraste el pack adecuado? Creamos un setup a medida según tu programa. Trabajamos en toda España: ciudades, playas, azoteas, montaña, bodegas y villas privadas.' : "Didn't find the right package? We'll build a bespoke setup around your run-of-show. We work across Spain: cities, beaches, rooftops, mountains, wineries, private villas."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {supportServices.map((service, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 group hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{isEs ? ({'Audit':'Auditoría','Design & Calculations':'Diseño y cálculos','Service':'Servicio','Safety':'Seguridad','Turnkey events':'Eventos llave en mano','Fast booking':'Reserva rápida'} as Record<string,string>)[service.title] || service.title : service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {isEs ? ({'Site assessment. Briefing - goals, format, schedule, budget. Technical concept development.':'Evaluación del lugar. Briefing — objetivos, formato, agenda y presupuesto. Desarrollo del concepto técnico.','Sound system modeling for your specific space. Lighting design, brand integration. Power infrastructure planning and load calculations.':'Modelado del sistema de sonido para tu espacio. Diseño de iluminación e integración de marca. Planificación eléctrica y cálculos de carga.','Logistics, delivery, setup, soundcheck, on-site coordination, teardown. Firm timelines and transparent quoting.':'Logística, entrega, montaje, prueba de sonido, coordinación in situ y desmontaje. Plazos firmes y presupuesto transparente.','Backups for critical components, weather protection, certified equipment, standalone power and generators.':'Respaldos para componentes críticos, protección climática, equipo certificado y energía autónoma con generadores.','Concept, venue sourcing, technical production, scheduling, catering, logistics, coordination.':'Concepto, búsqueda de venue, producción técnica, cronograma, catering, logística y coordinación.','Submit a request on the website - we\'ll propose custom options tailored to your run-of-show and budget.':'Envíanos una solicitud — te propondremos opciones a medida según tu programa y presupuesto.'} as Record<string,string>)[service.description] || service.description : service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Support Request Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 p-8 text-white text-center border-b border-white/10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Need Technical Support?</h3>
                <p className="text-lg sm:text-xl opacity-90">
                  Our expert technicians are standing by to help. Get in touch and we'll respond within minutes.
                </p>
              </div>
              
              <CardContent className="p-8 bg-gray-900/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Nombre completo *' : 'Full Name *'}
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
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
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
                        placeholder={isEs ? 'tu@email.com' : 'your@email.com'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Teléfono' : 'Phone Number'}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
                        placeholder={isEs ? '+34 600 000 000' : '+1 (555) 123-4567'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        {isEs ? 'Tipo de servicio *' : 'Service Type *'}
                      </label>
                      <Input
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
                        placeholder={isEs ? 'p. ej., Alquiler de equipo, Soporte técnico' : 'e.g. Equipment Rental, Technical Support'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      {isEs ? 'Mensaje *' : 'Message *'}
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50 resize-none"
                      placeholder={isEs ? 'Describe tus necesidades de soporte técnico, detalles del evento o requisitos de equipo...' : 'Describe your technical support needs, event details, or equipment requirements...'}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-[#6efff8] text-black hover:bg-[#6efff8]/90 font-semibold px-6 sm:px-8 md:px-12 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-[#6efff8]/25"
                    >
                      <Send className="w-5 h-5 mr-2 text-black" />
                      {isEs ? 'Enviar solicitud de soporte' : 'Submit Support Request'}
                      <ArrowRight className="w-5 h-5 ml-2 text-black" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
