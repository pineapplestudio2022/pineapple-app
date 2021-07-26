import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import {Divider} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';

import {SwipeListView} from 'react-native-swipe-list-view';
import MenuComponent from '../../Components/MenuComponent';

const ToggleC = [
  {
    id: 1,
    title: '가사 제목입니다              〉',
    details: '가사 미리보기 내용입니다',
  },
  {
    id: 1,
    title: '가사 제목입니다               〉 ',
    details: '가사 미리보기 내용입니다',
  },
  {
    id: 1,
    title: '가사 제목입니다              〉',
    details: '가사 미리보기 내용입니다',
  },
  {
    id: 1,
    title: '가사 제목입니다              〉',
    details: '가사 미리보기 내용입니다',
  },
];

function Swipe(props) {
  const [listData] = useState(
    ToggleC.map(ToggleCItem => ({
      key: '${index}',
      title: ToggleCItem.title,
      details: ToggleCItem.details,
    })),
  );
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].deleteRow();
    }
  };
  const VisibleItem = props => {
    const {data} = props;
    return (
      <View>
        <View style={styles.imgbg}>
          <TouchableHighlight
            style={styles.Text1}
            onPress={() => props.navigation.navigate('WriteLyrics')}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {data.item.title}
              </Text>
              <Text style={styles.details} numberOfLines={1}>
                {data.item.details}
              </Text>
              <Divider
                width={responsiveWidth(widthPersentage(420))}
                bordercolor={'#3c3c435c'}
                style={styles.dd}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  const renderItem = data => {
    return <VisibleItem data={data} navigation={props.navigation} />;
  };
  const HiddenItemwithActions = props => {
    const {onClose, onDelete} = props;
    return (
      <View style={styles.Text3}>
        <TouchableOpacity
          style={[styles.backBtn, styles.backRbtn]}
          onPress={onClose}>
          <Text>Action</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backBtn, styles.backLbtn]}
          onPress={onDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemwithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };
  return (
    <View>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <View style={styles.container}>
        <View style={styles.imgbg1}>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={100}
            rightOpenValue={-200}
          />
        </View>
      </View>
    </View>
  );
}

export default Swipe;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imgbg: {
    width: responsiveWidth(widthPersentage(385)), //'100%'
    height: responsiveHeight(heightPersentage(80)), //80,
    backgroundColor: '#fafafa',
  },
  dd: {
    marginTop: 11,
  },
  imgbg1: {
    width: responsiveWidth(widthPersentage(400)), //389.5,
    height: responsiveHeight(heightPersentage(670)), //664,
    borderRadius: 8,
    backgroundColor: 'rgba(250, 250, 250, 0.65)',
    shadowColor: 'rgba(133, 140, 146, 0.2)',
    shadowOpacity: 1,
  },
  backText: {
    color: '#fff',
  },
  /*rowFront*/
  Text1: {
    borderRadius: 5,
    margin: 25,
    marginBottom: 15,
  },
  /*rowFrontvisible*/
  Text2: {
    borderRadius: 5,
    marginBottom: 15,
  },
  /*rowBack*/
  Text3: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderRadius: 5,
  },
  /*backRightbtn*/
  backBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: responsiveWidth(widthPersentage(75)), //75,
    paddingRight: 11,
  },
  /*backRightbtn Left*/
  backRbtn: {
    backgroundColor: '#8e8e93',
    right: 100,
  },
  /*backRightbtn Right*/
  backLbtn: {
    backgroundColor: '#ff3b30',
    right: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    color: 'white',
  },

  trash: {
    width: responsiveWidth(widthPersentage(25)), //25,
    height: responsiveHeight(heightPersentage(25)), //25,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    color: '#1a1b1c',
  },
  details: {
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: -0.1,
    color: '#858c92',
  },
});
