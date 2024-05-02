import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7F00', // tailwind에서 설정한 primary 색상 사용
    },
    secondary: {
      main: '#C7C7C7', // tailwind에서 설정한 secondary 색상 사용
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'Noto Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
    ].join(','),
  },
});

export default theme;
