import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import RegisterPage from '../RegisterPage';
import store from '../../redux/store';

describe('RegisterPage Component', () => {
  const MockRegisterPage = (
    <MemoryRouter>
      <Provider store={store}>
        <RegisterPage location={{ search: '1' }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockRegisterPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
