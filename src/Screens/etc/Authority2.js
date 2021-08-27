import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// 요청을 보내기 위해 라이브러리에서 제공해주는 메소드를 사용한다.
// 그리고 결과 처리를 위한 매직넘버가 내부에 선언되어 있어 이를 사용해서 분기 처리를 하면된다.

function App() {
  const checkRecord = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      if (result === RESULTS.GRANTED) {
        console.log('성공');
      }
    } catch (e) {
      console.log('에러{e}');
    }
  };

  useEffect(() => {
    checkRecord();
  }, []);

  return (
    <View>
      <Text>test permissions</Text>
    </View>
  );
}
export default App;
