import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose

const productsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [15, 'Name must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be a positive number'],
      trim: true,
      escape: true,
    },
    counter: {
      type: Number,
      required: [true, 'Price is required'],
      default: 0,
      trim: true,
      escape: true,
    },
    imageSrc: {
      type: String,
    },
  },
  {collection: 'products'}
);

productsSchema.statics.checkExistDb = async function () {
  const database = await mongoose.connection.listDatabases()  
  return database.databases.some((db) => db.name === config.databaseName);
};

productsSchema.statics.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({name: 'products'}).toArray();
  if (collections.length === 0) {
    console.log(`Collection '${collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${collections.name}' exists`);
    return true;
  }
};

const Product = mongoose.model('Product', productsSchema)
export default Product