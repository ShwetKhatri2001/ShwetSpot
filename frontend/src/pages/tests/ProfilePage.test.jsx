import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import ProfilePage from '../ProfilePage';

const mockStore = configureMockStore();
const store = mockStore({
  userLogin: { userInfo: [] },
  userDetails: { loading: false, error: false, user: '' },
  userUpdateProfile: { success: true },
  orderListMy: { loading: false, error: false, orders: [] },
});

describe('ProfilePage Component', () => {
  const MockProfilePage = (
    <MemoryRouter>
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </MemoryRouter>
  );

  it('should match the snapshot', () => {
    const tree = renderer.create(MockProfilePage).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
