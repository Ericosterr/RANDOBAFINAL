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
import { Separator } from "./ui/separator";
import { useAuth } from "../contexts/AuthContext";
import {
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  title: string;
  instructor?: string;
  date?: string;
  time?: string;
  duration?: string;
  location?: string;
  price: number;
  type: "course" | "event";
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BookingItem | null;
}

export function BookingModal({ isOpen, onClose, item }: BookingModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    numberOfPeople: 1,
    specialRequests: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: user?.name || "",
    billingAddress: "",
    city: "",
    zipCode: "",
  });

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.email) {
      toast.error("Name and email are required");
      return;
    }
    setIsProcessing(true);

    try {
      const subject = `Enrollment Request: ${item?.title ?? "Course"}`;
      const composedMessage = [
        `Course: ${item?.title ?? "N/A"}`,
        item?.date ? `Date: ${item.date}` : null,
        item?.time ? `Time: ${item.time}` : null,
        item?.location ? `Location: ${item.location}` : null,
        `People: ${bookingDetails.numberOfPeople}`,
        bookingDetails.phone ? `Phone: ${bookingDetails.phone}` : null,
        bookingDetails.specialRequests
          ? `Special Requests: ${bookingDetails.specialRequests}`
          : null,
      ]
        .filter(Boolean)
        .join("\n");

      const resp = await fetch("/api/bitrix/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          subject,
          message: composedMessage,
          source: item?.type === "event" ? "event-enroll" : "course-enroll",
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error?.message || "Request failed");
      }

      setStep("success");
      toast.success(`Enrollment sent for ${item?.title}. We'll contact you by email.`);

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      toast.error("Failed to submit contact form. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment success
      setStep("success");
      toast.success(`Successfully booked: ${item?.title}!`);

      // Reset form after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setStep("details");
    setBookingDetails({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      numberOfPeople: 1,
      specialRequests: "",
    });
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: user?.name || "",
      billingAddress: "",
      city: "",
      zipCode: "",
    });
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-lg max-h-[90vh] overflow-y-auto" style={{backgroundColor: '#1a1a1a', borderColor: '#6efff8'}}>
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle style={{color: '#6efff8'}}>
                Book Tickets
              </DialogTitle>
              <DialogDescription style={{color: '#6efff8', opacity: '0.8'}}>
                Reserve your spot for {item.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Item Summary */}
              <div className="p-4 rounded-lg space-y-2" style={{backgroundColor: 'rgba(110, 255, 248, 0.1)'}}>
                <h3 className="font-semibold" style={{color: '#6efff8'}}>{item.title}</h3>
                {item.instructor && (
                  <p className="text-sm" style={{color: '#6efff8', opacity: '0.7'}}>
                    with {item.instructor}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {item.date && (
                    <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                      <Calendar className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                      {item.date}
                    </div>
                  )}
                  {item.time && (
                    <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                      <Clock className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                      {item.time}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center" style={{color: '#6efff8', opacity: '0.8'}}>
                      <MapPin className="w-4 h-4 mr-2" style={{color: '#6efff8'}} />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Details Form */}
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{color: '#6efff8'}}>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4" style={{color: '#6efff8', opacity: '0.7'}} />
                    <Input
                      id="name"
                      type="text"
                      value={bookingDetails.name}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          name: e.target.value,
                        })
                      }
                      className="pl-10"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" style={{color: '#6efff8'}}>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4" style={{color: '#6efff8', opacity: '0.7'}} />
                    <Input
                      id="email"
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          email: e.target.value,
                        })
                      }
                      className="pl-10"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" style={{color: '#6efff8'}}>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4" style={{color: '#6efff8', opacity: '0.7'}} />
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          phone: e.target.value,
                        })
                      }
                      className="pl-10"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfPeople" style={{color: '#6efff8'}}>Number of People</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4" style={{color: '#6efff8', opacity: '0.7'}} />
                    <Input
                      id="numberOfPeople"
                      type="number"
                      min="1"
                      max="20"
                      value={bookingDetails.numberOfPeople}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          numberOfPeople: parseInt(e.target.value) || 1,
                        })
                      }
                      className="pl-10"
                      style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests" style={{color: '#6efff8'}}>
                    Special Requests (Optional)
                  </Label>
                  <textarea
                    id="special-requests"
                    value={bookingDetails.specialRequests}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        specialRequests: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-md border focus:outline-none resize-none"
                    style={{backgroundColor: 'rgba(110, 255, 248, 0.1)', borderColor: '#6efff8', color: '#6efff8'}}
                    placeholder="Any special requests or dietary requirements..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold transition-all duration-300"
                  style={{backgroundColor: '#6efff8', color: 'black', border: `2px solid #6efff8`}}
                  onMouseEnter={(e) => {
                    if (!isProcessing) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#6efff8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing) {
                      e.currentTarget.style.backgroundColor = '#6efff8';
                      e.currentTarget.style.color = 'black';
                    }
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" style={{color: '#6efff8'}} />
                      Processing...
                    </>
                  ) : (
                    "Reserve Tickets"
                  )}
                </Button>
              </form>
            </div>
          </>
        )}


        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center" style={{color: '#6efff8'}}>
                Tickets Reserved!
              </DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(110, 255, 248, 0.2)'}}>
                  <CheckCircle className="w-8 h-8" style={{color: '#6efff8'}} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold" style={{color: '#6efff8'}}>
                  {item.title}
                </h3>
                <p style={{color: '#6efff8', opacity: '0.8'}}>
                  Successfully reserved {bookingDetails.numberOfPeople} ticket{bookingDetails.numberOfPeople > 1 ? 's' : ''}! Confirmation details will be sent to {bookingDetails.email}
                </p>
              </div>

              <div className="p-4 rounded-lg text-left space-y-2" style={{backgroundColor: 'rgba(110, 255, 248, 0.1)'}}>
                <h4 className="font-semibold" style={{color: '#6efff8'}}>What's Next?</h4>
                <ul className="text-sm space-y-1" style={{color: '#6efff8', opacity: '0.8'}}>
                  <li>• Ticket confirmation will be sent within 24 hours</li>
                  <li>• You'll receive event details and venue information</li>
                  <li>• Payment instructions will be included in your confirmation</li>
                  <li>• Check your email for all ticket details</li>
                </ul>
              </div>

              <p className="text-xs" style={{color: '#6efff8', opacity: '0.6'}}>
                This window will close automatically in a few seconds...
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
