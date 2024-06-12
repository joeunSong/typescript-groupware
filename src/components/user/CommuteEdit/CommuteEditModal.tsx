import { CustomButton, CustomModal } from '../../common/Components';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { KSTtoMMDD } from '../../../utils/dateFormatter';
import WorkTypeSelect from './WorkTypeSelect';
import CommuteTimePicker from './CommuteTimePicker';
import { WorkRecord } from '../../../types/interface';
import USER_API from '../../../services/user';
import { WORKTYPE_ID } from '../../../constants/constant';
import utc from 'dayjs/plugin/utc';
import { TimeValidationError } from '@mui/x-date-pickers/models/validation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
  const [timepickerError, setTimepickerError] = useState<Record<string, TimeValidationError>>({ startAt: null, endAT: null });
  const [isDataSame, setIsDataSame] = useState<boolean>(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      dayjs.extend(utc);

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

  const buttonDisabled = !!timepickerError.startAt || !!timepickerError.endAt || isDataSame;

  return (
    <CustomModal isOpen={isModalOpen} onClose={handleModalClose} title='근무 조정'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex flex-col gap-3'>
          <table className='min-w-full divide-y divide-gray-200'>
            <tbody>
              <tr>
                <td className='px-6 py-2 whitespace-nowrap '>근무 유형</td>
                <td className='px-6 py-2 whitespace-nowrap text-sm '>
                  <WorkTypeSelect
                    value={workForm.type}
                    onChange={(e: SelectChangeEvent) => {
                      if (e.target.value === work.workType.title) {
                        setIsDataSame(true);
                      } else {
                        setIsDataSame(false);
                        setWorkForm({ ...workForm, type: e.target.value });
                      }
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className='px-6 py-2 whitespace-nowrap h-[56px]'>근무일</td>
                <td className='px-6 py-2 whitespace-nowrap h-[56px]'>2024년 {KSTtoMMDD(work.startAt)}</td>
              </tr>
              <tr>
                <td className='px-6 py-2 whitespace-nowrap'>출근 시간</td>
                <td className='px-6 pt-2 pb-0 whitespace-nowrap text-sm'>
                  <CommuteTimePicker
                    type='startAt'
                    initialValue={workForm.startAt}
                    onChange={(newValue: Dayjs) => {
                      if (workForm.startAt.isSame(newValue)) {
                        setIsDataSame(true);
                      } else {
                        setIsDataSame(false);
                        setWorkForm((prev) => ({ ...prev, startAt: newValue }));
                      }
                    }}
                    error={timepickerError}
                    setError={setTimepickerError}
                  />
                </td>
              </tr>
              <tr>
                <td className='px-6 py-2 whitespace-nowrap'>퇴근 시간</td>
                <td className='px-6 pt-2 pb-0 whitespace-nowrap align-middle'>
                  <CommuteTimePicker
                    type='endAt'
                    startAt={workForm.startAt}
                    initialValue={workForm.endAt}
                    onChange={(newValue: Dayjs) => {
                      if (workForm.endAt.isSame(newValue)) {
                        setIsDataSame(true);
                      } else {
                        setIsDataSame(false);
                        setWorkForm((prev) => ({ ...prev, endAt: newValue }));
                      }
                    }}
                    error={timepickerError}
                    setError={setTimepickerError}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className='flex justify-center gap-3 mt-4'>
            <CustomButton
              variant='text'
              size='auto'
              color='secondary'
              onClick={() => setIsModalOpen(false)}
              className='w-[90px] text-black bg-secondary-500'
            >
              취소
            </CustomButton>
            <CustomButton
              variant='text'
              size='auto'
              color={buttonDisabled ? 'secondary' : 'primary'}
              submit={true}
              onClick={handleSubmit}
              disabled={buttonDisabled}
              className='w-[90px]'
            >
              승인 요청
            </CustomButton>
          </div>
        </div>
      </LocalizationProvider>
    </CustomModal>
  );
};

export default CommuteEditModal;

