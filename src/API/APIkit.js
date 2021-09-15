import axios from 'axios';

let APIKit = axios.create({
  // 로컬서버
  baseURL: 'http://localhost:3000',

  // 개발서버
  // baseURL: 'https://cupping2.shop',

  // 운영서버
  // baseURL: 'https://pineapplestudio.app',

  // timeout: 1000,
});

let tokenIntercepter;

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  tokenIntercepter = APIKit.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
};

export const cleanClientToken = () => {
  APIKit.interceptors.request.eject(tokenIntercepter);
  console.log('인터셉터 해제');
};

export default APIKit;
