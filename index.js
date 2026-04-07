import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import { initSocket } from './socket/initSocket.js';
import locationRoutes from './routes/locationRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import getDriverRoutes from './routes/getDriverRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'], 
  credentials: true
}));

// 1. API ROUTES
app.use('/api/driver', driverRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/driver-data', getDriverRoutes);

// 2. FRONTEND STATIC
app.use(express.static(path.join(__dirname, 'dist')));

// 3. 🔥 XATONING YECHIMI (CATCH-ALL ROUTE)
// Node v25 va Express 5+ uchun '*' o'rniga aynan shu regexni ishlating:
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// MONGO DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda muvaffaqiyatli ishga tushdi`);
});