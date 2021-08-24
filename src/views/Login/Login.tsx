import React, { useRef } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import googleIcon from '../../assets/Google@2x.png';
import facebookIcon from '../../assets/Icon awesome-facebook-f@2x.png';
import succesImg from '../../assets/Password successful - Illustration@2x.png';
import { SocialLogin, signInWithCredenrials } from '../../utils/firebaseUtils';
import useSnackbar from '../../hooks/useSnackbar';
import SignUpContainer from './Signup';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OtpInput from 'react-otp-input';
import ForgotPassword from './forgotPassword';
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
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backdrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
  formLabel: {
    fontFamily: 'CrimsonText-Regular',
    color: '#1C2460',
    fontSize: '17px',
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
    color: '#1C2460',
    opacity: '50%',
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
    // marginTop: 15,
  },
  socialIconWrapper: {
    border: '1px solid #ddd',
  },
  socialLoginIcon: {
    width: 35,
    height: 35,
  },
  submit: {
    margin: theme.spacing(4, 0),
    background: '#33BBFF',
    borderRadius: '5px',
    color: '#fff',
    fontFamily: 'Avantgarde-Demi',
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
    borderRadius: '5px',
    border: '1px solid #DB4437',
    width: '95%',
    color: '#DB4437',
  },
  fb_btn: {
    borderRadius: '5px',
    border: '1px solid #4267B2',
    width: '95%',
    color: '#4267B2',
  },
  create_acc: {
    background: '#FFFFFF',
    color: '#33BBFF',
    borderRadius: '5px',
    border: '2px solid #33BBFF',
    fontFamily: 'Avantgarde-Demi',
  },
  _linktxt: {
    fontSize: '14px',
    marginLeft: '15px',
    marginRight: '15px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        // - Set the Input border when parent is focused
        border: '1px solid black',
      },
    },
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

interface FormValues {
  email: string;
  password: string;
}

const initialFormValue: FormValues = {
  email: '',
  password: '',
};

