import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import Home from '../src/Screens/Home/';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';

const wrapper = ({children}) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: {x: 0, y: 0, width: 0, height: 0},
      insets: {top: 0, left: 0, right: 0, bottom: 0},
    }}>
    {children}
  </NativeBaseProvider>
);

describe('[Home] Test', () => {
  let mock = new mockAdapter(axios);

  const onPressMock = jest.fn();
  const navigationMock = jest.fn();
  const props = {
    route: {name: 'home'},
    musicList: {
      id: '1',
      title: 'title',
      participant: 'owner',
    },
    navigation: {navigate: navigationMock},
    onPress: onPressMock,
  };
  mock
    .onPost('/challenge/getRankedChallenges')
    // test('버튼이 눌린다.', () => {
    //   let rendered;
    //   act(() => {
    //     rendered = render(<Home {...props} />, {wrapper});
    //   });

    //   fireEvent(rendered.getByText('Challenge'), 'onPress');
    // });

    .test('버튼이 눌린다2.', async () => {
      let rendered;
      await waitFor(() => {
        rendered = render(<Home {...props} />, {wrapper});
      });

      fireEvent(rendered.getByText('Challenge'), 'onPress');
    });

  // test('matched snapshot', () => {
  //   const rendered = render(<Home {...props} />, {wrapper});
  //   expect(rendered).toMatchSnapshot();
  //   expect(rendered).toBeTruthy();
  // });
});
// test('GbuttonPresenter test', () => {
//   const rendered = render(<Home />, {wrapper}).toJSON();
//   expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
//   expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
// });
