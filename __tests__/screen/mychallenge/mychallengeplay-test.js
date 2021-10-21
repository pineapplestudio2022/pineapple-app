import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyChallengePlay from '../../../src/Screens/MyChallenge/MyChallengePlay';
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
  return <MyChallengePlay {...props} />;
};

describe('[MyChallengePlay] Test', () => {
  const props = {
    route: {
      name: 'MyPlay',
    },
  };
  const component = getTempComponent(props);
  test('MyChallengePlay snapshot', () => {
    jest.useFakeTimers();
    const rendered = render(component, {wrapper});
    expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
    expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
  });
});
