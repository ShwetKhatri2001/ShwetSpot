import React from 'react';
import renderer from 'react-test-renderer';

import CheckoutBar from '../CheckoutBar';

it('should render correctly', () => {
  const tree = renderer.create(<CheckoutBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
