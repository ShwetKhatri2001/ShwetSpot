import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import ProductEditPage from '../ProductEditPage';

const mockStore = configureMockStore();

const store = mockStore({
  userDetails: { user: '' },
  productDetails: { loading: false, error: false, product: '' },
  productUpdate: { loading: false, error: false, success: true },
});

describe('ProductEditPage Component', () => {
  Storage.prototype.getItem = jest.fn(() => 'user');

  const MockProductEditPage = (
    <MemoryRouter initialEntries={['/profile']}>
      <Provider store={store}>
        <ProductEditPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProductEditPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
