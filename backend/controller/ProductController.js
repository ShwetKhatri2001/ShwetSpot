import asyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';

export default class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  getProducts = asyncHandler(async (req, res) => {
    const products = await this.productService.getAll();

    res.json(products);
  });

  getTopProducts = asyncHandler(async (req, res) => {
    const topProducts = await this.productService.getTop();

    res.json(topProducts);
  });

  getMyProducts = asyncHandler(async (req, res) => {
    const myProducts = await this.productService.getAllMy(req.user._id);

    res.json(myProducts);
  });

  getProductById = asyncHandler(async (req, res) => {
    const product = await this.productService.getById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await this.productService.delete(req.params.id);

    if (deletedProduct) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  createProduct = asyncHandler(async (req, res) => {
    const createdProduct = await this.productService.add(
      req.user._id,
      req.user.name
    );

    res.status(201).json(createdProduct);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      userProfilePicture,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.userProfilePicture = userProfilePicture;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  addProductReview = asyncHandler(async (req, res) => {
    const reviewedProduct = await this.productService.addReview(
      req.body.rating,
      req.body.comment,
      req.params.id,
      req.user._id,
      req.user.name
    );

    if (reviewedProduct) {
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
}
