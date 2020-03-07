import React from 'react';
import Pocket from '../components/pocket';
import renderer from 'react-test-renderer';

test('Pocket renders a currency and Amount', () => {
  const component = renderer.create(
    <Pocket currency="USD" amount="100"></Pocket>,
  );
  let tree = component.toJSON();
  const instance = component.root;
  const spans = instance.findAllByType('span');
  const [firstSpan, secondSpan] = spans;
  expect(firstSpan.props.className).toEqual(expect.stringContaining('flag-icon-us'));
  expect(secondSpan.children[0]).toEqual(expect.stringContaining("$100"));
  expect(tree).toMatchSnapshot();
})
