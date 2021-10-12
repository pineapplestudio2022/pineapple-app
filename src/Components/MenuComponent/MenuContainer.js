//상단 헤더, 햄버거 메뉴 컴포넌트
import React from 'react';
import LeftArrowIcon from '../../Assets/Image/icon_main_left_arrow.png';
import LyricsGoBackIcon from '../../Assets/Image/icon_menu_lyrics_goback.png';
import MenuPresenter from './MenuPresenter';

const MenuContainer = props => {
  const handlerToggleDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const handlerGoBack = () => {
    props.navigation.goBack();
  };
  const handlerResetNavigation = () => {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'DrawerNavigation'}],
    });
  };
  const handlerGoLyrics = () => {
    props.navigation.navigate('WriteLyrics', {filename: ''});
  };
  const handlerOnSave = () => {
    props.onSave();
  };
  const handlerGetLeftImageIcon = () => {
    if (props.name === 'WriteLyrics') {
      return LyricsGoBackIcon;
    } else {
      return LeftArrowIcon;
    }
  };
  return (
    <MenuPresenter
      {...props}
      handlerToggleDrawer={handlerToggleDrawer}
      handlerGoBack={handlerGoBack}
      handlerGetLeftImageIcon={handlerGetLeftImageIcon}
      handlerGoLyrics={handlerGoLyrics}
      handlerOnSave={handlerOnSave}
      handlerResetNavigation={handlerResetNavigation}
    />
  );
};

export default MenuContainer;
