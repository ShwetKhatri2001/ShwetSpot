import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import PaymentPage from '../PaymentPage';
import store from '../../redux/store';

describe('PaymentPage Component', () => {
  const MockPaymentPage = (
    <MemoryRouter>
      <Provider store={store}>
        <PaymentPage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockPaymentPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
