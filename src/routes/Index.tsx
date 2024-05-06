import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import * as ENDPOINT from '../constants/apiEndpoints';
// Error 페이지 정의
import ErrorPage from '../pages/Error';
// 로그인 페이지 정의
import LoginPage from '../pages/user/Login';
import AdminLoginPage from '../pages/admin/Login';
// 사용자 페이지 정의
import UserDefaultLayout from '../components/user/UserDefaultLayout';
import UserDashBoardPage from '../pages/user/DashBoard';
// 관리자 페이지 정의
import AdminDefaultLayout from '../components/admin/AdminDefaultLayout';
import AdminDepartmentPage from '../pages/admin/Department';
import AdminAccountPage from '../pages/admin/Account';
// 처리 로직 컴포넌트 정의
import PrivateRoute from './PrivateRoute';
import _ from 'lodash';

// TODO 페이지 넘어갈때 y overflow 발생하는거 확인하고 추후 해결
const Router = () => {
  const userRoutes = [{ path: ENDPOINT.USER_DASHBOARD, layout: UserDashBoardPage }];
  const adminRoutes = [
    { path: ENDPOINT.ADMIN_DEPARTMENT, layout: AdminDepartmentPage },
    { path: ENDPOINT.ADMIN_ACCOUNT, layout: AdminAccountPage },
  ];
  return (
    <div className='w-full h-screen overflow-hidden'>
      <BrowserRouter>
        <Routes>
          {/* '/' 경로로 진입한 경우 이동할 곳 명시 */}
          <Route path='/' element={<Navigate to={ENDPOINT.USER_LOGIN} />} />

          {/* 인증 여부 상관 없이 접속 가능한 페이지 정의(개발 예정 아직 없음) */}

          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 ex) 로그인 페이지 */}
          <Route element={<PrivateRoute authentication={false} />}>
            <Route path={ENDPOINT.USER_LOGIN} element={<LoginPage />} />
            <Route path={ENDPOINT.ADMIN_LOGIN} element={<AdminLoginPage />} />
          </Route>

          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 ex) 로그인 이후 대쉬보드*/}
          <Route element={<PrivateRoute authentication={false} />}>
            {/* !! 사용자 페이지 !! */}
            {_.map(userRoutes, (userRoute: any) => {
              return (
                <Route
                  key={userRoute.path}
                  path={userRoute.path}
                  element={
                    <UserDefaultLayout>
                      <userRoute.layout />
                    </UserDefaultLayout>
                  }
                />
              );
            })}
            {/* !! 관리자 페이지 !! */}
            {_.map(adminRoutes, (adminRoute: any) => {
              return (
                <Route
                  key={adminRoute.path}
                  path={adminRoute.path}
                  element={
                    <AdminDefaultLayout>
                      <adminRoute.layout />
                    </AdminDefaultLayout>
                  }
                />
              );
            })}
          </Route>

          {/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
