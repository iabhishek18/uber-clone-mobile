import { Server, Socket } from 'socket.io';

const driverLocations = new Map<string, { lat: number; lng: number; heading: number }>();

export function setupTracking(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('driver:location', (data: { driverId: string; lat: number; lng: number; heading: number }) => {
      driverLocations.set(data.driverId, { lat: data.lat, lng: data.lng, heading: data.heading });
      socket.broadcast.emit('driver:moved', data);
    });

    socket.on('ride:request', (data: { rideId: string; pickup: { lat: number; lng: number } }) => {
      const nearbyDrivers = findNearbyDrivers(data.pickup, 5);
      nearbyDrivers.forEach(driverId => {
        io.to(driverId).emit('ride:new_request', data);
      });
    });

    socket.on('ride:accepted', (data: { rideId: string; driverId: string; riderId: string }) => {
      io.to(data.riderId).emit('ride:driver_assigned', { rideId: data.rideId, driverId: data.driverId, location: driverLocations.get(data.driverId) });
    });

    socket.on('join:room', (roomId: string) => socket.join(roomId));
    socket.on('disconnect', () => {
      const driverId = socket.handshake.query.driverId as string;
      if (driverId) driverLocations.delete(driverId);
    });
  });
}

function findNearbyDrivers(location: { lat: number; lng: number }, radiusKm: number): string[] {
  const nearby: string[] = [];
  driverLocations.forEach((loc, driverId) => {
    const dist = haversine(location.lat, location.lng, loc.lat, loc.lng);
    if (dist <= radiusKm) nearby.push(driverId);
  });
  return nearby;
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
