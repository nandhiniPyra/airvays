import React, { useState } from 'react';
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
import { CreateUserWithCredentials } from '../../utils/firebaseUtils';
import useSnackbar from '../../hooks/useSnackbar';
import injectWithObserver from '../../utils/injectWithObserver';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import greenTik from '../../assets/Icon ionic-ios-checkmark-circle@2x.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  backdrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
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
    marginTop: theme.spacing(6),
    margin: theme.spacing(4, 0),
    marginLeft: theme.spacing(3),
    background: '#33BBFF',
    borderRadius: '5px',
    fontFamily: 'Avantgarde-Demi',
    color: '#fff',
  },
  create_acc: {
    background: '#FFFFFF',
    color: '#33BBFF',
    borderRadius: '5px',
    marginLeft: '20px',
  },
  _linktxt: {
    fontSize: '16px',
    textAlign: 'center',
    marginLeft: theme.spacing(6),
    fontFamily: 'CrimsonText-Regular',
    color: '#1C2460',
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
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
};

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
interface ForgotPasswordProps {
  opensignup: boolean;
  closesignup: any;
  stores: any;
}
const SignUpContainer = (props: ForgotPasswordProps) => {
  const { opensignup, closesignup } = props;

  const classes = useStyles();
  const navigate = useNavigate();
  const snackBar = useSnackbar();

  const handleSubmit = (
    { fullname, email, password, confirmPassword }: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
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

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog
        onClose={() => closesignup()}
        aria-labelledby='customized-dialog-title'
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        open={opensignup}>
        <DialogTitle id='customized-dialog-title' onClose={() => closesignup()}>
          <Typography
            variant='h6'
            align='center'
            style={{ color: '#1C2460', fontFamily: 'Avantgarde-Demi' }}>
            Sign up Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='sm'>
            <div className={classes.paper}>
              <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                  // fullname: Yup.string().required('Full Name is required'),
                  fullname: Yup.string()
                  .required('Full Name is required')
                  .test('length', 'First Name must have more than 1 character', (value: any) => {
                      return value && value.length > 2;
                  })
                  .test('alphabets', 'Name must only contain alphabets', (value: any) => {
                      return /^[A-Za-z]+$/.test(value);
                  }),
                  email: Yup.string()
                    .required('Email is required')
                    .email('Email must be valid'),
                  password: Yup.string()
                    .required('Password is required')
                    .min(8, 'password must be 8 characters long'),
                  confirmPassword: Yup.string()
                    .required('Re enter the password here')
                    .test(
                      'password-match',
                      'Password should match',
                      function (value) {
                        return this.parent.password === value;
                      },
                    ),
                })}>
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
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <label
                          style={{
                            fontFamily: 'CrimsonText-Regular',
                            color: '#1C2460',
                            fontSize: '17px',
                          }}>
                          Name
                        </label>
                        <TextField
                          autoComplete='fullname'
                          name='fullname'
                          variant='outlined'
                          fullWidth
                          autoFocus
                          error={Boolean(touched.fullname && errors.fullname)}
                          helperText={touched.fullname && errors.fullname}
                          value={values.fullname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <div
                          style={{
                            fontFamily: 'CrimsonText-Regular',
                            color: '#1C2460',
                            fontSize: '17px',
                          }}>
                          <label>Email</label>
                          <TextField
                            type='email'
                            variant='outlined'
                            fullWidth
                            name='email'
                            autoComplete='email'
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={{ 
                              endAdornment: <img src={greenTik}></img>
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <div
                          style={{
                            fontFamily: 'CrimsonText-Regular',
                            color: '#1C2460',
                            fontSize: '17px',
                          }}>
                          <label>Password</label>
                          <OutlinedInput
                            fullWidth
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(touched.password && errors.password)}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={8}>
                        <div
                          style={{
                            fontFamily: 'CrimsonText-Regular',
                            color: '#1C2460',
                            fontSize: '17px',
                          }}>
                          <label>Confirm Password</label>
                          <OutlinedInput
                            fullWidth
                            id='outlined-adornment-password'
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge='end'>
                                  {showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </div>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid
                        container
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                        }}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            //   className={classes.create_acc}
                            disabled={isSubmitting}>
                            {isSubmitting ? (
                              <CircularProgress size={20} color='secondary' />
                            ) : (
                              'Create Account'
                            )}
                          </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                      </Grid>
                      <Typography className={classes._linktxt}>
                        By clicking the button, you agree to our &nbsp;
                        <a href='#'>Privacy Policy</a>
                        and
                        <a href='#'> Terms of use</a>
                      </Typography>
                      <Grid container justify='flex-end'>
                        <Grid item>
                          <Link to='/signin'>
                            <LinkWrapper variant='body2'></LinkWrapper>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </div>
          </Container>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default injectWithObserver(SignUpContainer);
