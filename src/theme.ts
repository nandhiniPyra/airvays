import { createMuiTheme, colors } from '@material-ui/core';
// import shadows from './shadows';
// import typography from './typography';
// import table from './table';

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   main: '#195488',
    //   light: '#195488',
    //   dark: '#195488',
    // },
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
