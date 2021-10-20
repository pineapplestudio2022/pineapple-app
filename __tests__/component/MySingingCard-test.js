import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {render} from '@testing-library/react-native';
import MySingingCard from '../../src/Components/MySingingCardComponent';
import ShallowRenderer from 'react-test-renderer/shallow';
import UserDispatchProvider from '../../src/Commons/UserDispatchProvider';

const wrapper = ({children}) => (
  <UserDispatchProvider>
    <NativeBaseProvider
      initialWindowMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}>
      {children}
    </NativeBaseProvider>
  </UserDispatchProvider>
);

// let realUseContext;
// let useContextMock;
// // Setup mock
// beforeEach(() => {
//   realUseContext = React.useContext;
//   useContextMock = React.useContext = jest.fn();
// });
// // Cleanup mock
// afterEach(() => {
//   React.useContext = realUseContext;
// });

// test('mock hook', () => {
//   useContextMock.mockReturnValue('Test Value');
//   const element = new ShallowRenderer().render(<MySingingCard />);
//   expect(element).toMatchSnapshot(); //기존 스냅샷과 일치하는지
//   expect(element).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
// });

let props;
let component;

const getTempComponent = props => {
  return <MySingingCard {...props} />;
};

describe('[MySingingCard] Test', () => {
  //random.math mock
  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  props = {
    navigation: jest.fn(),
    id: '275',
    originalWorkId: '35',
    title: 'title_',
    genre: 'genre_',
    detail: 'detail_',
    setRefresh: jest.fn(),
  };

  component = getTempComponent(props);

  test('MySingingCard snapshot', () => {
    jest.useFakeTimers();
    const rendered = render(component, {wrapper});

    expect(rendered).toMatchSnapshot(); //기존 스냅샷과 일치하는지
    expect(rendered).toBeTruthy(); //컴포넌트가 null, undefinded 같이 falsy 한 값을 가지지 않았는지
  });
});
