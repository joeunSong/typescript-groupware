import React from 'react';
import ApiClient from '../../../../utils/axios';
import { CustomButton, CustomDatePicker, CustomInput, CustomModal, CustomSelect } from '../../../common/Components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const rankSelectList = [
  { label: '대표', value: '대표' },
  { label: '부장', value: '부장' },
  { label: '차장', value: '차장' },
  { label: '과장', value: '과장' },
  { label: '대리', value: '대리' },
  { label: '사원', value: '사원' },
  { label: '인턴', value: '인턴' },
];

const departmentSelectList = [
  { label: '개발 부서', value: '개발 부서' },
  { label: '기획 부서', value: '기획 부서' },
];

const authSelectList = [
  { label: '사용자', value: '0' },
  { label: '관리자', value: '1' },
];

interface FormValue {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  rank_title: string;
  department_title: string;
  is_admin: string;
  enter_date: Date | null;
}

const CreateUserModal = (props: any) => {
  const { isModalOpen, setIsModalOpen } = props;

  const { instance, setBaseURL } = ApiClient;
  const { control, handleSubmit, watch, reset } = useForm<FormValue>({
    defaultValues: {
      enter_date: null,
    },
  });
  const password = watch('password', '');
  const componyEmail = '@jiran.com';

  const HandleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const postUserInfo = async (data: any) => {
    try {
      setBaseURL('http://127.0.0.1/api/');
      let sendUserData = {
        name: data.name,
        email: data.email + componyEmail,
        password: data.password,
        password_confirmation: data.password_confirmation,
        rank_title: data.rank_title,
        department_title: data.department_title,
        is_admin: data.is_admin,
        enter_date: dayjs(data.enter_date).format('YYYY-MM-DD'),
      };

      console.log('sendUserData: ', sendUserData);
      const response = await instance.post(`v1/companies/1/users`, sendUserData);
      console.log('response: ', response);

      HandleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomModal isOpen={isModalOpen} onClose={HandleCloseModal} title='계정추가'>
      <form onSubmit={handleSubmit((data: any) => postUserInfo(data))}>
        <div className='grid-box'>
          <div className='text-black font-body1'>이름</div>
          <CustomInput
            name='name'
            control={control}
            rules={{
              required: '필수 입력 항목입니다.',
              minLength: { value: 2, message: '최소 2자 이상이어야 합니다.' },
            }}
            textFieldProps={{
              variant: 'outlined',
            }}
          />
          <div className='text-black font-body1'>아이디</div>
          <div className='flex items-center gap-2'>
            <CustomInput
              name='email'
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
                minLength: {
                  value: 2,
                  message: '최소 2자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 40,
                  message: '최대 40자까지 입력 가능합니다.',
                },
                pattern: {
                  value: /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/,
                  message: '영어 소문자, 숫자, 점(.), 하이픈(-), 언더바(_)만 사용 가능합니다. (연속 사용 및 맨 앞/뒤 사용 불가)',
                },
              }}
              textFieldProps={{
                variant: 'outlined',
              }}
            />
            <p className='items-center font-body1'>{componyEmail}</p>
          </div>
          <div className='text-black font-body1'>비밀번호</div>
          <CustomInput
            name='password'
            control={control}
            rules={{
              required: '필수 입력 항목입니다.',
              minLength: {
                value: 4,
                message: '비밀번호는 최소 4자 이상이어야 합니다.',
              },
              maxLength: {
                value: 10,
                message: '비밀번호는 최대 10자까지 입력 가능합니다.',
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: '비밀번호는 영어 소문자와 숫자로만 구성되어야 합니다.',
              },
            }}
            textFieldProps={{
              variant: 'outlined',
              type: 'password',
            }}
          />
          <div className='text-black font-body1'>비밀번호 확인</div>
          <CustomInput
            name='password_confirmation'
            control={control}
            rules={{
              required: '필수 입력 항목입니다.',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
            }}
            textFieldProps={{
              variant: 'outlined',
              type: 'password',
            }}
          />
          <div className='text-black font-body1'>직위</div>
          <CustomSelect
            name='rank_title'
            control={control}
            rules={{ required: '필수 선택 항목입니다.' }}
            selectList={rankSelectList}
            placeholder='직위 선택'
          />
          <div className='text-black font-body1'>부서</div>
          <CustomSelect
            name='department_title'
            control={control}
            rules={{ required: '필수 선택 항목입니다.' }}
            selectList={departmentSelectList}
            placeholder='부서 선택'
          />
          <div className='text-black font-body1'>권한</div>
          <CustomSelect
            name='is_admin'
            control={control}
            rules={{ required: '필수 선택 항목입니다.' }}
            selectList={authSelectList}
            placeholder='권한 선택'
          />
          <div className='text-black font-body1'>입사일</div>
          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
            <CustomDatePicker
              name='enter_date'
              control={control}
              rules={{ required: '필수 선택 항목입니다.' }}
              defaultValue={dayjs()}
              format='YYYY-MM-DD'
              error={false}
            />
          </LocalizationProvider>
        </div>

        <div className='flex justify-center gap-5 mt-8'>
          <CustomButton variant='contained' size='auto' color='secondary' onClick={() => HandleCloseModal()}>
            취소
          </CustomButton>
          <CustomButton variant='contained' size='auto' color='primary' submit>
            저장
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateUserModal;
