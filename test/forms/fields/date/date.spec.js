import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import DateField from 'forms/fields/date/date';
import Sinon from 'sinon';

describe('DateField', () => {

  let callback = Sinon.spy();
  let component;
  let domNode;
  let props = { dateFormat: 'MMM D, YYYY' };

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <DateField {...props} />
    );
    domNode = React.findDOMNode(component);
  })

  it('renders successfully', () => {
    TestUtils.findRenderedDOMComponentWithClass(component, 'date-field');
  });
});
