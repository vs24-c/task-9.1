import Controller from "../controller/productsController.mjs";
import ValidateSchem from "../validate/validateSchem.mjs";
import uploud from "../utils/uploudManager.mjs";
import { Router } from "express";

const router = Router();

router.post('/', Controller.getProductsList);

router.get('/', Controller.getProductsList)

router.post(
  '/add/:id?',
  uploud.single('imageSrc'),
  ValidateSchem.prodValidate,
  Controller.addProduct
);

router.get('/add/:id?', Controller.getAddProductForm);

router.delete('/:id', Controller.deleteProduct)

export default router;
