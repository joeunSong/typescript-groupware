import { default as CommonLogin } from '../../components/common/Login';

const AdminLoginPageLayout = (props: any) => {
  return <CommonLogin logo={<span className='font-noto-sans text-4xl font-extrabold text-primary '>지란지교 소프트 Admin</span>} role='admin' />;
};

export default AdminLoginPageLayout;
