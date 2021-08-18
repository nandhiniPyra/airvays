import { createMuiTheme, colors } from '@material-ui/core';
// import shadows from './shadows';
// import typography from './typography';
// import table from './table';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(51, 187, 255)',
      light: 'rgb(51, 187, 255)',
      dark: 'rgb(51, 187, 255)',
    },
    // secondary: {
    //   light: '#D83E3F',
    //   main: '#D83E3F',
    //   dark: '#D83E3F',
    // },
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
