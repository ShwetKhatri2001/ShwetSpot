import React from 'react';
import renderer from 'react-test-renderer';

import Product from '../Product';
import { MemoryRouter } from 'react-router-dom';

it('should render correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Product
          product={{
            _id: 1,
            image: '/location/images/cat.png',
            name: 'product',
            rating: 5,
            numReviews: 2,
          }}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
