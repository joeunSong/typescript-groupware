import Lottie from 'react-lottie-player';
import shortLoading from '../../assets/loading/shortLoading.json';

const LoadingLayout = (props: any) => {
  const { animation, width, height } = props;
  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <Lottie
        loop
        animationData={animation === undefined || animation === null ? shortLoading : animation}
        className={`${width === undefined || width === null ? 'w-[300px]' : ''} ${height === undefined || height === null ? 'h-[300px]' : ''}`}
        play
      />
    </div>
  );
};

export default LoadingLayout;
