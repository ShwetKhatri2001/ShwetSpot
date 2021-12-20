import React from 'react';
import renderer from 'react-test-renderer';

import SearchBox from '../SearchBox';
import { MemoryRouter } from 'react-router-dom';

it('should render correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
