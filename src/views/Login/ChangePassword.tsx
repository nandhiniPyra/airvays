import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinkWrapper from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import googleIcon from '../../assets/Google@2x.png';
import facebookIcon from '../../assets/Icon awesome-facebook-f@2x.png';
import succesImg from '../../assets/Password successful - Illustration@2x.png';
// import GoogleIcon from '../../../assets/images/google-icon.png';
// import FBIcon from '../../../assets/images/fb-icon.png';
import {
  SocialLogin,
  AuthStateChangeListener,
  signInWithCredenrials,
} from '../../utils/firebaseUtils';
// import ForgotPassword from './ForgotPassword';
import { SignupRoute, DashboardRoute } from '../../Routes/RoutesConstants';
import Page from '../../components/Page';
// import language from './lang';
import useSnackbar from '../../hooks/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import { getLang } from '../../utils/storeSelector';
import SignUpContainer from './Signup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OtpInput from 'react-otp-input';
import ForgotPassword from './forgotPassword';
import VerifyOTP from './verifyOtp';
import * as firebase from 'firebase/app';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorText: {
    color: '#f84559',
    background: '#ffd8d4',
    fontSize: 15,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2),
    borderRadius: 6,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  forgotPasswordText: {
    color: '#4d5cba',
    cursor: 'pointer',
    margin: theme.spacing(1, 0),
    textAlign: 'end',
  },
  SocialLoginContainer: {
    margin: theme.spacing(2, 0),
  },
  socialLoginIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
  },
  socialIconWrapper: {
    border: '1px solid #ddd',
  },
  socialLoginIcon: {
    width: 35,
    height: 35,
  },
  submit: {
    margin: theme.spacing(2, 0),
    background: '#33BBFF',
    borderRadius: '5px',
  },
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  modaltitle: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  g_btn: {
    background: '#FFFFFF',
    borderRadius: '5px',
    border: '1px solid #DB4437',
    width: '160px',
  },
  fb_btn: {
    background: '#FFFFFF',
    borderRadius: '5px',
    border: '1px solid #4267B2',
    width: '160px',
  },
  create_acc: {
    background: '#FFFFFF',
    color: '#33BBFF',
    borderRadius: '5px',
    marginLeft: '20px',
  },
  _linktxt: {
    fontSize: '14px',
    marginLeft: '15px',
  },
}));

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}>
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

interface FormValues {
  email: string;
  password: string;
}

const initialFormValue: FormValues = {
  email: '',
  password: '',
};

export default function ChnagePassword(props: any) {
  const { open, close, emailId } = props;
  // const [open, setOpen] = React.useState(false);
  // const formRef: any = useRef();
  // const [forgotpasswordModal, setPasswordModal] = React.useState(false);
  // const [passwordChange, setPasswordChange] = React.useState(false);
  // const [successModal, setSuccessModal] = React.useState(false);
  // const [otpModal, setOtpModal] = React.useState(false);
  // const [Email_value, setEmail] = React.useState(formRef.current?.values.email);

  // const [signupPage, setsignuppage] = React.useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [showPassword, setshowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // console.log(Email_value, 'formref', formRef.current?.values.email);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   setPasswordModal(false);
  //   setSuccessModal(false);
  // };

  // const handleForgotPassword = () => {
  //   setOpen(false);
  //   setPasswordModal(true);
  // };

  //   const { selectedLanguage: lang } = getLang(stores);
  const snackBar = useSnackbar();

  // const authStateChanged = (user: any) => {
  //   user && navigate(DashboardRoute);
  // };
  // const classes = useStyles();
  // const navigate = useNavigate();

  // const handleclose_signup = () => {
  //   setsignuppage(false);
  // };
  // const handleclose_email = () => {
  //   setPasswordModal(false);
  //   setOtpOpen(true);
  // };

  // const [openOtp, setOtpOpen] = React.useState(false);

  // const handleCloseOtp = () => {
  //   setOtpOpen(false);
  // };

  // const handleSubmit = (
  //   { email, password }: FormValues,
  //   formikHelpers: FormikHelpers<FormValues>,
  // ) => {
  //   signInWithCredenrials(email, password, (_err: any) => {
  //     formikHelpers.setSubmitting(false);
  //     if (!_err) {
  //       localStorage.setItem(
  //         'accesstoken',
  //         'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDk1MWY5MjE4YjYwMTA0YmFiZDVlYyIsImlhdCI6MTYxODgxNDczNX0.ZvMNj3RHFwJ8Rx_3U6IubEClM8TTVjWn8rbNETepFx4',
  //       );
  //     }
  //     handleError(_err);
  //   });
  // };

  // const handleError = (_error: any) => {
  //   snackBar.show(_error, 'error');
  // };

  // const handleGoogleSignin = () => {
  //   SocialLogin.GoogleSignIn(handleError);
  // };

  // const handleFacebookSignin = () => {
  //   SocialLogin.FaceBookSignIn(handleError);
  // };

  // const preventDefault = (event: React.SyntheticEvent) =>
  //   event.preventDefault();
  const [successModal, setSuccessModal] = useState(false);
  const handlecloseSuccess = () => {
    setSuccessModal(false);
  };
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handlechangePassword = () => {
    firebase
      .auth()
      .confirmPasswordReset('url_code', Password)
      .then(function () {
        // Success
        snackBar.show(
          'Password updated Successfully',
          // res,
          'success',
          undefined,
          true,
          3000,
        );
        close();
        setSuccessModal(true);
      })
      .catch(function () {
        // Invalid code
      });
  };
  const handleChange = (event: any, key: any) => {
    event.preventDefault();
    key == 'Password'
      ? setConfirmPassword(event.target.value)
      : setPassword(event.target.value);
  };
  const Success_Dialog = () => {
    return (
      <Dialog
        onClose={handlecloseSuccess}
        aria-labelledby='customized-dialog-title'
        open={successModal}
        fullWidth
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handlecloseSuccess}>
          {''}
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <div>
              <img alt='' src={succesImg}></img>
            </div>
            <div
              style={{
                marginTop: '30px',
                textAlign: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
              }}>
              <Typography style={{ color: '#09B7A3' }}>
                Your Password reset has been successful !
              </Typography>
              <Typography>Start planning your adventure..</Typography>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    );
  };

  const Password_Dialog = () => {
    return (
      <Dialog
        onClose={close}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={close}>
          <Typography variant='h6' align='center'>
            Set Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <FormLabel component='legend'>Enter new Password</FormLabel>
            <OutlinedInput
              style={{ marginTop: '10px' }}
              fullWidth
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={Password}
              onChange={(event) => handleChange(event, 'Password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <div style={{ marginTop: '15px' }}>
              <FormLabel component='legend'>Confirm Password</FormLabel>

              <OutlinedInput
                style={{ marginTop: '10px' }}
                fullWidth
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => handleChange(event, 'confirmPassword')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px',
              }}>
              <Button
                autoFocus
                onClick={handlechangePassword}
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}>
                Submit Password
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <div>{Password_Dialog()}</div>
      <div>{Success_Dialog()}</div>
    </div>
  );
}
const OTPStyle = {
  height: '50px',
  width: '45px',
  fontSize: '1.2em',
  background: '#FFFFFF',
  borderRadius: '5px',
  marginRight: '10px',
  border: '1px red',
};
