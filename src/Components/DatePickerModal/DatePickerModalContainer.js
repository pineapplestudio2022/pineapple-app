import moment from 'moment';
import React from 'react';
import {useState} from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fontSizePersentage} from '../../Commons/CommonUtil';
import DatePickerModalPresenter from './DatePickerModalPresenter';

const DatePickerModalContainer = props => {
  const [showModal, setShowModal] = useState(false);
  const minDate = new Date();

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      const end = moment(date).format('YYYY-MM-DD');
      props.setEndDate(end);
      setShowModal(false);
    } else {
      const start = moment(date).format('YYYY-MM-DD');
      props.setStartDate(start);
    }
  };
  const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
    switch (dayOfWeek) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return {
          textStyle: {
            color: '#4be3ac',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
      case 6: //토요일
        return {
          textStyle: {
            color: 'blue',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
      case 7: //일요일
        return {
          textStyle: {
            color: 'red',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
    }
  };

  const customDatesStylesCallback = date => {
    switch (date.isoWeekday()) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return {
          textStyle: {
            color: '#4be3ac',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
      case 6: //토요일
        return {
          textStyle: {
            color: 'blue',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
      case 7: //일요일
        return {
          textStyle: {
            color: 'red',
            fontSize: responsiveFontSize(fontSizePersentage(13)),
          },
        };
    }
  };
  return (
    <DatePickerModalPresenter
      {...props}
      showModal={showModal}
      setShowModal={setShowModal}
      onDateChange={onDateChange}
      minDate={minDate}
      customDayHeaderStylesCallback={customDayHeaderStylesCallback}
      customDatesStylesCallback={customDatesStylesCallback}
    />
  );
};

export default DatePickerModalContainer;
