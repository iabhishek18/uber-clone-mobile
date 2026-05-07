import { Router, Request, Response } from 'express';
import { Ride } from '../models/Ride';

export const rideRoutes = Router();

rideRoutes.post('/request', async (req: Request, res: Response) => {
  const { riderId, pickup, dropoff, rideType } = req.body;
  const distance = calculateDistance(pickup, dropoff);
  const duration = Math.ceil(distance * 3);
  const fare = calculateFare(distance, rideType);
  const ride = await Ride.create({ rider: riderId, pickup, dropoff, rideType, fare, distance, duration });
  res.status(201).json({ ride });
});

rideRoutes.patch('/:id/accept', async (req: Request, res: Response) => {
  const ride = await Ride.findByIdAndUpdate(req.params.id, { driver: req.body.driverId, status: 'accepted' }, { new: true });
  res.json({ ride });
});

rideRoutes.patch('/:id/complete', async (req: Request, res: Response) => {
  const ride = await Ride.findByIdAndUpdate(req.params.id, { status: 'completed', rating: req.body.rating }, { new: true });
  res.json({ ride });
});

rideRoutes.get('/history/:userId', async (req: Request, res: Response) => {
  const rides = await Ride.find({ $or: [{ rider: req.params.userId }, { driver: req.params.userId }] }).sort({ createdAt: -1 }).limit(20);
  res.json({ rides });
});

function calculateDistance(pickup: any, dropoff: any): number {
  const R = 6371;
  const dLat = (dropoff.lat - pickup.lat) * Math.PI / 180;
  const dLon = (dropoff.lng - pickup.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(pickup.lat * Math.PI / 180) * Math.cos(dropoff.lat * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateFare(distance: number, type: string): number {
  const rates: Record<string, number> = { economy: 12, premium: 20, xl: 28 };
  const baseFare = 50;
  return Math.round(baseFare + distance * (rates[type] || 12));
}
