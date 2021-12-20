import React from 'react';
import renderer from 'react-test-renderer';

import Rating from '../Rating';

it('should render correctly', () => {
  const tree = renderer.create(<Rating />).toJSON();
  expect(tree).toMatchSnapshot();
});
