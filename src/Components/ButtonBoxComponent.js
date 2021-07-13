import React, {Component} from 'react';
import {TouchableOpacity, ImageBackground} from 'react-native';
import {Text, Center, Image} from 'native-base';

export default class MyButton extends Component {
  render() {
    const {text, imgPath, onPress} = this.props;
    // const path = `../Assets/Image/` + imgPath;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Center size={140} rounded="xl" borderWidth="1" borderColor="#0fefbd">
          <Image
            source={require(`../Assets/Image/btn_challenge_singing.png`)}
            resizeMode={'contain'}
          />
          <Text marginTop="2" color="#4be3ac">
            {text}
            {imgPath}
          </Text>
        </Center>
      </TouchableOpacity>
    );
  }
}
