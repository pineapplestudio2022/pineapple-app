/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//reactotron
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);

/*
[1]
npm i react-native-audio-recorder-player
pod install 이후 빌드 실패시
xcode로 프로젝트 실행
프로젝트 클릭 후 build setting에서 excluded architectures arm64 로 적용 >> EXCLUDED_ARCHS = arm64;
실제 디바이스에 빌드시에 다시 원상태로 돌려줘야함
https://github.com/react-native-seoul/react-native-naver-login/issues/66

[2]
youtube pod install시 오류나면
https://github.com/CocoaPods/CocoaPods/issues/10723
참조
arch -x86_64 pod install


[3]
rn-fetch-blob 에서 cycle warning 나오는 경우
node-module 폴더 > rn-fetch-blob 폴더 안에 Blob.js, Fetch.js, FileReader.js, XMLHttpRequest.js
네개 파일들의 내용 수정
----------------------------------------------------------
 import RNFetchBlob from '../index.js'
----------------------------------------------------------
위 부분을 아래처럼
----------------------------------------------------------
// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob
----------------------------------------------------------

[4]
릴리즈 빌드시
- Info.plist 에서 다음 내용을 삭제한다. 앱 내부에서 외부 API를 호출할 때, HTTPS만 사용할 수 있게 한다.
- 앱을 개발할때는 로컬 서버와 HTTP로 통신하기 때문에 다시 이 부분을 넣어줘야 한다.
----------------------------------------------------------
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>localhost</key>
    <dict>
      <key>NSExceptionAllowsInsecureHTTPLoads</key>
      <true/>
    </dict>
  </dict>
</dict>
----------------------------------------------------------
*/
