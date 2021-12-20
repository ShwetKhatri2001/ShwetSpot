import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CartPage from '../CartPage';
import store from '../../redux/store';

describe('CartPage Component', () => {
  const MockCartPage = (
    <MemoryRouter>
      <Provider store={store}>
        <CartPage match={{ params: { id: 1 } }} location={{ search: '1' }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockCartPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
