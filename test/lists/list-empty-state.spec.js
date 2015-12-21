import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import Sinon from 'sinon';
import ListEmptyState from 'lists/list-empty-state';

describe('ListEmptyState', () => {

  let callback = Sinon.spy();
  let component;
  let domNode;
  let props = {
    buttonLabel: 'Add the thing',
    buttonLink: '#',
    message: "You don't have any of these things!"
  };

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <ListEmptyState {...props} />
    );
    domNode = React.findDOMNode(component);
  })

  it('renders successfully', () => {
    TestUtils.findRenderedDOMComponentWithClass(component, 'list-empty-state');
  });
});
