import React from 'react';
import renderer from 'react-test-renderer';

import FormContainer from '../FormContainer';

it('should render correctly', () => {
  const tree = renderer.create(<FormContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
