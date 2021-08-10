import React, { useLayoutEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinkWrapper from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import GoogleIcon from "../../../assets/images/google-icon.png";
import FBIcon from "../../../assets/images/fb-icon.png";
import {
  SocialLogin,
  AuthStateChangeListener,
  signInWithCredenrials,
} from "../../../utils/firebaseUtils";
import ForgotPassword from "./ForgotPassword";
import { SignupRoute, DashboardRoute } from "../../../Routes/RoutesConstants";
import Page from "../../../components/Page";
import language from "./lang";
import useSnackbar from "../../../hooks/useSnackbar";
import injectWithObserver from "../../../utils/injectWithObserver";
import { getLang } from "../../../utils/storeSelector";

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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  forgotPasswordText: {
    color: "#4d5cba",
    cursor: "pointer",
    margin: theme.spacing(1, 0),
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
  },
}));

interface FormValues {
  email: string;
  password: string;
}

const initialFormValue: FormValues = {
  email: "",
  password: "",
};

const SignIn = ({ stores }: any) => {
  // Effects
  useLayoutEffect(() => {
    return AuthStateChangeListener(authStateChanged);
  }, []);

  const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false);

  const { selectedLanguage: lang } = getLang(stores);
  const snackBar = useSnackbar();

  const authStateChanged = (user: any) => {
    user && navigate(DashboardRoute);
  };
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = (
    { email, password }: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    signInWithCredenrials(
      email,
      password,
      (success: any) => {
        formikHelpers.setSubmitting(false);
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

  const toggleForgotPasswordDialog = () => {
    setOpenForgotPassword((val) => !val);
  };

  const SocialIcon = ({ src, alt }: { src: any; alt: string }) => {
    return <img src={src} alt={alt} className={classes.socialLoginIcon} />;
  };

  return (
    <>
      <Page title="Sign in" />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {language[lang].SignIn}
          </Typography>
          <Formik
            initialValues={initialFormValue}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("Email is required")
                .email("Should be a valid Email"),
              password: Yup.string()
                .required("Password is required")
                .min(8, "Passwword must be atleast 8 characters"),
            })}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  label={language[lang].Email}
                  name="email"
                  type="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label={language[lang].Password}
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography
                  onClick={toggleForgotPasswordDialog}
                  className={classes.forgotPasswordText}
                  variant="body2"
                >
                  {language[lang].ForgotPassword.toLowerCase()} ?
                </Typography>
                <div className={classes.SocialLoginContainer}>
                  <Typography align="center" variant="body2">
                    {language[lang].OrSigninUsing}
                  </Typography>
                  <Grid container justify="center">
                    <Grid
                      item
                      xs={4}
                      className={classes.socialLoginIconContainer}
                    >
                      <IconButton
                        className={classes.socialIconWrapper}
                        onClick={handleGoogleSignin}
                      >
                        <SocialIcon src={GoogleIcon} alt="Google" />
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      className={classes.socialLoginIconContainer}
                    >
                      <IconButton
                        className={classes.socialIconWrapper}
                        onClick={handleFacebookSignin}
                      >
                        <SocialIcon src={FBIcon} alt="Google" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : (
                    language[lang].SignIn
                  )}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to={SignupRoute}>
                      <LinkWrapper variant="body2">
                        {`${language[lang].DontHaveAnAccount}? ${language[lang].SignUp}`}
                      </LinkWrapper>
                    </Link>
                  </Grid>
                </Grid>
                {openForgotPassword && (
                  <ForgotPassword
                    open={openForgotPassword}
                    handleClose={toggleForgotPasswordDialog}
                    eneteredEmail={values.email}
                  />
                )}
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default injectWithObserver(SignIn);
