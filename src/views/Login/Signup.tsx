import React, { useLayoutEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import LinkWrapper from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import googleIcon from "../../assets/Google@2x.png";
import facebookIcon from "../../assets/Icon awesome-facebook-f@2x.png";

// import GoogleIcon from '../../../assets/images/google-icon.png';
// import FBIcon from '../../../assets/images/fb-icon.png';
import {
  SocialLogin,
  AuthStateChangeListener,
  CreateUserWithCredentials,
} from "../../utils/firebaseUtils";
// import ForgotPassword from './ForgotPassword';
import { SignupRoute, DashboardRoute } from "../../Routes/RoutesConstants";
import Page from "../../components/Page";
// import language from './lang';
import useSnackbar from "../../hooks/useSnackbar";
import injectWithObserver from "../../utils/injectWithObserver";
import { getLang } from "../../utils/storeSelector";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import stores from "../../mobx/stores";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorText: {
    color: "#f84559",
    background: "#ffd8d4",
    fontSize: 15,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: 6,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  SocialLoginContainer: {
    margin: theme.spacing(2, 0),
  },
  socialLoginIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15,
  },
  socialIconWrapper: {
    border: "1px solid #ddd",
  },
  socialLoginIcon: {
    width: 35,
    height: 35,
  },
  submit: {
    margin: theme.spacing(2, 0),
    background: "#33BBFF",
    borderRadius: "5px",
  },
  create_acc: {
    background: "#FFFFFF",
    color: "#33BBFF",
    borderRadius: "5px",
    marginLeft: "20px",
  },
  _linktxt: {
    fontSize: "14px",
    marginLeft: "15px",
  },
}));

interface FormValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

const initialFormValue: FormValues = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
};

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

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
interface ForgotPasswordProps {
  opensignup: boolean;
  closesignup: any;
  // eneteredEmail: string;
  stores: any;
}
const SignUpContainer = (props: ForgotPasswordProps) => {
  const { opensignup, closesignup } = props;

  const authStateChanged = (user: any) => {
    user && navigate(DashboardRoute);
  };
  const classes = useStyles();
  const navigate = useNavigate();

  const { selectedLanguage: lang } = getLang(stores);
  const snackBar = useSnackbar();

  const handleSubmit = (
    { fullname, email, password, confirmPassword }: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    CreateUserWithCredentials(
      {
        fullname,
        email,
        password,
        confirmPassword,
      },
      (success: any) => {
        formikHelpers.setSubmitting(false);
        closesignup();
        navigate("/home");
      },
      (_err: any) => {
        formikHelpers.setSubmitting(false);
        handleError(_err);
      }
    );
  };

  const handleError = (_error: any) => {
    snackBar.show(_error, "error");
  };

  const handleGoogleSignin = () => {
    SocialLogin.GoogleSignIn(handleError);
  };

  const handleFacebookSignin = () => {
    SocialLogin.FaceBookSignIn(handleError);
  };

  const SocialIcon = ({ src, alt }: { src: any; alt: string }) => {
    return <img src={src} alt={alt} className={classes.socialLoginIcon} />;
  };
  const [modalOpen, setMoadalOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [showPassword, setshowPassword] = useState(false);



  const handleClickOpen = () => {
    setMoadalOpen(true);
    // handleCloseLogin();
  };
  const handleClose = () => {
    setMoadalOpen(false);
  };
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  console.log(modalOpen, "modalOpen");
  // Effects
  useLayoutEffect(() => {
    return AuthStateChangeListener(authStateChanged);
  }, []);
  return (
    <>
      <Dialog
        onClose={() => closesignup()}
        aria-labelledby="customized-dialog-title"
        open={opensignup}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => closesignup()}>
          <Typography variant="h6" align="center">
            Sign up Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  fullname: Yup.string().required("Full Name is required"),
                  email: Yup.string()
                    .required("Email is required")
                    .email("Email must be valid"),
                  password: Yup.string()
                    .required("Password is required")
                    .min(8, "password must be 8 characters long"),
                  confirmPassword: Yup.string()
                    .required("Re enter the password here")
                    .test(
                      "password-match",
                      "Password should match",
                      function (value) {
                        return this.parent.password === value;
                      }
                    ),
                })}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <label>FullName</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          autoComplete="fullname"
                          name="fullname"
                          variant="outlined"
                          fullWidth
                          label={"FullName"}
                          autoFocus
                          error={Boolean(touched.fullname && errors.fullname)}
                          helperText={touched.fullname && errors.fullname}
                          value={values.fullname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <div style={{ marginTop: "10px" }}>
                          <label>Email</label>
                          <TextField
                            style={{ marginTop: "10px" }}
                            type="email"
                            variant="outlined"
                            fullWidth
                            label={"Email"}
                            name="email"
                            autoComplete="email"
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div style={{ marginTop: "10px" }}>
                          <label>Password</label>
                          <TextField
                            style={{ marginTop: "10px" }}
                            variant="outlined"
                            fullWidth
                            name="password"
                            label={"Password"}
                            type="password"
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div style={{ marginTop: "10px" }}>
                          <label>ConfirmPassword</label>
                          <OutlinedInput
                            style={{ marginTop: "10px" }}
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={values.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                        </div>
                        {/* <TextField
                          variant='outlined'
                          fullWidth
                          name='confirmPassword'
                          label={'confirmPassword'}
                          type='password'
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        //   className={classes.create_acc}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={20} color="secondary" />
                        ) : (
                          // language[lang].SignUp
                          "Create Account"
                        )}
                      </Button>
                    </div>

                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link to="/signin">
                          <LinkWrapper variant="body2">
                            {/* {`${language[lang].AlreadyHaveAnAccount}? ${language[lang].SignIn}`} */}
                          </LinkWrapper>
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </div>
          </Container>
          <Typography className={classes._linktxt}>
            By clicking the button, you agree to our
            {/* <Link href='#' onClick={preventDefault}>
                  Privacy Policy
                </Link> */}
            &nbsp;<a href="#">Privacy Policy</a>
            and
            {/* <Link href='#' onClick={preventDefault}>
                  Terms of use
                </Link> */}
            <a href="#"> Terms of use</a>
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default injectWithObserver(SignUpContainer);