export default function LoginContainer(props: any) {
  const snackBar = useSnackbar();
  const classes = useStyles();
  const navigate = useNavigate();
  const formRef: any = useRef();

  const [open, setOpen] = React.useState(false);
  const [forgotpasswordModal, setPasswordModal] = React.useState(false);
  const [passwordChange] = React.useState(props.resetpassword);
  const [successModal, setSuccessModal] = React.useState(false);
  const [otpModal] = React.useState(false);
  const [Email_value] = React.useState(formRef.current?.values.email);
  const [password, setPassword] = React.useState('');
  const [confirmpassword, setconfirmPassword] = React.useState('');
  const [signupPage, setsignuppage] = React.useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const Divider = () => {
    return (
      <div
        className='container'
        style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className='border'
          style={{ borderBottom: '1px solid black', width: '100%' }}
        />
        <span
          className='content'
          style={{ padding: '0 10px 0 10px', color: '#A8A8A8' }}>
          Or
        </span>
        <div
          className='border'
          style={{ borderBottom: '1px solid black', width: '100%' }}
        />
      </div>
    );
  };

  const handlechangePassword = () => {
    console.log('GGGG');
    firebase
      .auth()
      .confirmPasswordReset(props.url_code, password)
      .then(function () {
        snackBar.show(
          'Password updated Successfully',
          'success',
          undefined,
          true,
          3000,
        );
        setSuccessModal(true);
      })
      .catch(function () {
        console.log('invaldudnbvcxdfghjk', props.url_code);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPasswordModal(false);
    setSuccessModal(false);
  };

  const handleForgotPassword = () => {
    setOpen(false);
    setPasswordModal(true);
  };

  const handleclose_signup = () => {
    setsignuppage(false);
  };
  const handleChange = (key: any, event: any) => {
    key == 'password' && setPassword(event.target.value);
    key == 'confirmPassword' && setconfirmPassword(event.target.value);
  };
  const handleclose_email = () => {
    setPasswordModal(false);
    setOtpOpen(true);
  };

  const [openOtp, setOtpOpen] = React.useState(false);

  const handleSubmit = (
    { email, password }: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    signInWithCredenrials(
      email,
      password,
      (success: any) => {
        formikHelpers.setSubmitting(false);
        setOpen(false);
        props.updateuser();
        navigate('/home');
      },
      (_err: any) => {
        formikHelpers.setSubmitting(false);
        handleError(_err);
      },
    );
  };

  const handleError = (_error: any) => {
    snackBar.show(_error, 'error');
  };

  const handleGoogleSignin = () => {
    SocialLogin.GoogleSignIn(
      (success: any) => {
        setOpen(false);
        props.updateuser();
        navigate('/home');
      },
      (_err: any) => {
        handleError(_err);
      },
    );
  };
  const handleFacebookSignin = () => {
    SocialLogin.FaceBookSignIn(
      (success: any) => {
        setOpen(false);
        props.updateuser();
        navigate('/home');
      },
      (_err: any) => {
        handleError(_err);
      },
    );
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const OTP_Dailog = () => {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={otpModal}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography variant='h6' align='center'>
            {'OTP Verification'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <Typography>
              Enter 4-digit OTP code sent to your E-mail ID
            </Typography>
            <div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                marginBottom: '40px',
                marginTop: '40px',
              }}>
              <OtpInput
                value={''}
                numInputs={4}
                separator={<span>&nbsp;</span>}
                inputStyle={OTPStyle}
                shouldAutoFocus={true}
                placeholder={'0000'}
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
                onClick={handleClose}
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}>
                Verify Code
              </Button>
            </div>
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}>
              <Typography>Resend Code</Typography>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    );
  };

  const Success_Dialog = () => {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={successModal}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
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
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={passwordChange}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        fullWidth
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography variant='h6' align='center'>
            Set Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <FormLabel component='legend'>Enter new Password</FormLabel>
            <TextField
              style={{ marginTop: '10px' }}
              fullWidth
              variant='outlined'
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              onChange={(e) => handleChange('password', e)}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ marginTop: '15px' }}>
              <FormLabel component='legend'>Confirm Password</FormLabel>

              <TextField
                style={{ marginTop: '10px' }}
                fullWidth
                variant='outlined'
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={confirmpassword}
                onChange={(e) => handleChange('confirmPassword', e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                onClick={() => handlechangePassword()}
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}>
                Change Password
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <Button
        variant='outlined'
        // color="primary"
        style={{
          backgroundColor: '#FFFFFF',
          color: '#1C2460',
          borderColor: '#1C2460',
        }}
        onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <DialogTitle
          id='customized-dialog-title'
          onClose={() => {
            setOpen(false);
          }}>
          <Typography
            variant='h6'
            align='center'
            style={{ color: '#1C2460', fontFamily: 'Avantgarde-Demi' }}>
            Login
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='sm'>
            <div className={classes.paper}>
              <Formik
                innerRef={formRef}
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .required('Email is required')
                    .email('Should be a valid Email'),
                  password: Yup.string()
                    .required('Password is required')
                    .min(8, 'Passwword must be atleast 8 characters'),
                })}>
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <FormLabel
                          component='legend'
                          className={classes.formLabel}>
                          E-mail ID
                        </FormLabel>
                        {/* <label>E-mail ID</label> */}
                        <TextField
                          variant='outlined'
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          label={''}
                          InputLabelProps={{ shrink: false }}
                          placeholder='johndoe@gmail.com'
                          name='email'
                          type='email'
                          autoFocus
                          className={classes.textField}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>

                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <FormLabel
                          component='legend'
                          style={{ marginTop: '8%' }}
                          className={classes.formLabel}>
                          Password
                        </FormLabel>
                        <TextField
                          variant='outlined'
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                          name='password'
                          placeholder='password'
                          label={''}
                          InputLabelProps={{ shrink: false }}
                          type='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <Typography
                          onClick={handleForgotPassword}
                          className={classes.forgotPasswordText}
                          variant='body2'>
                          Forgot Password ?
                        </Typography>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                    <div className={classes.loginbutton}>
                      <Button
                        type='submit'
                        variant='contained'
                        className={classes.submit}
                        disabled={isSubmitting}>
                        {isSubmitting ? (
                          <CircularProgress size={20} color='secondary' />
                        ) : (
                          'Sign in'
                        )}
                      </Button>
                    </div>

                    <div>
                      <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                          <Divider></Divider>
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                    </div>
                    <div className={classes.SocialLoginContainer}>
                      <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid
                          item
                          xs={8}
                          container
                          style={{ marginTop: '4%' }}
                          className={classes.socialLoginIconContainer}>
                          <Grid item xs={6}>
                            <Button
                              className={classes.g_btn}
                              fullWidth
                              onClick={handleGoogleSignin}>
                              <img
                                alt=''
                                src={googleIcon}
                                style={{
                                  maxWidth: '10%',
                                  maxHeight: '10%',
                                  marginRight: '8%',
                                  fontFamily: 'Avantgarde-Demi',
                                }}></img>
                              Google
                            </Button>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            className={classes.socialLoginIconContainer}>
                            <Button
                              className={classes.fb_btn}
                              onClick={handleFacebookSignin}>
                              <img
                                alt=''
                                src={facebookIcon}
                                style={{
                                  maxWidth: '6%',
                                  maxHeight: '6%',
                                  marginRight: '8%',
                                  fontFamily: 'Avantgarde-Demi',
                                }}></img>
                              FaceBook
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                    </div>

                    <Grid container>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8} style={{ marginTop: '2%' }}>
                        <Button
                          fullWidth
                          variant='outlined'
                          onClick={() => {
                            setsignuppage(true);
                            setOpen(false);
                          }}
                          className={classes.create_acc}>
                          Create Account
                        </Button>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </form>
                )}
              </Formik>

              <Typography
                style={{
                  marginTop: '8%',
                  fontSize: '16px',
                  textAlign: 'center',
                  color: '#1C2460',
                  fontFamily: 'Crimson Text',
                }}>
                By clicking the button, you agree to our &nbsp;
                <a
                  href={'#'}
                  style={{ textDecoration: 'underline', marginRight: '3px' }}>
                  Privacy Policy
                </a>
                and
                <a
                  href={'#'}
                  style={{ textDecoration: 'underline', marginLeft: '3px' }}>
                  {' '}
                  Terms of use
                </a>
              </Typography>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <div>{Password_Dialog()}</div>
      <div>{Success_Dialog()}</div>
      <div>{OTP_Dailog()}</div>

      <ForgotPassword
        openForgotpasswordModal={forgotpasswordModal}
        closeEmail={() => handleclose_email()}
        email_value={formRef.current?.values.email}
      />
      <SignUpContainer
        opensignup={signupPage}
        closesignup={() => handleclose_signup()}
      />
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

// const Container = styled.div``;
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
