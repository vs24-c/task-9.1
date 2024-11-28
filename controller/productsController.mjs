import ProductsService from "../models/products/productsService.mjs";
import { validationResult } from "express-validator";


class ProductsController {
  static async addSession(req, res) {
    try {
      if (!req.session.user) {
        req.session.user = [];
        req.session.user.push({
          user: req.body.user,
        });        
      }     
      res.redirect('/products')
    } catch (error) {
      console.log(error.message);
      res.redirect('/products');
    }
  }

  static async getProductsList(req, res) {
    try {
      let products;
      const LoggedIn = req.session.user;
      if (req.body.option) {
            req.session.option = req.body.option;
      } else if (req.session.option) {        
        products = await ProductsService.sortProd(req.session.option)  
      } else {
       products = await ProductsService.getList();
      }     
      res.setHeader('Cache-Control', 'no-store');
     return res.render('products', {
        products: products,
        LoggedIn,
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: error.message});
    }
  }

  static async getAddProductForm(req, res) {
    try {
      const id = req.params.id;
      let product = null;
      if (id) {
        product = await ProductsService.getById(id);
      }
      res.render('addProducts', {
        errors: [],
        product: product,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }

  static async addProduct(req, res) {    
    try {
      const errors = validationResult(req)
      const products = req.body;     
      if (!errors.isEmpty()) {
        if(req.params.id) products.id = req.params.id;         
          return res.render('addProducts', {
            errors: errors.array(),
            product: products,
          });
      }
      if(req.file?.buffer) products.imageSrc = req.file.buffer.toString('base64')
      
      if (req.params.id) {
        await ProductsService.update(req.params.id, products);
      } else {
        await ProductsService.create(products);
      }
      res.redirect('/products');
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductsService.delete(req.params.id);
      res.redirect('/products');
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }
}
 
export default ProductsController;