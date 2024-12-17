import express from 'express';
import CartController from '../controllers/Cart.controller.js'; // Assuming the controller is in the controllers folder
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { verifyAdminjwt } from '../middlewares/AdminAuth.middleware.js';

const router = express.Router();

router.get('/', verifyAdminjwt, CartController.getAllCarts);

router.get('/getusercart', verifyjwt, CartController.getCartByUser);

router.get('/:id', verifyjwt, CartController.getCartById);

router.post('/', verifyjwt, CartController.createCart);

router.put('/:id', verifyjwt, CartController.updateCart);

router.delete('/:id', verifyjwt, CartController.deleteCart);

router.post('/:id/addproducts', verifyjwt, CartController.addProductToCart);

router.delete('/:id/deleteproducts/:productId', verifyjwt, CartController.removeProductFromCart);

export default router;