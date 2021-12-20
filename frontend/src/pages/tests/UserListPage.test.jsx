import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import UserListPage from '../UserListPage';
import store from '../../redux/store';

describe('UserListPage Component', () => {
  const MockUserListPage = (
    <MemoryRouter>
      <Provider store={store}>
        <UserListPage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockUserListPage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
