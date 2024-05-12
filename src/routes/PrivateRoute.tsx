import React from 'react';
import * as ENDPOINT from '../constants/apiEndpoints';
import { Navigate, Outlet, useLocation } from 'react-router';
import { LOGIN_AUTH } from '../constants/constant';
import _ from 'lodash';

import LoginPage from '../pages/user/Login';
import { Route, useNavigate } from 'react-router-dom';
/**
 * 해당 Route의 기능은
 * 사용자 페이지, 관리자 페이지 별로 접근 권한이 다른데 해당 메뉴에 접근이 가능한지 판단해주는 Route이다.
 * 로그인한 사용자에대해서 메뉴의 대한 접근 가능 여부를 판단해주기 때문에
 * 해당 Route는 어느 로그인 페이지로 로그인했는지에 대한 정보가 필요합니다.
 */

// TODO 사용자 로그인 이후 로그인 페이지, 관리자 페이지로 url 바꾸는 경우 login으로 이동은 하나 컴포넌트가 안뜸 해당 현상 추후 해결 (이거 로컬스토리지 없어서 그런듯? API 정상적으로 호출하면 해결 될듯?)
const PrivateRoute = (props: any) => {
  const { authentication } = props;
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 로그인을 했는지에 대한 여부를 판단
   * 1. 로그인 했을 경우 : true라는 텍스트 반환
   * 2. 로그인 안했을 경우 : null or false 반환
   */
  let isAuthentication = localStorage.getItem(LOGIN_AUTH);
  if (authentication) {
    // 인증이 반드시 필요한 페이지 (사용자, 관리자 구분)

    // 인증을 안했을 경우 로그인 페이지, 했을 경우 해당 페이지 (로그인 하지 않은 사용자는)
    if (isAuthentication === 'user') {
      if (_.includes(location?.pathname, '/login') || _.includes(location?.pathname, '/admin')) {
        localStorage.clear();
        return <Navigate to={ENDPOINT.USER_LOGIN} />;
      } else {
        return <Outlet />;
      }
    } else if (isAuthentication === 'admin') {
      if (_.includes(location?.pathname, '/login') || _.includes(location?.pathname, '/user')) {
        return <Navigate to={ENDPOINT.ADMIN_LOGIN} />;
      } else {
        return <Outlet />;
      }
    } else {
      localStorage.clear();
      return <Navigate to={ENDPOINT.USER_LOGIN} />;
    }
  } else {
    // 인증이 반드시 필요 없는 페이지
    // 인증을 안했을 경우 해당 페이지로 인증을 한 상태인 경우 main페이지 (로그인 한 사용자는 로그아웃 하기 전까지는 로그인 페이지에 접근 불가)
    if (isAuthentication === null) {
      return <Outlet />;
    } else {
      localStorage.clear();
      navigate(ENDPOINT.USER_LOGIN);
    }
  }

  return <Outlet />;
};
export default PrivateRoute;
