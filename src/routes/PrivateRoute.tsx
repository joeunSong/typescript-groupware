// * basic
// * install libraries
import { Navigate, Outlet, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
// * components
// * constants
import * as ENDPOINT from '../constants/apiEndpoints';
import { LOGIN_AUTH } from '../constants/constant';
// * apis

/**
 * 해당 Route의 기능은
 * 사용자 페이지, 관리자 페이지 별로 접근 권한이 다른데 해당 메뉴에 접근이 가능한지 판단해주는 Route이다.
 * 로그인한 사용자에대해서 메뉴의 대한 접근 가능 여부를 판단해주기 때문에
 * 해당 Route는 어느 로그인 페이지로 로그인했는지에 대한 정보가 필요합니다.
 */

// TODO 사용자 로그인 이후 로그인 페이지, 관리자 페이지로 url 바꾸는 경우 login으로 이동은 하나 컴포넌트가 안뜸 해당 현상 추후 해결 (이거 로컬스토리지 없어서 그런듯? API 정상적으로 호출하면 해결 될듯?)
const PrivateRoute = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();

  let isAuthentication = localStorage.getItem(LOGIN_AUTH);

  /*
   * 로그인 하지 않았던 사용자는 로그인 페이지만 접근 가능
   * 그외에 접근시 로컬스토리지 클리어 후 사용자 로그인 페이지로 이동
   */
  if (isAuthentication === null) {
    if (_.includes(location?.pathname, '/login')) {
      return <Outlet />;
    } else {
      localStorage.clear();
      navigate(ENDPOINT.USER_LOGIN);
    }
  } else {
    if (isAuthentication === 'user') {
      /*
       * 사용자로 로그인 하였으나 다시 로그인 페이지에 진입하려고 시도, 관리자 페이지로 접근을 시도한다면 사용자 메인 페이지로 이동
       * 사용자 페이지로 로그인한 사용자가 사용자 페이지로 접근 시 허용
       */
      if (_.includes(location?.pathname, '/login') || _.includes(location?.pathname, '/admin')) {
        return <Navigate to={ENDPOINT.USER_MAIN} />;
      } else {
        return <Outlet />;
      }
    } else if (isAuthentication === 'admin') {
      /*
       * 관리자 페이지로 로그인 하였으나 로그인 페이지에 진입하려고 시도, 사용자 페이지로 접근을 시도한다면 관리자 메인 페이지로 이동
       * 관리자 페이지로 로그인한 사용자가 관리자 페이지로 접근 시 허용
       */
      if (_.includes(location?.pathname, '/login') || _.includes(location?.pathname, '/user')) {
        return <Navigate to={ENDPOINT.ADMIN_DASHBOARD} />;
      } else {
        return <Outlet />;
      }
    } else {
      /*
       * 사용자, 관리자로 로그인하지 않고 비정상적인 경로로 접근한 사용자
       * 로컬스토리지 초기화 후 사용자 로그인 페이지로 이동
       */
      localStorage.clear();
      navigate(ENDPOINT.USER_LOGIN);
    }
  }

  return <Outlet />;
};
export default PrivateRoute;
