import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import React from 'react';
import Sinon from 'sinon';
import FieldSet from 'forms/field-set';

describe('FieldSet', () => {

  let callback = Sinon.spy();
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <FieldSet>{"test"}</FieldSet>
    );
  });

  it('renders successfully', () => {
    TestUtils.findRenderedDOMComponentWithClass(component, 'field-set');
  });
});
