import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import UserEditPage from '../UserEditPage';
import store from '../../redux/store';

describe('UserEditPage Component', () => {
  const MockUserEditPage = (
    <MemoryRouter>
      <Provider store={store}>
        <UserEditPage match={{ params: { id: 1 } }} />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockUserEditPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
