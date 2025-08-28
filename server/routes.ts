import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).send("healthy");
  });

  // Get all rooms
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rooms" });
    }
  });

  // Get rooms by type
  app.get("/api/rooms/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const rooms = await storage.getRoomsByType(type);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rooms by type" });
    }
  });

  // Get single room
  app.get("/api/rooms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const room = await storage.getRoom(id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch room" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      // Validate room exists
      const room = await storage.getRoom(result.data.roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      // Mock PMS integration - in real implementation, this would communicate with actual PMS
      console.log("PMS Integration: Processing booking for room", room.name);
      
      const booking = await storage.createBooking(result.data);
      
      // Mock PMS confirmation
      console.log("PMS Integration: Booking confirmed with ID", booking.id);
      
      res.status(201).json(booking);
    } catch (error) {
      console.error("Booking creation error:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get all bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Update booking status
  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Create contact message
  app.post("/api/contacts", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const contact = await storage.createContact(result.data);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Contact creation error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get all contacts
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // PMS Integration status endpoint
  app.get("/api/pms/status", async (req, res) => {
    res.json({
      status: "connected",
      lastSync: new Date().toISOString(),
      availableRooms: await storage.getRooms().then(rooms => rooms.filter(r => r.available).length),
      totalBookings: await storage.getBookings().then(bookings => bookings.length),
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
