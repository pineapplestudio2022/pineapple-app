import React from 'react';

const ZEPLIN_DEVICE_WIDTH = 390;
const ZEPLIN_DEVICE_HEIGHT = 843;

export function widthPersentage(width) {
  const persentage = (width / ZEPLIN_DEVICE_WIDTH) * 100;
  return persentage;
}
export function heightPersentage(height) {
  const persentage = (height / ZEPLIN_DEVICE_HEIGHT) * 100;
  return persentage;
}

export function fontSizePersentage(size) {
  const persentage = size * 0.125;
  return persentage;
}
