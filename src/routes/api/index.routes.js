import { Router } from 'express';
import productsRouter from './products.routes.js'
import fakerRouter from './fakeProducts.routes.js';
import randomsRouter from './randoms.routes.js';

const router = Router();

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use('/products', productsRouter);
router.use('/fake-products', fakerRouter);
router.use('/randoms', randomsRouter);

export default router;
