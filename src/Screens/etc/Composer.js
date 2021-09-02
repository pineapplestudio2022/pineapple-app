import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  Text,
  Button,
  Heading,
  Container,
  Center,
  Box,
  ScrollView,
  ImageBackground,
} from 'native-base';

const Composer = props => {
  return (
    <ScrollView>
      <ImageBackground
        source={require('../Images/main_bg.png')}
        style={styles.bgimg}>
        <Container>
          <Heading>{'\n'}</Heading>
          <Center>
            <Image
              source={require('../Images/24Home.png')}
              style={styles.himg}
            />
            <Button backgroundColor={'#0fefbd'}> MY CHANLLENGE </Button>
            <Text style={styles.Fo}>귀요미 챌린지</Text>
            <Box>
              <Image
                source={require('../Images/15challenge1.png')}
                style={styles.img}
              />
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
              <Image
                source={require('../Images/15challenge2.png')}
                style={styles.img}
              />
              <Box>
                <Button>참여신청</Button>
              </Box>
            </Box>
          </Center>
        </Container>
      </ImageBackground>
    </ScrollView>
  );
};
export default Composer;
const styles = StyleSheet.create({
  bgimg: {
    width: '100%',
    height: 800,
  },
  mbody: {
    width: 220,
    height: 40,
    borderRadius: 8,
    marginBottom: 20,
    marginLeft: 80,
    marginRight: 80,
  },

  Fo: {
    width: 320,
    height: 58,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 48,
    letterSpacing: -0.11,
    textAlign: 'center',
    color: '#1a1b1c',
  },

  img: {
    width: 310,
    height: 320,
    borderRadius: 8,
  },

  txt: {
    marginLeft: 60,
    marginRight: 50,
    letterSpacing: 0,
  },

  txt1: {
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  himg: {
    marginLeft: 300,
  },
});
