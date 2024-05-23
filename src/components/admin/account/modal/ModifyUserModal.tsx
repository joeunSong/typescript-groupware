import React, { useEffect, useState } from 'react';
import { CustomButton, CustomDatePicker, CustomInput, CustomModal, CustomSelect } from '../../../common/Components';
import ADMIN_API from '../../../../services/admin';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { COMPANY_ID } from '../../../../constants/constant';
import { Account } from '../../../../types/interface';

interface FormValue {
  name: string;
  password?: string;
  password_confirmation?: string;
  rank_id: number;
  department_id: number;
  is_admin: string;
  enter_date: Date | null;
}

interface departmentType {
  label: string;
  value: number;
}

const ModifyUserModal = (props: any) => {
  const { accountId, isAccountDetailOpen, setIsAccountDetailOpen, rankSelectList, authSelectList } = props;
  const [account, setAccount] = useState<Account>();
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [departmentInfo, setDepartmentInfo] = useState<departmentType[]>([]);
  const { control, handleSubmit, watch, reset } = useForm<FormValue>({
    defaultValues: {
      enter_date: null,
    },
  });
  const password = watch('password', '');

  console.log('ModifyUserModal open');

  useEffect(() => {
    const getDepartmentInfo = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const response = await ADMIN_API.department(companyId);
        const data = response.data.data;
        // console.log('getDepartmentInfo data: ', data);
        // console.log(Array.isArray(data));

        if (Array.isArray(data)) {
          const formattedData = data.map((item: any) => ({
            key: item.id,
            label: item.title,
            value: item.id,
          }));
          setDepartmentInfo(formattedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAccountDetail = async () => {
      try {
        const companyId = Number(localStorage.getItem(COMPANY_ID));
        const response = await ADMIN_API.account_detail(companyId, accountId);

        setAccount(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartmentInfo();
    getAccountDetail();
    // console.log('departmentInfo: ', departmentInfo);
  }, [departmentInfo]);

  // const postUserInfo = async (data: any) => {
  //   try {
  //     setBaseURL('http://127.0.0.1/api/');
  //     let sendUserData = {
  //       name: data.name,
  //       email: data.email + componyEmail,
  //       password: data.password,
  //       password_confirmation: data.password_confirmation,
  //       rank_id: data.rank_id,
  //       department_id: data.department_id,
  //       is_admin: data.is_admin,
  //       enter_date: dayjs(data.enter_date).format('YYYY-MM-DD'),
  //     };

  //     // console.log('sendUserData: ', sendUserData);
  //     const response = await instance.post(`v1/companies/1/users`, sendUserData);
  //     // console.log('response: ', response);

  //     HandleCloseModal();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <CustomModal isOpen={isAccountDetailOpen !== 0} onClose={() => setIsAccountDetailOpen(0)} title='계정추가'>
    <form
    // onSubmit={handleSubmit((data: any) => postUserInfo(data))}
    >
      <div className='grid-box'>
        <div className='text-black font-body1'>이름</div>
        <CustomInput
          name='name'
          control={control}
          rules={{
            required: '필수항목을 입력해주세요.',
          }}
          value= {account?.name}
        />
        <div className='text-black font-body1'>아이디</div>
        <div className='font-body1'>{account?.email}</div>
        <div className='text-black font-body1'>비밀번호</div>
        {!isPasswordChange?
        <CustomButton variant='contained' size='md' color='secondary' onClick={() => setIsPasswordChange(true)}>
          비밀번호 변경
        </CustomButton>
        :
        <>
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
        <div className='text-black font-body1'>비밀번호</div>
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

            </>
            }
        <div className='text-black font-body1'>직위</div>
        <CustomSelect
          name='rank_id'
          control={control}
          rules={{ required: '필수항목을 입력해주세요.' }}
          selectList={rankSelectList}
          getValue={account?.rank_title}
        />
        <div className='text-black font-body1'>부서</div>
        <CustomSelect
          name='department_id'
          control={control}
          rules={{ required: '필수항목을 입력해주세요.' }}
          selectList={departmentInfo}
          getValue={account?.department_title}
        />
        <div className='text-black font-body1'>권한</div>
        <CustomSelect
          name='is_admin'
          control={control}
          rules={{ required: '필수항목을 입력해주세요.' }}
          selectList={authSelectList}
          getValue={account?.is_admin? '사용자':'관리자'}

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
            getValue={account?.enter_date}
          />
        </LocalizationProvider>
      </div>

      <div className='flex justify-center gap-5 mt-8'>
        <CustomButton variant='contained' size='auto' color='secondary' onClick={() => setIsAccountDetailOpen(0)}>
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

export default ModifyUserModal;
