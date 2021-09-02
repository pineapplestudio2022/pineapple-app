import {Pressable, Text} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';
import DefaultImage from '../Assets/Image/image_singing_dumpimage.jpg';
import {BlurView} from '@react-native-community/blur';
class VideoBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Pressable
        onPress={this.props.onPress}
        style={{
          width: responsiveWidth(widthPersentage(this.props.wp)),
          height: responsiveHeight(heightPersentage(this.props.hp)),
          borderRadius: this.props.rounded,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={this.props.bgimg ? this.props.bgimg : DefaultImage}
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.8,
            backgroundColor: '#595d62',
          }}
          resizeMode={'center'}
        />
        <BlurView
          blurType="light"
          blurAmount={6}
          reducedTransparencyFallbackColor="white"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: responsiveHeight(heightPersentage(52)),
            backgroundColor: '#1a1b1c80',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(15))}
            bold
            color={'#4be3ac'}
            noOfLines={1}
            w={'95%'}
            textAlign={'right'}>
            {this.props.title}
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(15))}
            color={'#fafafa'}
            noOfLines={1}
            w={'95%'}
            textAlign={'right'}>
            {this.props.participant}
          </Text>
        </BlurView>
      </Pressable>
    );
  }
}

VideoBox.defaultProps = {
  wp: 320, //width
  hp: 148, //height
  title: '음원제목',
  participant: '소유자',
  rounded: 8, //borderRadius
};

export default VideoBox;
