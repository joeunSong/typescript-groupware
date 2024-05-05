import { createTheme } from '@mui/material/styles';

export const MuiTheme = (rootElement: HTMLElement) => {
  return createTheme({
    palette: {
      primary: {
        main: '#FF7F00',
      },
      secondary: {
        main: '#C7C7C7',
        300: '#F5F5F5',
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
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });
};
