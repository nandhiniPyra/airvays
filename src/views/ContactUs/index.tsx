import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import logo from "../../assets/Logo@2x.png";
import contact from "../../assets/Contact us - illustration@2x.png";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { FormHelperText } from "@material-ui/core";
// import BottomGrid from '../Airvays info/index'
import * as yup from "yup";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "100px",
    },
    paper: {
      padding: theme.spacing(2),
      //   textAlign: "center",
      // marginLeft: "100px",
      // marginRight: "150px",
      color: theme.palette.text.secondary,
    },
    content: {
      marginTop: "40px",
      margin: "20px",
      marginLeft: "40px",
      color: "#1C2460",
      fontSize: "23px",
    },
    label: {
      marginTop: "25px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "18px",
      fontFamily: "AvantGarde Demi",
      color: "#333333",
      opacity: "50%",
    },
    details: {
      marginTop: "20px",
      margin: "20px",
      marginLeft: "40px",
      fontSize: "21px",
      fontFamily: "AvantGarde Demi",
    },
    editDetails: {
      marginTop: "82px",
      marginLeft: "30px",
      color: "#DCAB5E",
      fontSize: "17px",
      textTransform: "none",
      background: "none",
    },
    deleteButton: {
      textTransform: "none",
      color: "#DB4437",
      backgroundColor: "#FFF3F2",
      fontSize: "17px",
      marginTop: "5px",
    },
    tittle_text: {
      marginLeft: "15px",
      fontWeight: 500,
    },
    listroot: {
      color: "#1C2460",
      ".MuiListItem-button:hover": {
        backgroundColor: "none",
      },
    },
    formLabel: {
      fontFamily: "Crimson Text",
      color: "#1C2460",
      fontSize: "17px",
    },
  })
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );
  const classes = useStyles();

  return (
    <li>
      <ListItem component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} className={classes.listroot} />
      </ListItem>
    </li>
  );
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  message: yup.string().required("Message is required"),
});

export default function ContactUs() {
  const formik = useFormik({
    initialValues: {
      name: "Jane",
      email: "sofiajane@gmail.com",
      message: "Your Query…",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container style={{ height: "500px" }}>
            <Grid item xs={4} sm={4}>
              <div>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "#1C2460", fontWeight: "bold" }}
                >
                  Contact Us
                </Typography>
                <Typography
                  align="center"
                  style={{
                    marginBottom: "10px",
                    marginLeft: "15px",
                    marginTop: "10px",
                    fontSize: "12px",
                    fontFamily: "Crimson Text",
                  }}
                >
                  Fill the below details for any enquiry on booking.
                </Typography>
                <Container component="main" maxWidth="xs">
                  <div>
                    <form onSubmit={formik.handleSubmit}>
                      <FormLabel
                        component="legend"
                        className={classes.formLabel}
                      >
                        Name
                      </FormLabel>

                      <TextField
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        fullWidth
                        variant="outlined"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />

                      <FormLabel
                        component="legend"
                        className={classes.formLabel}
                      >
                        E-mail ID
                      </FormLabel>

                      <OutlinedInput
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        fullWidth
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        //   helperText={formik.touched.email && formik.errors.email}
                      />
                      <FormHelperText error id="accountId-error">
                        {formik.touched.email && formik.errors.email}
                      </FormHelperText>
                      <FormLabel
                        component="legend"
                        className={classes.formLabel}
                      >
                        Message
                      </FormLabel>

                      <OutlinedInput
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        fullWidth
                        multiline
                        rows={2}
                        rowsMax={4}
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.message &&
                          Boolean(formik.errors.message)
                        }
                      />
                      <FormHelperText error id="accountId-error">
                        {formik.touched.message && formik.errors.message}
                      </FormHelperText>
                      <div
                        style={{
                          textAlign: "center",
                          margin: "4%",
                          marginBottom: "40px",
                        }}
                      >
                        <Button
                          autoFocus
                          type="submit"
                          style={{
                            backgroundColor: "#33BBFF",
                            color: "#FFFFFF",
                            textTransform: "none",
                          }}
                        >
                          Submit Details
                        </Button>
                      </div>
                    </form>
                  </div>
                </Container>
              </div>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={2} sm={2} style={{ marginTop: "60px" }}>
              <div>
                <img src={contact} style={{ width: "400px" }}></img>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>{/* <BottomGrid /> */}</div>
    </>
  );
}
