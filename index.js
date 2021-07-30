/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/*
npm i react-native-audio-recorder-player 
pod install 이후 빌드 실패시
xcode로 프로젝트 실행
프로젝트 클릭 후 build setting에서 excluded architectures arm64 로 적용 >> EXCLUDED_ARCHS = arm64;
https://github.com/react-native-seoul/react-native-naver-login/issues/66
*/
