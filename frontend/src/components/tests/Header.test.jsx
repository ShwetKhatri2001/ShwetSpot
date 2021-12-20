import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';
import store from '../../redux/store';

describe('Header Component', () => {
  const MockHeader = (
    <MemoryRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  it('should render correctly', () => {
    const wrapper = shallow(MockHeader);
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('should match the snapshot', () => {
    const tree = renderer.create(MockHeader).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
