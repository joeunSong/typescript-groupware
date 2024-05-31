import Lottie from 'react-lottie-player';
import shortLoading from '../../assets/loading/shortLoading.json';

const LoadingLayout = (props: any) => {
  const { animation, width, height } = props;
  return (
    <Lottie
      loop
      animationData={animation === undefined || animation === null ? shortLoading : animation}
      className={`${width === undefined || width === null ? 'w-[300px]' : ''} ${height === undefined || height === null ? 'h-[300px]' : ''}`}
      play
    />
  );
};

export default LoadingLayout;
