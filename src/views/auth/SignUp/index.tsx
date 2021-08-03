import React, { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinkWrapper from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import GoogleIcon from '../../../assets/images/google-icon.png';
import FBIcon from '../../../assets/images/fb-icon.png';
import {
  AuthStateChangeListener,
  SocialLogin,
  CreateUserWithCredentials
} from '../../../utils/firebaseUtils';
import { DashboardRoute } from '../../../Routes/RoutesConstants';
import Page from '../../../components/Page';
import language from './lang';
import useSnackbar from '../../../hooks/useSnackbar';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getLang } from '../../../utils/storeSelector';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  errorText: {
    color: '#f84559',
    background: '#ffd8d4',
    fontSize: 15,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: 6
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  SocialLoginContainer: {
    margin: theme.spacing(2, 0)
  },
  socialLoginIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15
  },
  socialIconWrapper: {
    border: '1px solid #ddd'
  },
  socialLoginIcon: {
    width: 35,
    height: 35
  },
  submit: {
    margin: theme.spacing(2, 0)
  }
}));

interface FormValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormValue: FormValues = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = ({ stores }: any) => {
  // Effects
  useLayoutEffect(() => {
    return AuthStateChangeListener(authStateChanged);
  }, []);

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
        confirmPassword
      },
      (_err: any) => {
        formikHelpers.setSubmitting(false);
        handleError(_err);
      }
    );
  };

  const handleError = (_error: any) => {
    snackBar.show(_error, 'error');
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

  return (
    <>
      <Page title="Sign up" />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {language[lang].SignUp}
          </Typography>
          <Formik
            initialValues={initialFormValue}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required('Full Name is required'),
              email: Yup.string()
                .required('Email is required')
                .email('Email must be valid'),
              password: Yup.string()
                .required('Password is required')
                .min(8, 'password must be 8 characters long'),
              confirmPassword: Yup.string()
                .required('Re enter the password here')
                .test('password-match', 'Password should match', function (
                  value
                ) {
                  return this.parent.password === value;
                })
            })}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fullname"
                      name="fullname"
                      variant="outlined"
                      fullWidth
                      label={language[lang].FullName}
                      autoFocus
                      error={Boolean(touched.fullname && errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      variant="outlined"
                      fullWidth
                      label={language[lang].Email}
                      name="email"
                      autoComplete="email"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label={language[lang].Password}
                      type="password"
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="confirmPassword"
                      label={language[lang].ConfirmPassword}
                      type="password"
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
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
                    language[lang].SignUp
                  )}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/signin">
                      <LinkWrapper variant="body2">
                        {`${language[lang].AlreadyHaveAnAccount}? ${language[lang].SignIn}`}
                      </LinkWrapper>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default injectWithObserver(SignUp);
