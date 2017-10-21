import React from 'react';
import renderer from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import ErrorBoundary from './ErrorBoundary';

describe('SearchPage Container', () => {
  let props;

  const build = () => {
    return shallow(<ErrorBoundary {...props} />);
  };

  beforeAll(() => {
    props = {
      children: <h1>Hello World</h1>
    };
  });

  it('shows an error message when application throws an error', () => {
    const wrapper = build();
    wrapper.instance().componentDidCatch('Critical error!', 'More info here');
    wrapper.update();
    expect(wrapper.html()).toContain('somethingWhentWrong');
  });

  it('renders children if there isnt errors', () => {
    const wrapper = build();
    expect(wrapper.html()).toContain('Hello World');
  });
});
