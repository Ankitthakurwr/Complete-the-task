import { Router } from 'express';
import CategoryController from '../controllers/category.controllers';
import ServiceController from '../controllers/service.controllers';
import authenticateJWT from '../middleware/auth.middleware';

const router = Router();

router.post('/category', authenticateJWT,CategoryController.createCategory);
router.get('/categories',authenticateJWT, CategoryController.getCategories);
router.put('/category/:categoryId', CategoryController.updateCategory);

router.post('/category/:categoryId/service', ServiceController.createService);
router.get('/category/:categoryId/services', ServiceController.getServices);
router.put('/category/:categoryId/service/:serviceId', ServiceController.updateService);
router.delete('/category/:categoryId/service/:serviceId', ServiceController.deleteService);

export default router;
