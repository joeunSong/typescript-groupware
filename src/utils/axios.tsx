// * install librarys
import axios from 'axios';
import { AccessToken } from '../constants/constant';

const ApiClient = () => {
  // * 기초 설정
  const defaultOptions = {
    baseURL: process.env.LOCAL_SERVER_API_URL,
    headers: {
      'Content-Type': 'application/json',
      // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      // "Accept-Encoding": "identity",
      'Access-Control-Allow-Origin': '*',
      // origin: "http://localhost:3000",
      // Accept: "application/json",
    },
    withCredentials: true,
  };
  // * instance 생성
  const instance = axios.create(defaultOptions);
  // * Token 설정
  instance.interceptors.request.use(async (req: any) => {
    let session = localStorage.getItem(AccessToken);
    if (session !== undefined) {
      req.headers.Authorization = `Bearer ${session}`;
    } else {
      req.headers.Authorization = '';
    }

    return req;
  });
  // * 상태값에 따른 결과
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const result = err.response;
      let errMessage: string = '';

      // error response가 떨어지지 않는 경우
      if (!err.response) {
        return Promise.reject(err);
      }

      // * 상태 값에 따른 결과
      if (result.status === 500 || result.data === undefined) {
        errMessage = '서버와의 통신에 실패하였습니다.';
      } else {
        if (result.status === 419 || result.status === 410) {
          setTimeout(() => {
            // 세션 만료시 로그인으로 튕기게
          }, 1500);
        }
        errMessage = result.data.message;

        if (result.status === 429) {
          errMessage = `요청횟수가 초과되었습니다/ 나중에 시도해주세요.`;
        }
        if (errMessage === undefined) {
          errMessage = `에러가 발생했습니다. 관리자에게 문의해주세요.`;
        } else if (errMessage.length === 0) {
          errMessage = `에러가 발생했습니다. 관리자에게 문의해주세요.`;
        }

        // 해당 부분에서 결과에 따른 Toast메세지 띄워야합니다.
      }

      return Promise.reject(err);
    },
  );

  // * BaseURL 변경
  const setBaseURL = (newURL: any) => {
    instance.defaults.baseURL = newURL;
  };

  return { instance, setBaseURL };
};

export default ApiClient();
