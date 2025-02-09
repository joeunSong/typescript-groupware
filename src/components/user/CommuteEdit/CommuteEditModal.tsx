import { useState } from 'react';
import { CustomButton, CustomModal } from '../../common/Components';
import { FormControl, SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { KSTtoMMDD, period } from '../../../utils/dateFormatter';
import WorkTypeSelect from './WorkTypeSelect';
import CommuteTimePicker from './CommuteTimePicker';
import { WorkRecord } from '../../../types/interface';
import USER_API from '../../../services/user';
import { WORKTYPE_ID } from '../../../constants/constant';
import utc from 'dayjs/plugin/utc';

interface CommuteEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<boolean>;
  work: WorkRecord;
}

interface workFormType {
  type: string;
  startAt: Dayjs;
  endAt: Dayjs;
}

const CommuteEditModal = ({ isModalOpen, setIsModalOpen, work }: CommuteEditModalProps) => {
  const [workForm, setWorkForm] = useState<workFormType>({
    type: work.workType.title,
    startAt: dayjs(work.startAt),
    endAt: dayjs(work.endAt),
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      dayjs.extend(utc);
      console.log('workForm in handleSubmit', workForm);
      const response = await USER_API.commute_edit({
        id: String(work.id),
        startAt: dayjs.utc(workForm.startAt).format(),
        endAt: dayjs.utc(workForm.endAt).format(),
        workTypeId: WORKTYPE_ID[workForm.type],
      });
      if (response.status === 200) {
        alert('근무 조정 요청을 보냈습니다.');
        setIsModalOpen(false);
      } else {
        alert('에러가 발생했습니다. 다시 시도해주세요.');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('workForm: ', workForm);

  return (
    <CustomModal isOpen={isModalOpen} onClose={handleModalClose} title='근무 기록 조정'>
      <div className='flex flex-col gap-3 '>
        <div className='flex gap-2'>
          <div>{KSTtoMMDD(work.startAt)}</div>
          <div className='border rounded-xl bg-secondary-600 px-2 py-1 text-xs'>
            {work.startAt && work.endAt ? period(work.startAt, work.endAt) : '조정 필요'}
          </div>
        </div>
        <FormControl className='gap-2'>
          <WorkTypeSelect value={workForm.type} onChange={(e: SelectChangeEvent) => setWorkForm({ ...workForm, type: e.target.value })} />

          <div className='flex space-x-2'>
            <CommuteTimePicker
              startAt={workForm.startAt}
              startOnChange={(newValue: Dayjs) => {
                setWorkForm((prev) => {
                  console.log('setWorkForm worked');
                  return { ...prev, startAt: newValue };
                });
              }}
              endAt={workForm.endAt}
              endOnChange={(newValue: Dayjs) => {
                setWorkForm((prev) => {
                  return { ...prev, endAt: newValue };
                });
              }}
            />
          </div>
          <CustomButton variant='text' size='auto' color='primary' submit={true} onClick={handleSubmit}>
            수정
          </CustomButton>
        </FormControl>
      </div>
    </CustomModal>
  );
};

export default CommuteEditModal;
