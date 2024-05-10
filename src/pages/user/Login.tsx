import { default as CommonLogin } from '../../components/common/Login';
import { JiranFullLogoIcon } from '../../components/common/JiranIcon';

const UserLoginLayout = () => {
  return <CommonLogin logo={<JiranFullLogoIcon width='370px' height='50px' />} role='user' />;
};

export default UserLoginLayout;
