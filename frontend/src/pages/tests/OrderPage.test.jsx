import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import OrderPage from '../OrderPage';
import store from '../../redux/store';

describe('OrderPage Component', () => {
  const MockOrderPage = (
    <MemoryRouter>
      <Provider store={store}>
        <OrderPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockOrderPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
