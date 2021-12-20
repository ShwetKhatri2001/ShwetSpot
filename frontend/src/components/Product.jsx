import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="mb-3 p-3 rounded h-auto" id="product">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <h4>{product.name}</h4>
          </Card.Title>
        </Link>

        {product.numReviews > 1 || product.numReviews === 0 ? (
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
        ) : (
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} review`}
            />
          </Card.Text>
        )}

        <Card.Text as="h4" className="pb-0 pt-2">
         &#8377; {product.price} 
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
