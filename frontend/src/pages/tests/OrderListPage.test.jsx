import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import OrderListPage from '../OrderListPage';
import store from '../../redux/store';

describe('OrderListPage Component', () => {
  const MockOrderListPage = (
    <MemoryRouter>
      <Provider store={store}>
        <OrderListPage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockOrderListPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
