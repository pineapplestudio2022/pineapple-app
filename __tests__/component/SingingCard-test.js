import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {render} from '@testing-library/react-native';
import SingingCard from '../../src/Components/SingingCardComponent';

const wrapper = ({children}) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

let props;
let component;

const getTempComponent = props => {
  return <SingingCard {...props} />;
};

describe('[SingingCard] Test', () => {
  //random.math mock
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  props = {};
  component = getTempComponent(props);
  test('SingingCard snapshot', () => {
    jest.useFakeTimers();
    const rendered = render(component, {wrapper});
    expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
    expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
  });
});
