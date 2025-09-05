import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, User, Mail, Phone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface JoinRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinRosterModal({ isOpen, onClose }: JoinRosterModalProps) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const subject = isEs ? 'Solicitud para unirse al roster' : 'Join Our Roster Application';
      const message = `${isEs ? 'Solicitud de' : 'Application from'}: ${formData.name}\n${isEs ? 'Teléfono' : 'Phone'}: ${formData.phone}`;
      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject,
          message,
          source: 'agency-join-roster',
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }
      setIsSubmitting(false);
      onClose();
      setFormData({ name: '', email: '', phone: '' });
      alert(isEs ? '¡Gracias! Nos pondremos en contacto contigo pronto.' : "Thank you! We'll contact you soon.");
    } catch (err) {
      setIsSubmitting(false);
      alert(isEs ? 'El envío ha fallado. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg"></div>
        <div className="relative">
          <DialogHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-[#6efff8] to-cyan-400 rounded-full shadow-lg">
              <User className="w-8 h-8 text-gray-900" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#6efff8] to-cyan-400 bg-clip-text text-transparent">
              {isEs ? 'Únete a nuestro roster' : 'Join Our Roster'}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 text-base leading-relaxed">
              {isEs ? '¿Listo para llevar tu carrera al siguiente nivel? Completa este formulario y te contactaremos con oportunidades acordes a tu talento.' : `Ready to take your career to the next level? Fill out this form and we'll get back to you with opportunities that match your talent.`}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#6efff8]" />
                  {isEs ? 'Nombre completo' : 'Full Name'}
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/20 h-12"
                  placeholder={isEs ? 'Introduce tu nombre completo' : 'Enter your full name'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6efff8]" />
                  {isEs ? 'Correo electrónico' : 'Email Address'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/20 h-12"
                  placeholder={isEs ? 'Introduce tu correo electrónico' : 'Enter your email address'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6efff8]" />
                  {isEs ? 'Teléfono' : 'Phone Number'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#6efff8] focus:ring-[#6efff8]/20 h-12"
                  placeholder={isEs ? 'Introduce tu número de teléfono' : 'Enter your phone number'}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-12"
                disabled={isSubmitting}
              >
                {isEs ? 'Cancelar' : 'Cancel'}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#6efff8] to-cyan-400 text-gray-900 hover:from-[#5de8db] hover:to-cyan-500 font-semibold shadow-lg shadow-[#6efff8]/25 h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                    {isEs ? 'Enviando...' : 'Submitting...'}
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {isEs ? 'Enviar solicitud' : 'Submit Application'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
