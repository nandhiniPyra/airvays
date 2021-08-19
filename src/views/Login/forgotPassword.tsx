import React, { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {
  CircularProgress,
  Container,
  FormLabel,
  OutlinedInput,
  DialogActions,
  DialogContentText,
  Grid,
} from "@material-ui/core";
import { _forgotPasswordSendOtp } from "../../services/api/auth";
import ChangePassword from "./ChangePassword";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "../../../src/utils/firebaseUtils";
import useSnackbar from "../../../src/hooks/useSnackbar";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
interface FormValues {
  email: string;
}
export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ForgotPassword(props: any) {
  const { openForgotpasswordModal, email_value, closeEmail } = props;
  const [emailId, setemailId] = useState(email_value ? email_value : "");
  const [changepwd, setchangepwd] = useState(false);
  const [progress, setprogress] = useState(false);
  const snackBar = useSnackbar();
  const classes = useStyles();

  useEffect(() => {
    setemailId(email_value);
  }, [email_value]);
  const handleclose_changepwd = () => {
    setchangepwd(false);
  };
  const handleopenOtp = () => {
    setchangepwd(true);
  };
  const handlesendotp = () => {
    console.log("handlesendotp", emailId, changepwd);
    if (emailId !== "") {
      setprogress(true);
      _forgotPasswordSendOtp(
        { email: emailId },
        function (error: any, response: any) {
          if (error == null) {
            if (response.status == 200) {
              console.log(response, "response", emailId);
              setprogress(false);
              closeEmail();
              handleopenOtp();
            } else {
              setprogress(false);
            }
          } else if (response == null) {
            setprogress(false);
          }
        }
      );
    }
  };

  const handleChange = (event: any) => {
    setemailId(event.currentTarget.value);
  };

  const sendResetLink = (
    { email }: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    email && console.log(email, "emmmailll");
    sendPasswordResetEmail(
      email,
      (res: any) => {
        snackBar.show(
          "Successfully sent the reset link",
          // res,
          "success",
          undefined,
          true,
          3000
        );
        formikHelpers.setSubmitting(false);
        // handleClose();
        closeEmail();
      },
      (_err: any) => {
        snackBar.show(_err, "error", undefined, true, 5000);
        formikHelpers.setSubmitting(false);
      }
    );
  };

  return (
    <div>
      <Dialog
        // onClose={() => {
        //   console.log('onclose', emailId, changepwd);
        //   closeEmail();
        // }}
        aria-labelledby="customized-dialog-title"
        open={openForgotpasswordModal}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth="xs"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => {
            console.log("onclosepage", emailId, changepwd);
            closeEmail();
          }}
        >
          <Typography
            variant="h6"
            align="center"
            style={{ color: "#1C2460", fontFamily: "Avantgarde-Demi" }}
          >
            Forgot Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component="main">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Formik
                initialValues={{ email: email_value }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .required("Enter email")
                    .email("Must be a valid email"),
                })}
                onSubmit={sendResetLink}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  errors,
                  touched,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      {/* <DialogContentText>
                      {"Enter Your To Reset Passowrd"}
                    </DialogContentText> */}
                      <FormLabel
                        style={{
                          fontFamily: "CrimsonText-Regular",
                          color: "#1C2460",
                          fontSize: "17px",
                        }}
                      >
                        Confirm E-mail ID
                      </FormLabel>
                      <OutlinedInput
                        type="email"
                        name="email"
                        style={{ marginTop: "2%" }}
                        fullWidth
                        error={Boolean(errors.email)}
                        // helperText={errors.email}
                        id="outlined-adornment-weight"
                        // defaultValue={email_value}
                        value={values.email}
                        // onChange={(e) => handleChange(e)}
                        onChange={handleChange}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                        // value={emailId}
                        labelWidth={0}
                      />

                      {Boolean(touched.email && errors.email) ? (
                        <Typography style={{ color: "#f44336" }}>
                          {errors.email}
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={6} style={{ marginTop: "15%" }}>
                          {" "}
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{
                              backgroundColor: "#33BBFF",
                              color: "#FFFFFF",
                              textTransform: "none",
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <CircularProgress size={20} color="secondary" />
                            ) : (
                              "Continue"
                            )}
                          </Button>
                        </Grid>
                        <Grid item xs={1}></Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions></DialogActions>
                  </form>
                )}
              </Formik>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <ChangePassword
        open={changepwd}
        close={() => handleclose_changepwd()}
        emailId={emailId}
      />
    </div>
  );
}
