import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/Products.controller.js';
import { verifyAdminjwt } from '../middlewares/AdminAuth.middleware.js';
import multer from 'multer';

const upload = multer({ dest: './Public/temp' });

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', verifyAdminjwt, upload.array('images', 5), createProduct);
router.put('/:id', verifyAdminjwt, upload.array('images', 5), updateProduct);
router.delete('/:id', verifyAdminjwt, deleteProduct);

export default router;