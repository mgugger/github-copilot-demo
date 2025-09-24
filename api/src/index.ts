import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import deliveryRoutes from './routes/delivery';
import orderDetailDeliveryRoutes from './routes/orderDetailDelivery';
import productRoutes from './routes/product';
import orderDetailRoutes from './routes/orderDetail';
import orderRoutes from './routes/order';
import branchRoutes from './routes/branch';
import headquartersRoutes from './routes/headquarters';
import supplierRoutes from './routes/supplier';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for the frontend
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. server-to-server, curl) and all browser origins
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'REST API documentation using Swagger/OpenAPI',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server (HTTP)',
      },
      {
        url: `https://localhost:${port}`,
        description: 'Development server (HTTPS)',
      }
    ],
  },
  apis: ['./src/models/*.ts', './src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.use(express.json());

app.use('/api/deliveries', deliveryRoutes);
app.use('/api/order-detail-deliveries', orderDetailDeliveryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order-details', orderDetailRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/headquarters', headquartersRoutes);
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation is available at http://localhost:${port}/api-docs`);
});
