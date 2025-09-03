import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wifi, Car, Utensils, Waves } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Room } from "@shared/schema";
import extImg from "../assets/ext.jpeg"; 

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const featuredRooms = rooms?.slice(0, 3) || [];

  const handleSearchRooms = () => {
    window.location.href = "/rooms";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${extImg})`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-amber-500">Nur Makon Hotel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience luxury and comfort in the heart of the city
          </p>

          {/* Quick Booking Widget */}
          <div className="booking-widget rounded-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Check-in</Label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Check-out</Label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="text-gray-900">
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
              <div className="text-left">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Rooms</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSearchRooms}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Search Rooms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Accommodations</h2>
            <p className="text-xl text-gray-600">Discover our premium rooms and suites</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="w-full h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRooms.map((room) => (
                <Card key={room.id} className="room-card overflow-hidden hover:shadow-xl">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <p className="text-gray-600 mb-4">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(room.price)}/night
                      </span>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">World-Class Amenities</h2>
            <p className="text-xl text-gray-600">Everything you need for a perfect stay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 amenity-icon">
                <Wifi className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Wi-Fi</h3>
              <p className="text-gray-600">High-speed internet throughout the hotel</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 amenity-icon">
                <Waves className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pool & Spa</h3>
              <p className="text-gray-600">Rooftop pool and full-service spa</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 amenity-icon">
                <Utensils className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fine Dining</h3>
              <p className="text-gray-600">Award-winning restaurant and bar</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 amenity-icon">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Valet Parking</h3>
              <p className="text-gray-600">Convenient valet and self-parking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
