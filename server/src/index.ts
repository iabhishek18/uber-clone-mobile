import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import { rideRoutes } from './routes/ride';
import { authRoutes } from './routes/auth';
import { driverRoutes } from './routes/driver';
import { setupTracking } from './socket/tracking';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);

setupTracking(io);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uber-clone').then(() => {
  httpServer.listen(5000, () => console.log('Server running on port 5000'));
});
