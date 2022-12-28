import { Router } from 'express';
import productsController from '../../controllers/api/products.controller.js';

const router = Router();

/* ----------------------------- Products router ---------------------------- */
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProductById);
router.delete('/:id', productsController.deleteProductById);

export default router;
