# Uber Clone — Ride Sharing Mobile App

> Full-featured ride-sharing application with real-time GPS tracking, dynamic fare calculation, and driver matching — built with React Native and Node.js.

## 🚀 Overview

A complete Uber-like ride-hailing application featuring real-time location tracking via Socket.io, Haversine-based driver proximity matching, dynamic fare calculation based on distance and ride type, and a rider/driver dual-interface mobile app built with React Native and Expo.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ Real-Time GPS Tracking | Live driver/rider location via Socket.io |
| 🚗 Multiple Ride Types | Economy, Premium, XL with different pricing |
| 📍 Driver Matching | Haversine distance algorithm for nearby drivers |
| 💰 Dynamic Pricing | Fare = base + (distance × rate per km) |
| ⭐ Rating System | Post-ride ratings for drivers and riders |
| 📱 Cross-Platform | iOS + Android via React Native / Expo |
| 🗺️ Google Maps | Full map integration with route display |
| 📋 Ride History | Complete trip history with details |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native, Expo, react-native-maps |
| Navigation | React Navigation |
| Backend | Node.js, Express, Socket.io |
| Database | MongoDB + Mongoose |
| Maps | Google Maps Platform |
| Real-Time | Socket.io (bidirectional) |

## ⚡ Quick Start

```bash
# Server
cd server && npm install && npm run dev

# Mobile (separate terminal)
cd mobile && npm install && expo start
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key |

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rides/request` | Request a ride |
| PATCH | `/api/rides/:id/accept` | Driver accepts ride |
| PATCH | `/api/rides/:id/complete` | Complete ride + rating |
| GET | `/api/rides/history/:userId` | Ride history |
| GET | `/api/drivers/nearby` | Find nearby drivers |

## 📄 License

MIT
