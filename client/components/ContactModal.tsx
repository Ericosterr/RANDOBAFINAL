import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  preset?: 'general' | 'project' | 'partner' | 'support';
}

export function ContactModal({ 
  isOpen, 
  onClose, 
  title = "Contact Us",
  description = "Get in touch with our team",
  preset = 'general'
}: ContactModalProps) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  // Set default service type based on preset
  const getDefaultServiceType = () => {
    if (isEs) {
      switch (preset) {
        case 'project':
          return 'Producción de eventos';
        case 'partner':
          return 'Agencia de artistas';
        case 'support':
          return 'Soporte técnico';
        default:
          return '';
      }
    }
    switch (preset) {
      case 'project':
        return 'Events Production';
      case 'partner':
        return 'Artist Agency';
      case 'support':
        return 'Technical Support';
      default:
        return '';
    }
  };

  // Set default message based on preset
  const getDefaultMessage = () => {
    if (isEs) {
      switch (preset) {
        case 'project':
          return 'Me gustaría comentar mi próximo evento y recibir un presupuesto para vuestros servicios de producción.';
        case 'partner':
          return 'Estoy interesado en colaborar con RANDOBA. Por favor, enviadme más información sobre oportunidades de colaboración.';
        case 'support':
          return 'Necesito soporte técnico para mi equipo/servicios.';
        default:
          return '';
      }
    }
    switch (preset) {
      case 'project':
        return 'I would like to discuss my upcoming event and get a quote for your production services.';
      case 'partner':
        return 'I am interested in partnering with RANDOBA. Please tell me more about your collaboration opportunities.';
      case 'support':
        return 'I need technical support for my equipment/services.';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !(formData.message || getDefaultMessage())) {
      toast.error(isEs ? 'Por favor, completa todos los campos obligatorios' : 'Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const service = formData.serviceType || getDefaultServiceType();
      const subjectMap: Record<string, string> = isEs ? {
        project: 'Solicitud de producción de eventos',
        partner: 'Solicitud de colaboración',
        support: 'Solicitud de soporte',
        general: 'Contacto web',
      } : {
        project: 'Events Production Inquiry',
        partner: 'Partnership Inquiry',
        support: 'Support Request',
        general: 'Website Contact',
      };
      const subject = subjectMap[preset] || (isEs ? 'Contacto web' : 'Website Contact');
      const messageLabel = isEs ? 'Servicio' : 'Service';
      const message = `${messageLabel}: ${service || 'N/A'}\n${formData.message || getDefaultMessage()}`;

      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject,
          message,
          source: `events-${preset}`,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }

      toast.success(isEs ? '¡Gracias! Tu mensaje se ha enviado correctamente.' : 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(isEs ? 'Lo sentimos, hubo un error al enviar tu mensaje. Inténtalo de nuevo.' : 'Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = isEs ? [
    'Servicios de DJ',
    'Producción de eventos', 
    'Agencia de artistas',
    'Marca y contenido de producción',
    'Soporte técnico',
    'Marketing digital',
    'Cursos de DJ',
    'Alquiler de equipos',
    'Otro'
  ] : [
    'DJ Services',
    'Events Production', 
    'Artist Agency',
    'Production Brand and Content',
    'Technical Support',
    'Digital Marketing',
    'DJ Courses',
    'Equipment Rental',
    'Other'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              {isEs ? 'Nombre *' : 'Name *'}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-[#6efff8]"
              placeholder={isEs ? 'Tu nombre completo' : 'Your full name'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              {isEs ? 'Email *' : 'Email *'}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-[#6efff8]"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              {isEs ? 'Teléfono' : 'Phone'}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-[#6efff8]"
              placeholder={isEs ? '+34 600 000 000' : '(555) 123-4567'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType" className="text-white">
              {isEs ? 'Interés en el servicio' : 'Service Interest'}
            </Label>
            <Select
              value={formData.serviceType || getDefaultServiceType()}
              onValueChange={(value) => handleInputChange('serviceType', value)}
            >
              <SelectTrigger className="bg-white/5 border-gray-600 text-white focus:border-[#6efff8]">
                <SelectValue placeholder={isEs ? 'Selecciona un servicio' : 'Select a service'} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {serviceOptions.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="text-white hover:bg-gray-700 focus:bg-gray-700"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              {isEs ? 'Mensaje *' : 'Message *'}
            </Label>
            <Textarea
              id="message"
              value={formData.message || getDefaultMessage()}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-[#6efff8] min-h-[100px]"
              placeholder={isEs ? 'Cuéntanos sobre tu proyecto o cómo podemos ayudarte...' : 'Tell us about your project or how we can help...'}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#6efff8] text-black hover:bg-[#6efff8]/90 font-medium"
              disabled={isSubmitting}
            >
              {isEs ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#6efff8] text-black hover:bg-[#6efff8]/90 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEs ? 'Enviando...' : 'Sending...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {isEs ? 'Enviar mensaje' : 'Send Message'}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
