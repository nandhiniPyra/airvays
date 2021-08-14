import { createStyles, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      ".MuiTextField-root": {
        ".Mui-focused": {
          border: "1px solid black",
        },
      },

      ".MuiButton-root:focus": {
        outline: "none",
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
