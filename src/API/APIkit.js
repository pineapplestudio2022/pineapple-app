import axios from 'axios';

let APIKit = axios.create({
  baseURL: 'http://localhost:3000',
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
