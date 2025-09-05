import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  Send,
  User,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();
  const isEs = language === "es";

  const t = isEs
    ? {
        badge: "Ponte en contacto",
        heroTitlePrefix: "Contacto",
        heroSubtext:
          "¿Listo para elevar tu trayectoria musical? Ponte en contacto con nuestro equipo para reservas, cursos o cualquier pregunta sobre nuestros servicios.",
        sendMessageTitle: "Envíanos un mensaje",
        formIntro: "Rellena el siguiente formulario y te responderemos lo antes posible.",
        labels: {
          name: "Nombre *",
          email: "Correo electrónico *",
          subject: "Asunto *",
          message: "Mensaje *",
        },
        placeholders: {
          name: "Tu nombre completo",
          email: "tu@correo.com",
          subject: "¿De qué se trata?",
          message: "Cuéntanos más sobre cómo podemos ayudarte...",
        },
        sendButton: "Enviar mensaje",
        findUsTitle: "Encuéntranos aquí",
        socialTitle: "Conéctate con nosotros",
        socialSubtext:
          "Síguenos en las redes sociales para las últimas novedades, contenido entre bastidores y anuncios exclusivos.",
      }
    : {
        badge: "Get in Touch",
        heroTitlePrefix: "Contact",
        heroSubtext:
          "Ready to elevate your music journey? Get in touch with our team for bookings, courses, or any questions about our services.",
        sendMessageTitle: "Send us a Message",
        formIntro: "Fill out the form below and we'll get back to you as soon as possible.",
        labels: {
          name: "Name *",
          email: "Email *",
          subject: "Subject *",
          message: "Message *",
        },
        placeholders: {
          name: "Your full name",
          email: "your@email.com",
          subject: "What's this about?",
          message: "Tell us more about how we can help you...",
        },
        sendButton: "Send Message",
        findUsTitle: "Find Us Here",
        socialTitle: "Connect with Us",
        socialSubtext:
          "Follow us on social media for the latest updates, behind-the-scenes content, and exclusive announcements.",
      };

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.7!2d-5.1463!3d36.4273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dbf4b8b6b4b7b%3A0x4b7b8b6b4b8b6b4b!2sAv.%20la%20Uni%C3%B3n%2C%2048%2C%2029680%20Estepona%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1706123456789!5m2!1sen!2sus&hl=${isEs ? 'es' : 'en'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert(isEs ? 'Por favor, completa todos los campos obligatorios' : 'Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          source: 'contact-page',
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        const message = (data as any)?.error?.message || 'Request failed';
        throw new Error(message);
      }
      alert(isEs ? '¡Gracias! Tu mensaje se ha enviado correctamente.' : 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      const msg = err?.message || (isEs ? 'Error al enviar el formulario' : 'Failed to submit form');
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom phone icon component
  const PhoneIcon = ({ className }: { className?: string }) => (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F431cca64f4d4440fa6b1b177c56d8d88?format=webp&width=800"
      alt="Phone"
      className={className}
    />
  );

  // Custom email icon component
  const EmailIcon = ({ className }: { className?: string }) => (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F8cc3865e9b7741e6a1310e998b64a0f3?format=webp&width=800"
      alt="Email"
      className={className}
    />
  );

  // Custom location icon component
  const LocationIcon = ({ className }: { className?: string }) => (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2Fa9d4f8ba8fc24c48990f24c388560485?format=webp&width=800"
      alt="Location"
      className={className}
    />
  );

  // Custom clock icon component
  const ClockIcon = ({ className }: { className?: string }) => (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F3c0be3d7338b40d8a944716d2701acb0?format=webp&width=800"
      alt="Clock"
      className={className}
    />
  );

  // Custom find us icon component for Find Us Here section
  const FindUsIcon = ({ className }: { className?: string }) => (
    <img
      src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2Fad264a3150244f75bc9a052884f4a134?format=webp&width=800"
      alt="Find Us"
      className={className}
    />
  );

  const contactInfo = isEs
    ? [
        {
          icon: PhoneIcon,
          title: "Teléfono",
          details: ["+34 638 47 83 51"],
          color: "text-green-400",
        },
        {
          icon: EmailIcon,
          title: "Correo electrónico",
          details: ["info@randoba.es", "agensy@randoba.es"],
          color: "text-blue-400",
        },
        {
          icon: LocationIcon,
          title: "Ubicación",
          details: ["Av. la Unión, 48", "29680 Estepona, Málaga"],
          color: "text-purple-400",
        },
        {
          icon: ClockIcon,
          title: "Horario de atención",
          details: ["Lun - Vie: 9:00 - 20:00", "Sáb - Dom: 10:00 - 18:00"],
          color: "text-orange-400",
        },
      ]
    : [
        {
          icon: PhoneIcon,
          title: "Phone",
          details: ["+34 638 47 83 51"],
          color: "text-green-400",
        },
        {
          icon: EmailIcon,
          title: "Email",
          details: ["info@randoba.es", "agensy@randoba.es"],
          color: "text-blue-400",
        },
        {
          icon: LocationIcon,
          title: "Location",
          details: ["Av. la Unión, 48", "29680 Estepona, Málaga"],
          color: "text-purple-400",
        },
        {
          icon: ClockIcon,
          title: "Business Hours",
          details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
          color: "text-orange-400",
        },
      ];


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Animated Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, #0a0a0a, #1a1a2e, #16213e, #0f3460, #1a1a2e, #0a0a0a)',
          backgroundSize: '400% 400%',
          animation: 'animatedGradient 12s ease infinite'
        }}
      />

      {/* Glowing accent gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, #6efff8 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'animatedGradient 15s ease infinite reverse'
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #6efff8 0%, #6efff820 40%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite',
            filter: 'blur(2px)'
          }}
        />
        <div
          className="absolute bottom-32 right-32 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #6efff8 0%, #6efff815 50%, transparent 80%)',
            animation: 'float 12s ease-in-out infinite reverse, pulse 6s ease-in-out infinite',
            filter: 'blur(3px)'
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, #6efff8 0%, #6efff810 60%, transparent 90%)',
            animation: 'float 15s ease-in-out infinite, pulse 8s ease-in-out infinite reverse',
            filter: 'blur(1px)'
          }}
        />

        {/* Additional small glowing particles */}
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #6efff8 0%, transparent 50%)',
            animation: 'float 20s linear infinite, pulse 3s ease-in-out infinite',
            filter: 'blur(1px)'
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-12"
          style={{
            background: 'radial-gradient(circle, #6efff8 0%, transparent 60%)',
            animation: 'float 25s linear infinite reverse, pulse 5s ease-in-out infinite',
            filter: 'blur(2px)'
          }}
        />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#6efff8 1px, transparent 1px),
            linear-gradient(90deg, #6efff8 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 30s linear infinite'
        }}
      />

      {/* Scanning light effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #6efff8 50%, transparent 100%)',
          width: '200%',
          animation: 'scan 8s ease-in-out infinite',
          filter: 'blur(1px)'
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 mb-6">
              <Phone className="w-3 h-3 mr-1" />
              {t.badge}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              {t.heroTitlePrefix}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(-45deg, #6efff8, #4dd4db, #6efff8, #8ffffc, #6efff8)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'animatedGradient 3s ease infinite'
                }}
              >
                RANDOBA
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.heroSubtext}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="pt-8 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center`}>
                    <info.icon className={`w-6 h-6 ${info.color}`} />
                  </div>
                  <CardTitle className="text-white text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-300 text-sm mb-1">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-2">
                    {t.sendMessageTitle}
                  </CardTitle>
                  <p className="text-gray-300">
                    {t.formIntro}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-white">
                          {t.labels.name}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50"
                            placeholder={t.placeholders.name}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-white">
                          {t.labels.email}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50"
                            placeholder={t.placeholders.email}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">
                        {t.labels.subject}
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50"
                        placeholder={t.placeholders.subject}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">
                        {t.labels.message}
                      </label>
                      <Textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 resize-none"
                        placeholder={t.placeholders.message}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white/10 border-2 border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? (isEs ? 'Enviando...' : 'Sending...') : t.sendButton}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Google Map and Departments */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <Card className="border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <FindUsIcon className="w-5 h-5 mr-2" />
                    {t.findUsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-lg"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t.socialTitle}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.socialSubtext}
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <a
                href="https://www.instagram.com/randoba_marbella/?igsh=MWhwdTZyc212a3lkeg%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 border rounded-lg text-[#6efff8] border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2Feed11226c9be49cdb0d88b46d9592dc0?format=webp&width=800"
                  alt="Instagram"
                  className="w-5 h-5"
                />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com/@randoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 border rounded-lg text-[#6efff8] border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2F968256287e064d1294af0815eac554e0?format=webp&width=800"
                  alt="YouTube"
                  className="w-5 h-5"
                />
                <span>YouTube</span>
              </a>
              <a
                href="https://soundcloud.com/randoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 border rounded-lg text-[#6efff8] border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2Fed0b6ee1d56041088f525e7713d9b61b?format=webp&width=800"
                  alt="SoundCloud"
                  className="w-5 h-5"
                />
                <span>SoundCloud</span>
              </a>
              <a
                href="https://open.spotify.com/user/randoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 border rounded-lg text-[#6efff8] border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F5460e2b2ea964d06827cfa98f9ab3b14?format=webp&width=800"
                  alt="Spotify"
                  className="w-5 h-5"
                />
                <span>Spotify</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-6 py-3 border rounded-lg text-[#6efff8] border-[#6efff8] bg-[#6efff8]/10 hover:bg-[#6efff8]/20 transition-all"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F58585e88ea1d4805a0649bff6b01325c%2F291f2722a5154a03baea33489fbce2b0?format=webp&width=800"
                  alt="TikTok"
                  className="w-5 h-5"
                />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      </div> {/* Close content wrapper */}
    </div>
  );
}
