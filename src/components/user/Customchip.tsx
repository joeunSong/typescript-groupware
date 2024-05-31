import findWorkStatus from '../../utils/findWorkStatus';
const workStateList = [
  {
    name: '정상',
    color: '#307D2E',
  },
  {
    name: '지각',
    color: '#FFC451',
  },
  {
    name: '이상',
    color: '#FF0000',
  },
  {
    name: '초과',
    color: '#432E7D',
  },
  {
    name: '조퇴',
    color: '#432E7D',
  },
];
const CustomChip = ({ workInfo }: any) => {
  let workState = workStateList.find((state) => state.name === findWorkStatus(workInfo));

  return (
    <div
      className={`flex w-[50px] h-[20px] p-[10px] rounded-[50px] text-white items-center justify-center text-[12px]`}
      style={{ backgroundColor: workState?.color }}
    >
      {workState?.name}
    </div>
  );
};
export default CustomChip;
