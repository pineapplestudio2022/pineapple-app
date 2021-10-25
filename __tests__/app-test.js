import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

const getTempComponent = props => {
  return <App {...props} />;
};

describe('[App] Test', () => {
  const props = {};
  const component = getTempComponent(props);
  test('App snapshot', () => {
    jest.useFakeTimers();
    const rendered = render(component);
    expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
    expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
  });
});
