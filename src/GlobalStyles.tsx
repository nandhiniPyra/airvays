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
      body: {
        backgroundColor: "#f4f6f8",
        height: "100%",
        width: "100%",
        // fontFamily: CTR,
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
