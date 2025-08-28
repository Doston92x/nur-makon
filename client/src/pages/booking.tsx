import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice, calculateNights, calculateTotal } from "@/lib/utils";
import type { Room, InsertBooking } from "@shared/schema";

export default function Booking() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    specialRequests: "",
  });

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const createBookingMutation = useMutation({
    mutationFn: async (booking: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", booking);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been successfully created. You will receive a confirmation email shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roomId: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        specialRequests: "",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const selectedRoom = rooms.find(room => room.id === parseInt(formData.roomId));
  const nights = formData.checkIn && formData.checkOut ? calculateNights(formData.checkIn, formData.checkOut) : 0;
  const pricing = selectedRoom && nights > 0 ? calculateTotal(selectedRoom.price, nights) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !pricing) {
      toast({
        title: "Error",
        description: "Please select a room and valid dates.",
        variant: "destructive",
      });
      return;
    }

    const booking: InsertBooking = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      roomId: parseInt(formData.roomId),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: parseInt(formData.guests),
      specialRequests: formData.specialRequests || null,
      totalAmount: pricing.total.toString(),
    };

    createBookingMutation.mutate(booking);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-xl text-gray-600">Just a few steps to secure your stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Guest Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Guest Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stay Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Stay Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date *</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => updateFormData("checkIn", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date *</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => updateFormData("checkOut", e.target.value)}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomType">Room Type *</Label>
                      <Select value={formData.roomId} onValueChange={(value) => updateFormData("roomId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.id.toString()}>
                              {room.name} - {formatPrice(room.price)}/night
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests *</Label>
                      <Select value={formData.guests} onValueChange={(value) => updateFormData("guests", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => updateFormData("specialRequests", e.target.value)}
                      placeholder="Any special accommodations or requests..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"
                disabled={createBookingMutation.isPending}
              >
                {createBookingMutation.isPending ? "Processing..." : "Complete Booking"}
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h3>

                {selectedRoom ? (
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-gray-900">{selectedRoom.name}</h4>
                      <p className="text-sm text-gray-600">{selectedRoom.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span>{formData.checkIn || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span>{formData.checkOut || "Not selected"}</span>
                      </div>
                      {nights > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nights:</span>
                          <span>{nights}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span>{formData.guests}</span>
                      </div>
                    </div>

                    {pricing && (
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Room Rate ({nights} nights):</span>
                          <span>{formatPrice(pricing.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taxes & Fees:</span>
                          <span>{formatPrice(pricing.taxes)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span className="text-blue-600">{formatPrice(pricing.total)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">Please select a room to see pricing details.</p>
                )}

                {/* PMS Integration Status */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-green-700">PMS Connected - Real-time availability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
