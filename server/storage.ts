import { users, rooms, bookings, contacts, type User, type InsertUser, type Room, type InsertRoom, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  getRoomsByType(type: string): Promise<Room[]>;
  createRoom(room: InsertRoom): Promise<Room>;
  
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getRooms(): Promise<Room[]> {
    return await db.select().from(rooms);
  }

  async getRoom(id: number): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));
    return room || undefined;
  }

  async getRoomsByType(type: string): Promise<Room[]> {
    return await db.select().from(rooms).where(eq(rooms.type, type));
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const [room] = await db
      .insert(rooms)
      .values(insertRoom)
      .returning();
    return room;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rooms: Map<number, Room>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentRoomId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentRoomId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample rooms
    this.initializeRooms();
  }

  private initializeRooms() {
    const sampleRooms: InsertRoom[] = [
      {
        name: "Standard Room",
        type: "standard",
        description: "Comfortable and elegant room with king-size bed, work desk, and city views. Perfect for business travelers and couples.",
        price: "35",
        maxOccupancy: 2,
        size: "20 sq meter",
        view: "Garden View",
        amenities: ["Free Wi-Fi", "Air Conditioning", "Mini Fridge", "Work Desk"],
        imageUrl: "./src/assets/standart.jpeg",
        available: true,
      },
      {
        name: "Superior Room",
        type: "superior",
        description: "Spacious deluxe room with breathtaking ocean views, private balcony, upgraded amenities, and premium bathroom fixtures.",
        price: "40",
        maxOccupancy: 2,
        size: "24 sq meter",
        view: "Gardeb View",
        amenities: ["Free Wi-Fi", "Air Conditioning", "Mini Fridge", "Work Desk"],
        imageUrl: "./src/assets/superior.jpeg",
        available: true,
      },
      {
        name: "Superior With Balcony",
        type: "superior",
        description: "Premium suite with separate living area, balcony, and concierge service. Perfect for extended stays and special occasions.",
        price: "49",
        maxOccupancy: 2,
        size: "26 sq meter",
        view: "Garden View",
        amenities: ["Free Wi-Fi", "Balcony", "Air Conditioning", "Mini Fridge"],
        imageUrl: "./src/assets/305.jpeg",
        available: true,
      },
      {
        name: "Deluxe Room",
        type: "Deluxe",
        description: "Ultimate luxury experience with separate living area, dining space, and panoramic views. Includes butler service and exclusive amenities.",
        price: "65",
        maxOccupancy: 3,
        size: "30 sq meter",
        view: "Garden View",
        amenities: ["Free Wi-Fi", "Air COnditioning", "Mini Fridge", "Working Desk", "Smart TV"],
        imageUrl: "./src/assets/201.jpeg",
        available: true,
      },
      {
        name: "Family Room",
        type: "Family",
        description: "Comfortable queen room with modern amenities and city views. Ideal for solo travelers and couples.",
        price: "65",
        maxOccupancy: 4,
        size: "50 sq meter",
        view: "City View",
        amenities: ["Free Wi-Fi", "Air Conditioning", "Mini Fridge", "Work Desk"],
        imageUrl: "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        available: true,
      },
    ];

    sampleRooms.forEach(room => {
      const id = this.currentRoomId++;
      const newRoom: Room = { ...room, id, available: room.available ?? true };
      this.rooms.set(id, newRoom);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async getRoomsByType(type: string): Promise<Room[]> {
    return Array.from(this.rooms.values()).filter(room => room.type === type);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = this.currentRoomId++;
    const room: Room = { ...insertRoom, id, available: insertRoom.available ?? true };
    this.rooms.set(id, room);
    return room;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      status: insertBooking.status || "confirmed",
      specialRequests: insertBooking.specialRequests || null,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone || null,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new DatabaseStorage();
