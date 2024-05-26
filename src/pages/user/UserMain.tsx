import MyFullCalendar from '../../components/user/main/MyFullCalendar';

interface UserMainProps {
  onWork?: boolean;
  todayWorkInfo?: any;
  setTodayWorkInfo?: any;
  todayWorkInfoList?: any; //오늘근무 정보 리스트
}

const UserMain = ({ onWork, todayWorkInfo, setTodayWorkInfo, todayWorkInfoList }: UserMainProps) => {
  return (
    <div className='flex flex-col w-full h-full p-[20px]'>
      {<MyFullCalendar onWork={onWork} todayWorkInfo={todayWorkInfo} todayWorkInfoList={todayWorkInfoList} />}
    </div>
  );
};
export default UserMain;
