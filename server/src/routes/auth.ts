import { Router } from 'express';
export const authRoutes = Router();
authRoutes.post('/register', (req, res) => res.json({ message: 'Register endpoint' }));
authRoutes.post('/login', (req, res) => res.json({ message: 'Login endpoint' }));
