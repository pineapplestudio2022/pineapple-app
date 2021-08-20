import React from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';

import {Text, Button, Container, Center, Box, ScrollView} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';

/*윤호님 카드 컴포넌트 작성법 참조해서 상단에 배경화면들 임포트하기*/
export default function ChallengeVideo(props) {
  return (
    <Box>
      <MenuComponent
        name={props.route.name}
        titleName={'15초 영상챌린지'}
        navigation={props.navigation}
      />
      <ScrollView>
        <Container>
          <Center>
            <Button
              backgroundColor={'#0fefbd'}
              onPress={() => props.navigation.navigate('MyChallenge')}>
              MY CHANLLENGE
            </Button>
            <Text style={styles.Fo}>귀요미 챌린지</Text>
            <Box>
              <ImageBackground
                source={require('../../Assets/Image/challenge/15challenge1.png')}
                style={styles.img}>
                <Image
                  source={require('../../Assets/Image/challenge/02PlayBtn.png')}
                  style={styles.imgbtn}
                  alt={' '}
                />
              </ImageBackground>
            </Box>
            <Box>
              <Text style={styles.txt}>
                <Text style={styles.txt1}>작곡:</Text> 뮤지아{'  '}
                <Text style={styles.txt1}>편곡:</Text> 뮤지아{'  '}
                <Text style={styles.txt1}>안무:</Text> 뮤지아
              </Text>
              <Box>
                <Button backgroundColor={'#0fefbd'} style={styles.mbody}>
                  참여신청
                </Button>
              </Box>
            </Box>

            <Text style={styles.Fo}> 우리아이 챌린지</Text>
            <Box>
              <ImageBackground
                source={require('../../Assets/Image/challenge/15challenge2.png')}
                style={styles.img}>
                <Image
                  source={require('../../Assets/Image/challenge/02PlayBtn.png')}
                  style={styles.imgbtn}
                  alt={' '}
                />
              </ImageBackground>
            </Box>
            <Box>
              <Text style={styles.txt}>
                <Text style={styles.txt1}>작곡:</Text> 뮤지아{'  '}
                <Text style={styles.txt1}>편곡:</Text> 뮤지아{'  '}
                <Text style={styles.txt1}>안무:</Text> 뮤지아
              </Text>
              <Box>
                <Button backgroundColor={'#0fefbd'} style={styles.mbody}>
                  참여신청
                </Button>
              </Box>
            </Box>
          </Center>
        </Container>
      </ScrollView>
    </Box>
  );
}
const styles = StyleSheet.create({
  bgimg: {
    width: '100%',
    height: 800,
  },
  mbody: {
    width: 220,
    height: 40,
    marginBottom: 20,
    marginLeft: 100,
    marginRight: 80,
  },
  imgbtn: {
    width: 44,
    height: 46,
    marginTop: 128,
    marginLeft: 138,
    marginRight: 138,
    // justifyContent:'center',
    // alignItems:'center',
  },

  Fo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 48,
    letterSpacing: -0.11,
    color: '#1a1b1c',
  },

  img: {
    width: 310,
    height: 320,
  },

  txt: {
    marginLeft: 60,
    marginRight: 50,
    letterSpacing: 0,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#858c92',
  },

  txt1: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#858c92',
  },

  txt2: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    color: '#1a1b1c',
  },

  himg: {
    marginLeft: 300,
  },
});
