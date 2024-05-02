// * basic
//  * install libraries
import _ from 'lodash';
// * components
import Button from '@mui/material/Button';
import SideBarLayout from './components/common/SideBar';
// * constants
// * apis
// * utils

const App = (props: any) => {
  const {} = props;

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <div className='flex flex-col items-center justify-center w-40 bg-black'>
        <span className='text-sm font-medium text-white'>APP.tsx 테스트</span>
        <span className='text-base font-semibold text-gray-500'>tailwind 테스트</span>
        <span className='text-lg font-bold text-blue-200'>Babel 테스트</span>
      </div>
      <div className='flex items-center justify-center w-40 bg-red-400'>
        <span className='text-lg font-bold text-indigo-300'>안녕하세요</span>
      </div>
      {/*  MUI 테스트 */}
      <p className='text-primary font-Logo'>tailwind config test</p>
      <Button variant='text'>Text</Button>
    </div>
  );
};

export default App;
