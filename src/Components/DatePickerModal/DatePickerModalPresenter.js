import React from 'react';
import {Box, Modal} from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {widthPersentage} from '../../Commons/CommonUtil';

import DatePickerIcon from '../../Assets/Image/icon_datepicker_green.png';

const DatePickerModalPresenter = props => {
  return (
    <>
      <TouchableOpacity onPress={() => props.setShowModal(true)}>
        <Image
          alt={' '}
          source={DatePickerIcon}
          resizeMode={'contain'}
          width={responsiveWidth(widthPersentage(25))}
        />
      </TouchableOpacity>
      <Modal
        isOpen={props.showModal}
        onClose={() => props.setShowModal(false)}
        shadow={4}>
        <Box
          backgroundColor={'#ffffff'}
          overflow="hidden"
          borderRadius={16}
          pb={4}
          pt={4}>
          <CalendarPicker
            onDateChange={props.onDateChange}
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={props.minDate}
            weekdays={['월', '화', '수', '목', '금', '토', '일']}
            months={[
              '1월',
              '2월',
              '3월',
              '4월',
              '5월',
              '6월',
              '7월',
              '8월',
              '9월',
              '10월',
              '11월',
              '12월',
            ]}
            previousTitle={'  이전'}
            nextTitle={'다음  '}
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#feff92"
            selectedDayTextColor="#000000"
            scaleFactor={375}
            yearTitleStyle={{
              color: '#4be3ac',
              fontWeight: 'bold',
            }}
            monthTitleStyle={{
              color: '#4be3ac',
              fontWeight: 'bold',
            }}
            customDayHeaderStyles={props.customDayHeaderStylesCallback}
            customDatesStyles={props.customDatesStylesCallback}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DatePickerModalPresenter;
