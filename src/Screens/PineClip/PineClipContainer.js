import React from 'react';
import {useState} from 'react';
import PineClipPresenter from './PineClipPresenter';

const tempData = [
  {
    id: '1',
    title: 'title1',
    category: 'washing',
    url: 'https://youtu.be/L3kbuFsuhPI',
  },
  {
    id: '2',
    title: 'title2',
    category: 'pinedoll',
    url: 'https://youtu.be/uZGfWDU9gwQ',
  },
  {
    id: '3',
    title: 'title3',
    category: 'interview',
    url: 'https://youtu.be/CuklIb9d3fI',
  },
  {
    id: '4',
    title: 'title4',
    category: 'interview',
    url: 'https://youtu.be/NVzV6A0Xfes',
  },
  {
    id: '5',
    title: 'title5',
    category: 'washing',
    url: 'https://youtu.be/sDcWpbkyxu4',
  },
  {
    id: '6',
    title: 'title6',
    category: 'pinedoll',
    url: 'https://youtu.be/amOSaNX7KJg',
  },
];
const PineClipContainer = props => {
  const [category, setCategory] = useState(0);

  return (
    <PineClipPresenter
      {...props}
      videoList={tempData}
      category={category}
      setCategory={setCategory}
    />
  );
};

export default PineClipContainer;
