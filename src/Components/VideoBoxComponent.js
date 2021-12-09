import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {Box, Pressable, Text} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';

import DefaultImage from '../Assets/Image/image_singing_dumpimage.jpg';

//thumbnail size type
export const THUMBNAIL_TYPES = {
  default: 'default',
  high: 'hqdefault',
  medium: 'mqdefault',
  standard: 'sddefault',
  maximum: 'maxresdefault',
};

const VideoBox = props => {
  const [ImageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const YoutubeVideoId = props.videoUrl?.substring(
    props.videoUrl.lastIndexOf('/') + 1,
  );

  const url = `https://img.youtube.com/vi/${YoutubeVideoId}/${THUMBNAIL_TYPES.medium}.jpg`;
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        width: responsiveWidth(widthPersentage(props.wp)),
        height: responsiveHeight(heightPersentage(props.hp)),
        borderRadius: props.rounded,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={
          ImageError
            ? DefaultImage
            : {
                uri: url,
              }
        }
        onError={handleImageError}
        alt={DefaultImage}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.8,
          backgroundColor: '#595d62',
        }}
        resizeMode={'cover'}
      />
      <Box
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
          {props.title}
        </Text>
        <Text
          fontSize={responsiveFontSize(fontSizePersentage(15))}
          color={'#fafafa'}
          noOfLines={1}
          w={'95%'}
          textAlign={'right'}>
          {props.participant}
        </Text>
      </Box>
    </Pressable>
  );
};

VideoBox.defaultProps = {
  wp: 320, //width
  hp: 148, //height
  rounded: 8, //borderRadius
};
export default VideoBox;
