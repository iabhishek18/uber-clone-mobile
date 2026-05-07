import mongoose, { Schema, Document } from 'mongoose';

export interface IRide extends Document {
  rider: string;
  driver?: string;
  pickup: { lat: number; lng: number; address: string };
  dropoff: { lat: number; lng: number; address: string };
  status: 'requested' | 'accepted' | 'arriving' | 'in_progress' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
  rideType: 'economy' | 'premium' | 'xl';
  rating?: number;
}

const rideSchema = new Schema<IRide>({
  rider: { type: String, ref: 'User', required: true },
  driver: { type: String, ref: 'User' },
  pickup: { lat: Number, lng: Number, address: String },
  dropoff: { lat: Number, lng: Number, address: String },
  status: { type: String, enum: ['requested', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled'], default: 'requested' },
  fare: { type: Number, required: true },
  distance: { type: Number, required: true },
  duration: { type: Number, required: true },
  rideType: { type: String, enum: ['economy', 'premium', 'xl'], default: 'economy' },
  rating: Number,
}, { timestamps: true });

export const Ride = mongoose.model<IRide>('Ride', rideSchema);
