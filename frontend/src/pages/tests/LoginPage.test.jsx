import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from '../LoginPage';
import store from '../../redux/store';

describe('LoginPage Component', () => {
  const MockLoginPage = (
    <MemoryRouter>
      <Provider store={store}>
        <LoginPage location={{ search: '1' }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockLoginPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
