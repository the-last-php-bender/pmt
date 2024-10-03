
import express from 'express';
import dotenv from 'dotenv'
import routes from './api/routes/index.js'
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import rateLimit from 'express-rate-limit';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DB = process.env.DATABASE || "mongodb://localhost:27017/pmtdb";

mongoose.connect(DB)
.then(() => {
  console.log('Connected to the database successfully.');
})
.catch((err) => {
  console.error('Failed to connect to the database:', err);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api' , routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
