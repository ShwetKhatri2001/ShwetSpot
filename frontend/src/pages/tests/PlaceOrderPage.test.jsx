import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import PlaceOrderPage from '../PlaceOrderPage';
import store from '../../redux/store';

describe('PlaceOrderPage Component', () => {
  const MockPlaceOrderPage = (
    <MemoryRouter>
      <Provider store={store}>
        <PlaceOrderPage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockPlaceOrderPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
