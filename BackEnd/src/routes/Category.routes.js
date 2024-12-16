import express from 'express';
import CategoryController from '../controllers/CategoryController';
import { verifyAdminjwt } from '../middlewares/AdminAuth.middleware.js';


const router = express.Router();

router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategoryById);

// protected routes for admin  access only
router.post('/categories', verifyAdminjwt, CategoryController.createCategory);
router.put('/categories/:id', verifyAdminjwt, CategoryController.updateCategory);
router.delete('/categories/:id', verifyAdminjwt, CategoryController.deleteCategory);

export default router;