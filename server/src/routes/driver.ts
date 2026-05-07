import { Router } from 'express';
export const driverRoutes = Router();
driverRoutes.get('/nearby', (req, res) => res.json({ drivers: [] }));
driverRoutes.patch('/:id/status', (req, res) => res.json({ message: 'Status updated' }));
