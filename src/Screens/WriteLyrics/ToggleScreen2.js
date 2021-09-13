import React, {useEffect, useState} from 'react';

import {Box, Text, Pressable, HStack, Image} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import MenuComponent from '../../Components/MenuComponent';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import RNFetchBlob from 'rn-fetch-blob';
import LeftArrowIcon from '../../Assets/Image/icon_main_left_arrow.png';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
function Basic(props) {
  const [fileList, setFileList] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkPermisson();
    getLyricsList();

    return () => {
      console.log('unmount');
    };
  }, []);

  const checkPermisson = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  //가사 파일 목록 가져오기
  const getLyricsList = async () => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = `${dirs}/lyrics/`;

    const assetsDirExists = await RNFetchBlob.fs.isDir(path);
    if (!assetsDirExists) {
      RNFetchBlob.fs
        .mkdir(path)
        .then(res => {
          console.log('App directory created..');
        })
        .catch(err => {
          console.log(err);
        });
    }
    RNFetchBlob.fs.ls(path).then(files => {
      setFileList(
        files.map((title, index) => ({
          key: `${index}`,
          title: `${title}`,
        })),
      );
    });
  };
  //파일 삭제
  const deleteLyrics = filename => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = `${dirs}/lyrics/${filename}`;
    RNFetchBlob.fs.exists(path).then(async exist => {
      if (!exist) {
        return;
      }
      RNFetchBlob.fs.unlink(path).catch(error => {
        console.log(error);
      });
    });
  };

  //당겨서 새로고침
  const onRefresh = async () => {
    setRefreshing(true);
    getLyricsList();
    setRefreshing(false);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey, title) => {
    closeRow(rowMap, rowKey);
    const newData = [...fileList];
    const prevIndex = fileList.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    deleteLyrics(title);
    setFileList(newData);
  };

  const renderItem = ({item, index}) => (
    <Box>
      <Pressable
        style={{height: responsiveHeight(heightPersentage(60))}}
        onPress={() =>
          props.navigation.navigate('WriteLyrics', {filename: item.title})
        }
        alignItems="center"
        bg="white"
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        underlayColor={'#AAA'}
        _pressed={{
          bg: 'trueGray.200',
        }}>
        <HStack
          width="100%"
          height="100%"
          px={4}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Text
            color={'#1a1b1c'}
            style={{fontSize: responsiveFontSize(fontSizePersentage(17))}}
            fontWeight={600}>
            {item.title.substring(0, item.title.lastIndexOf('_'))}
          </Text>
          <Image
            source={LeftArrowIcon}
            alt=" "
            resizeMode={'contain'}
            style={{width: responsiveWidth(widthPersentage(20))}}
          />
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      <Pressable
        px={4}
        ml="auto"
        bg="#8e8e93"
        justifyContent="center"
        onPress={() =>
          props.navigation.navigate('WriteLyrics', {filename: data.item.title})
        }
        _pressed={{
          opacity: 0.5,
        }}>
        <Text
          color={'white'}
          bold
          style={{fontSize: responsiveFontSize(fontSizePersentage(15))}}>
          Action
        </Text>
      </Pressable>
      <Pressable
        px={4}
        bg="#ff3b30"
        justifyContent="center"
        onPress={() =>
          Alert.alert('Pineapple', '삭제하시겠습니까?', [
            {
              text: '취소',
              onPress: () => {},
            },
            {
              text: '확인',
              onPress: () => deleteRow(rowMap, data.item.key, data.item.title),
            },
          ])
        }
        _pressed={{
          opacity: 0.5,
        }}>
        <Text
          color={'white'}
          bold
          style={{fontSize: responsiveFontSize(fontSizePersentage(15))}}>
          Delete
        </Text>
      </Pressable>
    </HStack>
  );

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'가사 쓰기'}
        navigation={props.navigation}
      />
      <SwipeListView
        data={fileList && fileList}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-165}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Box>
  );
}

export default Basic;
