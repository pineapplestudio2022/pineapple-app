import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';

export default class PineappleStudioApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <MainNavigation />
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}

// const App = () => {

//   return (
//     <NavigationContainer>
//       <NativeBaseProvider>
//         <MyDrawer />
//       </NativeBaseProvider>
//     </NavigationContainer>
//   );
// };

// export default App;
