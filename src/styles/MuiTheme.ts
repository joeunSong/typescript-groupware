import { createTheme } from '@mui/material/styles';

export const MuiTheme = (rootElement: HTMLElement) => {
  return createTheme({
    palette: {
      primary: {
        main: '#FF7F00',
      },
      secondary: {
        main: '#C7C7C7',
      },
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
