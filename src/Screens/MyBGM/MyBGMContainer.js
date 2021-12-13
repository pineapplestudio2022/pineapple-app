import React from 'react';
import MyBGMPresenter from './MyBGMPresenter';
const tempData = [
  {
    id: '1',
    createdAt: '2021-12-10',
    keyword: ['필라테스배경음악', '운동할때듣는음악', '조용한음악'],
    whereUse: '기구 필라테스 체육관',
  },
  //   {
  //     id: '2',
  //     createdAt: '2021-01-02',
  //     keyword: ['d', 'e', 'f'],
  //     whereUse: 'commercial',
  //   },
  //   {
  //     id: '3',
  //     createdAt: '2021-01-05',
  //     keyword: ['g', 'h', 'i'],
  //     whereUse: 'assignment',
  //   },
  //   {
  //     id: '4',
  //     createdAt: '2021-04-01',
  //     keyword: ['j', 'k', 'l'],
  //     whereUse: 'commercial',
  //   },
  //   {
  //     id: '5',
  //     createdAt: '2021-06-03',
  //     keyword: ['m', 'n'],
  //     whereUse: 'collect',
  //   },
];
const MyBGMContainer = props => {
  return <MyBGMPresenter {...props} myBGMList={tempData} />;
};
export default MyBGMContainer;
