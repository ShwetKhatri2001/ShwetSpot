import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import HomePage from '../HomePage';
import store from '../../redux/store';

describe('HomePage Component', () => {
  const MockHomePage = (
    <MemoryRouter>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockHomePage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
