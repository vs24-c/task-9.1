import mongoose from "mongoose";
import Product from "./productsModel.mjs";

class ProductsServece {
  static async getList() {
    try {
      const exist = await Product.checkExistDb();
      if (exist) {
        const products = await Product.find().exec();
        return products;
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  }

  static async create(data) {
    try {
      const newProd = new Product(data);
      await newProd.save();
    } catch (error) {
      throw Error('Error creat new product');
    }
  }

  static async getById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw Error('Error get product by id');
    }
  }

  static async update(id, data) {
    try {
      await Product.findByIdAndUpdate(id, data);
    } catch (error) {
      throw Error('Error update products');
    }
  }

  static async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (error) {
      throw Error('Error delete product by id');
    }
  }

  // static async sortProd(option) {
  //   try {
  //     const products = await Product.find().exec()
  //     if (option === 'desc') {
  //       products.sort((a, b) => a.price - b.price)
  //     } else {
  //       products.sort((a, b) => b.price - a.price)
  //     }
  //     return products;
  //   } catch (error) {
  //     throw new Error('Error sorting products');
  //   }
  // }

  static async sortProd(option) {
    const start = Date.now();
    const sortOrder = option === 'asc' ? 1 : -1;
    const products = await Product.find().sort({ price: sortOrder }).lean()
    const end = Date.now();
    return products;
  }
}

export default ProductsServece;