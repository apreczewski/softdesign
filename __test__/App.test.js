import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App'
import Routes from '../src/routes'


describe('Testing App Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <App >
        <Routes/>
      </App>
    );
    
    expect(wrapper).toMatchSnapshot();
  });
});