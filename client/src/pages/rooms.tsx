import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Eye, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Link } from "wouter";
import type { Room } from "@shared/schema";

export default function Rooms() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const { data: rooms = [], isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    
    let matchesPrice = true;
    if (priceFilter !== "all") {
      const price = parseFloat(room.price);
      switch (priceFilter) {
        case "low":
          matchesPrice = price < 200;
          break;
        case "medium":
          matchesPrice = price >= 200 && price < 400;
          break;
        case "high":
          matchesPrice = price >= 400;
          break;
      }
    }
    
    return matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms & Suites</h1>
          <p className="text-xl text-gray-600">Find the perfect accommodation for your stay</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard Rooms</SelectItem>
                  <SelectItem value="deluxe">Deluxe Rooms</SelectItem>
                  <SelectItem value="suite">Suites</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under $200</SelectItem>
                  <SelectItem value="medium">$200 - $400</SelectItem>
                  <SelectItem value="high">$400+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Amenities</SelectItem>
                  <SelectItem value="ocean">Ocean View</SelectItem>
                  <SelectItem value="balcony">Balcony</SelectItem>
                  <SelectItem value="suite">Suite Features</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Room Listings */}
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6 flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{room.name}</h3>
                        <p className="text-gray-600 mb-4">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-blue-600">
                          {formatPrice(room.price)}
                        </span>
                        <p className="text-gray-500">per night</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{room.maxOccupancy} Guests</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Bed className="h-4 w-4 text-blue-600 mr-2" />
                        <span>King Bed</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Ruler className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-4 w-4 text-blue-600 mr-2" />
                        <span>{room.view}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-green-600">
                        <span className="text-sm font-medium">
                          {room.available ? "Available" : "Fully Booked"}
                        </span>
                      </div>
                      <Link href="/booking">
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredRooms.length === 0 && !isLoading && (
          <Card className="p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more options.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
