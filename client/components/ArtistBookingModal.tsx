import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  CreditCard,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Loader2,
  Music,
  Users,
  DollarSign,
  Sparkles,
  Star,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Building,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useLanguage } from "../contexts/LanguageContext";

interface Artist {
  id: number;
  name: string;
  realName: string;
  genre: string;
  followers: string;
  image: string;
  description: string;
  achievements: string[];
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

interface ArtistBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
  preSelectedDate?: Date | null;
}

export function ArtistBookingModal({ isOpen, onClose, artist, preSelectedDate }: ArtistBookingModalProps) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [step, setStep] = useState<"details" | "event" | "payment" | "success">("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Set the date when modal opens with a pre-selected date
  React.useEffect(() => {
    if (isOpen && preSelectedDate) {
      setSelectedDate(preSelectedDate);
    }
  }, [isOpen, preSelectedDate]);

  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    eventType: "",
    venue: "",
    city: "",
    country: "",
    expectedAttendees: "",
    budget: "",
    eventDescription: "",
    specialRequests: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const eventTypes = isEs ? [
    "Evento privado",
    "Evento corporativo", 
    "Boda",
    "Noche de club",
    "Festival",
    "Concierto",
    "Lanzamiento de producto",
    "Cumpleaños",
    "Otro"
  ] : [
    "Private Event",
    "Corporate Event", 
    "Wedding",
    "Club Night",
    "Festival",
    "Concert",
    "Product Launch",
    "Birthday Party",
    "Other"
  ];

  const budgetRanges = isEs ? [
    "1.000$ - 5.000$",
    "5.000$ - 10.000$", 
    "10.000$ - 25.000$",
    "25.000$ - 50.000$",
    "50.000$ - 100.000$",
    "100.000$+"
  ] : [
    "$1,000 - $5,000",
    "$5,000 - $10,000", 
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+"
  ];

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.firstName || !bookingDetails.lastName || !bookingDetails.email) {
      toast.error(isEs ? 'Por favor, completa todos los campos obligatorios' : 'Please fill in all required fields');
      return;
    }
    setIsProcessing(true);
    try {
      const subject = `${isEs ? 'Solicitud de reserva de artista' : 'Artist Booking Request'}: ${artist?.name ?? (isEs ? 'Artista desconocido' : 'Unknown Artist')}`;
      const message = [
        `${isEs ? 'Artista' : 'Artist'}: ${artist?.name ?? 'N/A'}`,
        bookingDetails.company ? `${isEs ? 'Empresa' : 'Company'}: ${bookingDetails.company}` : null,
        bookingDetails.website ? `${isEs ? 'Web' : 'Website'}: ${bookingDetails.website}` : null,
        bookingDetails.eventType ? `${isEs ? 'Evento' : 'Event'}: ${bookingDetails.eventType}` : null,
        bookingDetails.venue ? `${isEs ? 'Sala' : 'Venue'}: ${bookingDetails.venue}` : null,
        bookingDetails.city ? `${isEs ? 'Ciudad' : 'City'}: ${bookingDetails.city}` : null,
        bookingDetails.country ? `${isEs ? 'País' : 'Country'}: ${bookingDetails.country}` : null,
        bookingDetails.expectedAttendees ? `${isEs ? 'Asistentes' : 'Attendees'}: ${bookingDetails.expectedAttendees}` : null,
        bookingDetails.budget ? `${isEs ? 'Presupuesto' : 'Budget'}: ${bookingDetails.budget}` : null,
        bookingDetails.eventDescription ? `${isEs ? 'Descripción' : 'Description'}: ${bookingDetails.eventDescription}` : null,
        bookingDetails.specialRequests ? `${isEs ? 'Peticiones especiales' : 'Special Requests'}: ${bookingDetails.specialRequests}` : null,
      ].filter(Boolean).join("\n");

      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${bookingDetails.firstName} ${bookingDetails.lastName}`.trim(),
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          subject,
          message,
          source: 'agency-artist-booking',
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }

      setStep('success');
      toast.success(isEs ? `Solicitud de reserva enviada para ${artist?.name}. Te contactaremos por email.` : `Booking request sent for ${artist?.name}. We'll contact you by email.`);

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      toast.error(isEs ? 'El envío ha fallado. Inténtalo de nuevo.' : 'Submission failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.eventType || !bookingDetails.venue || !selectedDate) {
      toast.error(isEs ? 'Por favor, completa todos los datos del evento' : 'Please fill in all event details');
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const subject = `${isEs ? 'Solicitud de reserva de artista' : 'Artist Booking Request'}: ${artist?.name ?? (isEs ? 'Artista desconocido' : 'Unknown Artist')}`;
      const message = [
        `${isEs ? 'Artista' : 'Artist'}: ${artist?.name ?? 'N/A'}`,
        bookingDetails.company ? `${isEs ? 'Empresa' : 'Company'}: ${bookingDetails.company}` : null,
        bookingDetails.website ? `${isEs ? 'Web' : 'Website'}: ${bookingDetails.website}` : null,
        bookingDetails.eventType ? `${isEs ? 'Evento' : 'Event'}: ${bookingDetails.eventType}` : null,
        selectedDate ? `${isEs ? 'Fecha' : 'Date'}: ${format(selectedDate, "PPP")}` : null,
        bookingDetails.venue ? `${isEs ? 'Sala' : 'Venue'}: ${bookingDetails.venue}` : null,
        bookingDetails.city ? `${isEs ? 'Ciudad' : 'City'}: ${bookingDetails.city}` : null,
        bookingDetails.country ? `${isEs ? 'País' : 'Country'}: ${bookingDetails.country}` : null,
        bookingDetails.expectedAttendees ? `${isEs ? 'Asistentes' : 'Attendees'}: ${bookingDetails.expectedAttendees}` : null,
        bookingDetails.budget ? `${isEs ? 'Presupuesto' : 'Budget'}: ${bookingDetails.budget}` : null,
        bookingDetails.eventDescription ? `${isEs ? 'Descripción' : 'Description'}: ${bookingDetails.eventDescription}` : null,
        bookingDetails.specialRequests ? `${isEs ? 'Peticiones especiales' : 'Special Requests'}: ${bookingDetails.specialRequests}` : null,
      ].filter(Boolean).join("\n");

      const resp = await fetch('/api/bitrix/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${bookingDetails.firstName} ${bookingDetails.lastName}`.trim(),
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          subject,
          message,
          source: 'agency-artist-booking',
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error((data as any)?.error?.message || 'Request failed');
      }

      setStep("success");
      toast.success(isEs ? `Solicitud de reserva enviada para ${artist?.name}. Te contactaremos por email.` : `Booking request sent for ${artist?.name}. We'll contact you by email.`);

      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (error) {
      toast.error(isEs ? 'La reserva ha fallado. Inténtalo de nuevo.' : "Booking failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep("details");
    setSelectedDate(undefined);
    setBookingDetails({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      eventType: "",
      venue: "",
      city: "",
      country: "",
      expectedAttendees: "",
      budget: "",
      eventDescription: "",
      specialRequests: "",
    });
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
      billingAddress: "",
      city: "",
      zipCode: "",
      country: "",
    });
    onClose();
  };

  if (!artist) return null;

  const estimatedPrice = budgetRanges.indexOf(bookingDetails.budget) >= 0 
    ? budgetRanges.indexOf(bookingDetails.budget) * 15000 + 5000 
    : 25000;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Step 1: Contact Details */}
        {step === "details" && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <DialogTitle className="text-2xl text-white">
                    {isEs ? 'Reservar a' : 'Book'} {artist.name}
                  </DialogTitle>
                  <DialogDescription className="text-cyan-400">
                    {artist.genre} • {artist.followers} {isEs ? 'seguidores' : 'followers'}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                  <Users className="w-3 h-3 mr-1" />
                  {isEs ? 'Paso 1 de 3' : 'Step 1 of 3'}
                </Badge>
                <span className="text-gray-300 text-sm">{isEs ? 'Información de contacto' : 'Contact Information'}</span>
              </div>
            </DialogHeader>

            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">{isEs ? 'Nombre *' : 'First Name *'}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      value={bookingDetails.firstName}
                      onChange={(e) => setBookingDetails({...bookingDetails, firstName: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'Nombre' : 'John'}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">{isEs ? 'Apellidos *' : 'Last Name *'}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      value={bookingDetails.lastName}
                      onChange={(e) => setBookingDetails({...bookingDetails, lastName: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'Apellidos' : 'Doe'}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">{isEs ? 'Correo electrónico *' : 'Email Address *'}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">{isEs ? 'Teléfono' : 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? '+34 600 000 000' : '+1 (555) 123-4567'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">{isEs ? 'Empresa/Organización' : 'Company/Organization'}</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="company"
                      value={bookingDetails.company}
                      onChange={(e) => setBookingDetails({...bookingDetails, company: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'Nombre de la empresa' : 'Company Name'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">{isEs ? 'Sitio web' : 'Website'}</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      type="url"
                      value={bookingDetails.website}
                      onChange={(e) => setBookingDetails({...bookingDetails, website: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'https://tuweb.com' : 'https://yourwebsite.com'}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={handleClose}
                  className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#6efff8]" />
                      {isEs ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {isEs ? 'Enviar solicitud' : 'Send Request'}
                      <ArrowRight className="w-4 h-4 ml-2 text-[#6efff8]" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Step 2: Event Details */}
        {step === "event" && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <DialogTitle className="text-2xl text-white">
                    {isEs ? 'Detalles del evento' : 'Event Details'}
                  </DialogTitle>
                  <DialogDescription className="text-cyan-400">
                    {isEs ? 'Cuéntanos sobre tu evento para' : 'Tell us about your event for'} {artist.name}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                  <CalendarDays className="w-3 h-3 mr-1" />
                  {isEs ? 'Paso 2 de 3' : 'Step 2 of 3'}
                </Badge>
                <span className="text-gray-300 text-sm">{isEs ? 'Información del evento' : 'Event Information'}</span>
              </div>
            </DialogHeader>

            <form onSubmit={handleEventSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">{isEs ? 'Tipo de evento *' : 'Event Type *'}</Label>
                  <Select
                    value={bookingDetails.eventType}
                    onValueChange={(value) => setBookingDetails({...bookingDetails, eventType: value})}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder={isEs ? 'Selecciona el tipo de evento' : 'Select event type'} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">{isEs ? 'Fecha del evento *' : 'Event Date *'}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10",
                          !selectedDate && "text-[#6efff8]/60"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#6efff8]" />
                        {selectedDate ? format(selectedDate, "PPP") : (isEs ? 'Elige una fecha' : 'Pick a date')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-900 border-white/20">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-white">{isEs ? 'Nombre del venue *' : 'Venue Name *'}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="venue"
                      value={bookingDetails.venue}
                      onChange={(e) => setBookingDetails({...bookingDetails, venue: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'Salón Principal' : 'The Grand Ballroom'}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">{isEs ? 'Ciudad' : 'City'}</Label>
                  <Input
                    id="city"
                    value={bookingDetails.city}
                    onChange={(e) => setBookingDetails({...bookingDetails, city: e.target.value})}
                    className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                    placeholder={isEs ? 'Madrid' : 'New York'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedAttendees" className="text-white">{isEs ? 'Asistentes previstos' : 'Expected Attendees'}</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="expectedAttendees"
                      value={bookingDetails.expectedAttendees}
                      onChange={(e) => setBookingDetails({...bookingDetails, expectedAttendees: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">{isEs ? 'Rango de presupuesto' : 'Budget Range'}</Label>
                  <Select
                    value={bookingDetails.budget}
                    onValueChange={(value) => setBookingDetails({...bookingDetails, budget: value})}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder={isEs ? 'Selecciona un presupuesto' : 'Select budget range'} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range} className="text-white hover:bg-white/10">
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDescription" className="text-white">{isEs ? 'Descripción del evento' : 'Event Description'}</Label>
                <Textarea
                  id="eventDescription"
                  value={bookingDetails.eventDescription}
                  onChange={(e) => setBookingDetails({...bookingDetails, eventDescription: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                  placeholder={isEs ? 'Cuéntanos sobre tu evento, temática, requisitos especiales...' : 'Tell us about your event, theme, special requirements...'}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="text-white">{isEs ? 'Peticiones especiales' : 'Special Requests'}</Label>
                <Textarea
                  id="specialRequests"
                  value={bookingDetails.specialRequests}
                  onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                  placeholder={isEs ? 'Canciones específicas, requisitos técnicos u otras peticiones...' : 'Any specific songs, technical requirements, or other requests...'}
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 text-[#6efff8]" />
                  {isEs ? 'Atrás' : 'Back'}
                </Button>
                <Button
                  type="submit"
                  className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                >
                  {isEs ? 'Continuar al pago' : 'Continue to Payment'}
                  <ArrowRight className="w-4 h-4 ml-2 text-[#6efff8]" />
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Payment */}
        {step === "payment" && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <DialogTitle className="text-2xl text-white">
                    {isEs ? 'Pago seguro' : 'Secure Payment'}
                  </DialogTitle>
                  <DialogDescription className="text-cyan-400">
                    {isEs ? 'Completa tu reserva para' : 'Complete your booking for'} {artist.name}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {isEs ? 'Paso 3 de 3' : 'Step 3 of 3'}
                </Badge>
                <span className="text-gray-300 text-sm">{isEs ? 'Información de pago' : 'Payment Information'}</span>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{isEs ? 'Resumen de la reserva' : 'Booking Summary'}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{isEs ? 'Artista:' : 'Artist:'}</span>
                    <span className="text-white font-medium">{artist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{isEs ? 'Tipo de evento:' : 'Event Type:'}</span>
                    <span className="text-white">{bookingDetails.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{isEs ? 'Fecha:' : 'Date:'}</span>
                    <span className="text-white">
                      {selectedDate ? format(selectedDate, "PPP") : (isEs ? 'No seleccionada' : 'Not selected')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{isEs ? 'Sala:' : 'Venue:'}</span>
                    <span className="text-white">{bookingDetails.venue}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-300">{isEs ? 'Tarifa de reserva:' : 'Booking Fee:'}</span>
                    <span className="text-cyan-400">${estimatedPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {isEs ? '* El precio final se confirmará según los detalles del evento y la negociación.' : '* Final price will be confirmed based on event details and negotiations'}
                  </p>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nameOnCard" className="text-white">{isEs ? 'Nombre en la tarjeta *' : 'Name on Card *'}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nameOnCard"
                      value={paymentDetails.nameOnCard}
                      onChange={(e) => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'Nombre Apellido' : 'John Doe'}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-white">{isEs ? 'Número de tarjeta *' : 'Card Number *'}</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-white">{isEs ? 'Fecha de caducidad *' : 'Expiry Date *'}</Label>
                    <Input
                      id="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder={isEs ? 'MM/AA' : 'MM/YY'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-white">CVV *</Label>
                    <Input
                      id="cvv"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>{isEs ? 'Tu pago está protegido con cifrado SSL de 256 bits' : 'Your payment is secured with 256-bit SSL encryption'}</span>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("event")}
                    className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 text-[#6efff8]" />
                    {isEs ? 'Atrás' : 'Back'}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-transparent border border-[#6efff8] text-[#6efff8] hover:bg-[#6efff8]/10 hover:border-[#6efff8]"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#6efff8]" />
                        {isEs ? 'Procesando...' : 'Processing...'}
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2 text-[#6efff8]" />
                        {isEs ? 'Completar reserva' : 'Complete Booking'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-green-400 text-2xl">
                {isEs ? '¡Solicitud de reserva enviada!' : 'Booking Request Submitted!'}
              </DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {isEs ? 'Solicitud de reserva para' : 'Booking request for'} {artist.name}
                </h3>
                <p className="text-gray-300">
                  {isEs ? '¡Tu solicitud de reserva se ha enviado correctamente!' : 'Your booking request has been submitted successfully!'}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-left space-y-4">
                <h4 className="font-semibold text-cyan-400 text-center">{isEs ? '¿Qué ocurre ahora?' : 'What Happens Next?'}</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{isEs ? 'Nuestro equipo revisará tu solicitud en 24 horas' : 'Our team will review your booking request within 24 hours'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{isEs ? 'Te enviaremos un presupuesto detallado y contrato por email' : "We'll send you a detailed quote and contract via email"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{isEs ? 'Una vez confirmado, recibirás detalles de coordinación del evento' : "Once confirmed, you'll receive event coordination details"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{isEs ? 'Tu event manager te contactará para cerrar los detalles' : 'Your event manager will contact you to finalize arrangements'}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  {isEs ? 'Confirmación enviada a:' : 'Confirmation sent to:'} {bookingDetails.email}
                </p>
                <p className="text-xs text-gray-500">
                  {isEs ? 'Esta ventana se cerrará automáticamente...' : 'This window will close automatically...'}
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
