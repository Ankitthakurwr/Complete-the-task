import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoryRoutes from './src/routes/category.routes';
import authRoutes from './src/routes/auth.routes';
import authenticateJWT from './src/middleware/auth.middleware';
import sequelize from './src/database';

const app = express();
const port = 2122;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', authenticateJWT, categoryRoutes);

app.listen(port, async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully!');
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
});
