import React from 'react';
import { ShallowWrapper, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from 'app/App';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('instantiate correctly', () => {
    const result: ShallowWrapper = shallow(<App />);

    expect(result.contains('Hello world!')).toBeTruthy();
  });
});
