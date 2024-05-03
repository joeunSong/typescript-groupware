import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import AdminAccountPage from '../pages/admin/Account';
// 처리 로직 컴포넌트 정의
import PrivateRoute from './PrivateRoute';

// TODO 페이지 넘어갈때 y overflow 발생하는거 확인하고 추후 해결
const Router = () => {
  return (
    <div className='w-full h-screen'>
      <BrowserRouter>
        <Routes>
          {/* 인증 여부 상관 없이 접속 가능한 페이지 정의(개발 예정 아직 없음) */}

          {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 ex) 로그인 페이지 */}
          <Route element={<PrivateRoute authentication={false} />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/adminLogin' element={<AdminLoginPage />} />
          </Route>

          {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 ex) 로그인 이후 대쉬보드*/}
          <Route element={<PrivateRoute authentication={true} />}>
            {/* !! 사용자 페이지 !! */}
            <Route
              path='/user/dashboard'
              element={
                <UserDefaultLayout>
                  <UserDashBoardPage />
                </UserDefaultLayout>
              }
            />
            {/* !! 관리자 페이지 !! */}
            <Route
              path='/admin/account'
              element={
                <AdminDefaultLayout>
                  <AdminAccountPage />
                </AdminDefaultLayout>
              }
            />
          </Route>

          {/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
