import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(51, 187, 255)',
      light: 'rgb(51, 187, 255)',
      dark: 'rgb(51, 187, 255)',
    },
    secondary: {
      light: 'rgb(28, 36, 96)',
      main: 'rgb(28, 36, 96)',
      dark: 'rgb(28, 36, 96)',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default theme;
