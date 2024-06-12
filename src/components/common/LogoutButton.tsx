import { Button } from '@mui/material';

export const LogoutButton = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <Button
      variant='outlined'
      className='h-12 w-60 absolute left-4 bottom-2 border rounded text-primary border-primary bg-white'
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  );
};
