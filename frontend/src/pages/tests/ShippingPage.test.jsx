import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ShippingPage from '../ShippingPage';
import store from '../../redux/store';

describe('ShippingPage Component', () => {
  const MockShippingPage = (
    <MemoryRouter>
      <Provider store={store}>
        <ShippingPage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockShippingPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
