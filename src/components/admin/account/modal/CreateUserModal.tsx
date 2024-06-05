import React, { useEffect, useState } from 'react';
import ApiClient from '../../../../utils/axios';
import { CustomButton, CustomDatePicker, CustomInput, CustomModal, CustomSelect } from '../../../common/Components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import ADMIN_API from '../../../../services/admin';
import { COMPANY_ID } from '../../../../constants/constant';
import dayjs from 'dayjs';

interface FormValue {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  rank_id: number;
  department_id: number;
  is_admin: string;
  enter_date: Date | null;
}

// interface departmentType {
//   label: string;
//   value: number;
// }

const CreateUserModal = (props: any) => {
  const { isModalOpen, setIsModalOpen, rankSelectList, authSelectList, departmentInfo } = props;

  const { instance, setBaseURL } = ApiClient;
  // const [departmentInfo, setDepartmentInfo] = useState<departmentType[]>([]);
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

  // useEffect(() => {
  //   const getDepartmentInfo = async () => {
  //     try {
  //       const companyId = Number(localStorage.getItem(COMPANY_ID));
  //       const response = await ADMIN_API.department(companyId);

  //       const data = response.data.data;
  //       // console.log('getDepartmentInfo data: ', data);
  //       // console.log(Array.isArray(data));

  //       if (Array.isArray(data)) {
  //         const formattedData = data.map((item: any) => ({
  //           key: item.id,
  //           label: item.title,
  //           value: item.id,
  //         }));
  //         setDepartmentInfo(formattedData);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getDepartmentInfo();
  //   // console.log('departmentInfo: ', departmentInfo);
  // }, [departmentInfo]);

  const postUserInfo = async (data: any) => {
    try {
      setBaseURL('http://127.0.0.1/api/');
      let sendUserData = {
        name: data.name,
        email: data.email + componyEmail,
        password: data.password,
        password_confirmation: data.password_confirmation,
        rank_id: data.rank_id,
        department_id: data.department_id,
        is_admin: data.is_admin,
        enter_date: dayjs(data.enter_date).format('YYYY-MM-DD'),
      };

      console.log('sendUserData: ', sendUserData);
      const companyId = Number(localStorage.getItem(COMPANY_ID));
      const response = await ADMIN_API.user_create(companyId, sendUserData);
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
              required: '필수항목을 입력해주세요.',
            }}
            textFieldProps={{
              variant: 'outlined',
              label: '이름',
            }} //string
          />
          <div className='text-black font-body1'>아이디</div>
          <div className='flex items-center gap-2'>
            <CustomInput
              name='email'
              control={control}
              rules={{
                required: '필수항목을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력해주세요',
                },
                pattern: {
                  value: /^[a-zA-Z0-9.\-_]+$/,
                  message: '특수문자 (.,-,_) 입력이 가능합니다.',
                },
              }}
              textFieldProps={{
                variant: 'outlined',
                label: '아이디',
              }}
            />
            <p className='items-center font-body1'>{componyEmail}</p>
          </div>
          <div className='text-black font-body1'>비밀번호</div>
          <CustomInput
            name='password'
            control={control}
            rules={{
              required: '필수항목을 입력해주세요.',
              minLength: {
                value: 4,
                message: '4글자 이상 입력해주세요.',
              },
            }}
            textFieldProps={{
              variant: 'outlined',
              type: 'password',
              label: '비밀번호',
            }}
          />
          <div className='text-black font-body1'>비밀번호 확인</div>
          <CustomInput
            name='password_confirmation'
            control={control}
            rules={{
              required: '필수항목을 입력해주세요.',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
            }}
            textFieldProps={{
              variant: 'outlined',
              type: 'password',
              label: '비밀번호 확인',
            }}
          />
          <div className='text-black font-body1'>직위</div>
          <CustomSelect
            name='rank_id'
            control={control}
            rules={{ required: '필수항목을 입력해주세요.' }}
            selectList={rankSelectList}
            placeholder='직위 선택'
          />
          <div className='text-black font-body1'>부서</div>
          <CustomSelect
            name='department_id'
            control={control}
            rules={{ required: '필수항목을 입력해주세요.' }}
            selectList={departmentInfo}
            placeholder='부서 선택'
          />
          <div className='text-black font-body1'>권한</div>
          <CustomSelect
            name='is_admin'
            control={control}
            rules={{ required: '필수항목을 입력해주세요.' }}
            selectList={authSelectList}
            placeholder='권한 선택'
          />
          <div className='text-black font-body1'>입사일</div>
          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
            <CustomDatePicker
              name='enter_date'
              control={control}
              rules={{ required: '필수항목을 입력해주세요.' }}
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
