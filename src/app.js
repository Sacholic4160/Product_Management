import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import productRoutes from './product.route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);

export { app };
