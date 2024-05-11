import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CustomButton, CustomDatePicker, CustomInput, CustomModal, CustomSelect } from '../../components/common/Components';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import ApiClient from '../../utils/axios';
import React from 'react';
import AccountDetail from '../../components/admin/AccountDetail';
import ADMIN_API from '../../services/admin';

function createData(name: string, company: string, position: string, id: string, startWork: number, startAccount: number, accountStatus: string) {
  return { name, company, position, id, startWork, startAccount, accountStatus };
}

const rows = [
  createData('김지란', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란2', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란3', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
  createData('김지란4', '지란지교 소프트', '부장', 'jiran1@jiran.com', 20240330, 20240401, '재직'),
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

/**
 * @todo api연결, 날짜 포맷
 */
const AccountPageLayout = () => {
  const { instance, setBaseURL } = ApiClient;

  const { control, handleSubmit, watch } = useForm<FormValue>({
    defaultValues: {
      enter_date: null,
    },
  });
  const componyEmail = '@jiran.com';
  const password = watch('password', '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState<any>(null);
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(false);
  const [accountDetailId, setAccountDetailId] = useState<number>();

  const HandleOpenModal = () => setIsModalOpen(true);
  const HandleCloseModal = () => setIsModalOpen(false);

  const rankSelectList = [
    // { label: '대표', value: '대표' },
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

  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        setBaseURL('http://127.0.0.1/api/');

        const response = await instance.get(`v1/companies/1/users`);
        console.log('data: ', response.data);
        setUsersInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersInfo();
    console.log('usersInfo: ', usersInfo);
  }, []);

  const handleAccountDetail = (accountId: number) => {
    setIsAccountDetailOpen(true);
    setAccountDetailId(accountId);
  };
  console.log('usersInfo: ', usersInfo);

  const postUserInfo = async (data: any) => {
    try {
      setBaseURL('http://127.0.0.1/api/');
      let sendUserData = {
        name: data.name,
        email: data.email + componyEmail,
        password: data.password,
        password_confirmation: data.password_confirmation,
        rank_title: data.rank_title,
        // department_title: data.department_title,
        department_title: 'Department1',
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
    <div className='flex flex-col w-full h-full gap-5 p-5 bg-white'>
      <div className='flex justify-end'>
        <CustomButton variant='contained' color='secondary' size='auto' onClick={HandleOpenModal}>
          계정 추가
        </CustomButton>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: 'secondary.main' }}>
            <TableRow>
              <TableCell align='center'>이름</TableCell>
              <TableCell align='center'>부서</TableCell>
              <TableCell align='center'>직위</TableCell>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>권한</TableCell>
              <TableCell align='center'>입사일</TableCell>
              <TableCell align='center'>계정 생성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersInfo &&
              usersInfo.data.map((user: any) => (
                <>
                  <TableRow
                    key={user.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, textAlign: 'center' }}
                    className='cursor-pointer'
                    onClick={() => {
                      handleAccountDetail(user.id);
                    }}
                  >
                    <TableCell align='center'>{user.name}</TableCell>
                    <TableCell align='center'>{user.department_title}</TableCell>
                    <TableCell align='center'>{user.rank_title}</TableCell>
                    <TableCell align='center'>{user.email}</TableCell>
                    <TableCell align='center'>{user.is_admin}</TableCell>
                    <TableCell align='center'>{user.enter_date}</TableCell>
                    <TableCell align='center'>{user.created_date}</TableCell>
                  </TableRow>
                </>
              ))}
            {isAccountDetailOpen && accountDetailId && (
              <AccountDetail accountId={accountDetailId} isAccountDetailOpen={isAccountDetailOpen} setIsAccountDetailOpen={setIsAccountDetailOpen} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </div>
  );
};

export default AccountPageLayout;
