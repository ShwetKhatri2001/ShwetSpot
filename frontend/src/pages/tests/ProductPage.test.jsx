import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProductPage from '../ProductPage';
import store from '../../redux/store';

describe('ProductPage Component', () => {
  const MockProductPage = (
    <MemoryRouter>
      <Provider store={store}>
        <ProductPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProductPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
