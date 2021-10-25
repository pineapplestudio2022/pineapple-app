import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import Agreement from '../../../src/Screens/Member/Agreement';
import UserDispatchProvider from '../../../src/Commons/UserDispatchProvider';

const wrapper = ({children}) => (
  <UserDispatchProvider>
    <NavigationContainer>
      <NativeBaseProvider
        initialWindowMetrics={{
          frame: {x: 0, y: 0, width: 0, height: 0},
          insets: {top: 0, left: 0, right: 0, bottom: 0},
        }}>
        {children}
      </NativeBaseProvider>
    </NavigationContainer>
  </UserDispatchProvider>
);

const getTempComponent = props => {
  return <Agreement {...props} />;
};

describe('[Agreement] Test', () => {
  const props = {};
  const component = getTempComponent(props);
  test('Agreement snapshot', () => {
    jest.useFakeTimers();
    const rendered = render(component, {wrapper});
    expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
    expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
  });
  test('has a check box', () => {
    const rendered = render(component, {wrapper});
    rendered.getByText('약관에 전체 동의합니다');
    rendered.getByText('개인정보수집•이용 동의(필수)');
    rendered.getByText('서비스 이용약관 동의(필수)');
  });
  test('Required fields check', () => {
    const rendered = render(component, {wrapper});
    const button = rendered.getByText('동의');
    console.log(button);
    fireEvent.press(button);
    // const privacy = rendered.getByTestId('termscheckbox');
    // // const terms = rendered.getByText('서비스 이용약관 동의(필수)');
    // fireEvent.press(privacy);
    // expect(privacy).toBe(true);
  });
});
