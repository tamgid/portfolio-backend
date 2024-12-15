"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// import userRoutes from './routes/userRoutes';
dotenv_1.default.config(); // Load environment variables from .env
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 5000;
app.use(express_1.default.json()); // Parse JSON bodies
// app.use('/api/users', userRoutes); // Set up user routes
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
