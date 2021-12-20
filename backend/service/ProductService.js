import Product from '../model/productModel.js';

export default class ProductService {
  constructor() {}

  getAll = async () => {
    return await Product.find({});
  };

  getTop = async () => {
    return await Product.find({}).sort({ rating: -1 }).limit(3);
  };

  getAllMy = async userId => {
    return await Product.find({ user: userId });
  };

  getById = async productId => {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product with ${productId} id not found`);
    }

    return product;
  };

  add = async (user, seller) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: user,
      seller: seller,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    return await product.save();
  };

  update = async (
    productId,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    userProfilePicture
  ) => {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.userProfilePicture = userProfilePicture;

    return await product.save();
  };

  addReview = async (rating, comment, productId, userId, userName) => {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      throw new Error('Product already reviewed');
    }

    const review = {
      name: userName,
      rating: Number(rating),
      comment,
      user: userId,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    return await product.save();
  };

  delete = async productId => {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product with ${productId} not found`);
    }

    return await product.remove();
  };
}
