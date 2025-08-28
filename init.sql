-- Database initialization script for Nur Makon Hotel
-- This script runs automatically when the PostgreSQL container starts

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_occupancy INTEGER NOT NULL,
  size TEXT NOT NULL,
  view TEXT NOT NULL,
  amenities TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  available BOOLEAN DEFAULT true
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  room_id INTEGER NOT NULL,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample rooms data
INSERT INTO rooms (name, type, description, price, max_occupancy, size, view, amenities, image_url, available) VALUES 
('Standard King Room', 'standard', 'Comfortable and elegant room with king-size bed, work desk, and city views.', 159, 2, '350 sq ft', 'City View', ARRAY['Free Wi-Fi', 'Air Conditioning', 'Minibar', 'Work Desk'], '/images/room1.jpg', true),
('Deluxe Ocean View', 'deluxe', 'Spacious deluxe room with breathtaking ocean views and private balcony.', 249, 2, '450 sq ft', 'Ocean View', ARRAY['Free Wi-Fi', 'Balcony', 'Premium Minibar', 'Marble Bathroom'], '/images/room2.jpg', true),
('Executive Suite', 'suite', 'Premium suite with separate living area and concierge service.', 499, 4, '800 sq ft', 'Panoramic View', ARRAY['Living Area', 'Balcony', 'Concierge Service', 'Premium Amenities'], '/images/suite1.jpg', true)
ON CONFLICT DO NOTHING;