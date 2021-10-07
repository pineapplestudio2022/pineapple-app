import React from 'react';

import {Box} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import MenuComponent from '../../../Components/MenuComponent';

const LyricsListViewPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'가사 쓰기'}
        navigation={props.navigation}
      />
      <SwipeListView
        data={props.fileList && props.fileList}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        renderItem={props.renderItem}
        renderHiddenItem={props.renderHiddenItem}
        rightOpenValue={-165}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default LyricsListViewPresenter;
