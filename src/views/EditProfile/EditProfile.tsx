import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';
import injectWithObserver from '../../utils/injectWithObserver';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormHelperText } from '@material-ui/core';
import VisibilityIcon from '../../assets/visibility (1)@2x.png';
import VisibilityOffIcon from '../../assets/visibility@2x.png';
import PasswordSuccess from '../../assets/Password successful - Illustration@2x.png';
import {
  _getUserProfile,
  _updateUserProfile,
} from '../../services/api/myProfile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
      backdropFilter: 'blur(3px)',
      backgroundColor: 'rgba(0,0,30,0.4)',
    },
    editDetails: {
      marginTop: '82px',
      // marginRight: "10%",
      color: '#DCAB5E',
      fontSize: '14px',
      fontFamily: 'AvantGarde-Demi',
      textTransform: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    formLabel: {
      fontFamily: 'Crimson Text',
      color: '#1C2460',
      fontSize: '17px',
      marginTop: '4%',
    },
    formControlLabel: {
      color: '#1C2460',
    },
    radio: {
      color: '#33BBFF',
      size: 'medium',
      '&$checked': {
        color: '#33BBFF',
      },
    },
    checked: {
      color: '#33BBFF',
    },
    changeButton: {
      textTransform: 'none',
      backgroundColor: 'transparent',
      color: '#33BBFF',
      fontFamily: 'Crimson Text',
      textDecoration: 'underline',
    },
  }),
);

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

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const EditProfileContainer = () => {
  const formik = useFormik({
    initialValues: {
      name: 'Jane',
      email: 'sofiajane@gmail.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classes = useStyles();
  const [modalOpen, setMoadalOpen] = React.useState(false);
  const [passwordChange, setPasswordChange] = React.useState(false);
  const [emailChange, setEmailChange] = React.useState(false);
  const [emailConfirmation, setEmailConfirmation] = React.useState(false);
  const [userName, setUserName] = useState(null);
  const [emailId, setEmailId] = useState(null);
  const [gender, setGender] = useState(null);

  const getProfileDetails = () => {
    _getUserProfile({}, function (error: any, response: any) {
      if (error === null) {
        if (response.status === '200') {
          let data = response.result;
          let name = data.displayName;
          let email = data.email;
          let gender = data.gender;
          setUserName(name);
          setEmailId(email);
          setGender(gender);
          console.log(response.result.displayName, 'myprofile');
        }
      }
    });
  };

  const updateProfileDetails = () => {
    _updateUserProfile(
      { name: userName, gender: gender },

      function (error: any, response: any) {
        console.log(gender, 'gender');
        if (error === null) {
          if (response.status === '200') {
            let data = response.result;
            // data.displayName = `${userName}`;
            console.log(userName, 'updateProfile');
          }
        }
      },
    );
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleFormChange = (event: any) => {
    setUserName(event.target.value);
    console.log(userName, 'updateUserName');
  };
  const onChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleFormSubmit = () => {
    updateProfileDetails();
    setMoadalOpen(false);
  };

  const handleClickOpen = () => {
    setMoadalOpen(true);
  };
  const handleClose = () => {
    setMoadalOpen(false);
    setPasswordChange(false);
    setEmailChange(false);
    setEmailConfirmation(false);
  };
  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleEmail = () => {
    setMoadalOpen(false);
    setEmailChange(true);
  };
  const handlePassword = () => {
    setMoadalOpen(false);
    setPasswordChange(true);
  };
  const handleEmailConfirmation = () => {
    setEmailChange(false);
    setEmailConfirmation(true);
  };

  return (
    <>
      <Typography className={classes.editDetails} onClick={handleClickOpen}>
        <CreateIcon
          style={{ fontSize: '14px', fontFamily: 'AvantGarde-Demi' }}
        />
        Edit Details
      </Typography>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='sm'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography
            variant='h6'
            align='center'
            style={{ fontFamily: 'AvantGarde-Demi', color: '#1C2460' }}>
            Edit Profile Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <Container component="main" maxWidth="lg"> */}
          <div className={classes.paper}>
            <form onSubmit={handleFormSubmit}>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid container item xs={8}>
                  <FormLabel component='legend' className={classes.formLabel}>
                    Name
                  </FormLabel>

                  <TextField
                    fullWidth
                    variant='outlined'
                    id='name'
                    name='name'
                    value={userName}
                    onChange={handleFormChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <FormLabel
                    component='legend'
                    style={{ marginTop: '6%' }}
                    className={classes.formLabel}>
                    Gender
                  </FormLabel>
                  <Grid container item xs={12}>
                    <RadioGroup
                      row
                      aria-label='gender'
                      name='gender1'
                      value={gender}
                      onChange={onChange}>
                      <Grid container>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='male'
                            className={classes.formControlLabel}
                            style={{ maxWidth: '100%' }}
                            control={
                              <Radio
                                classes={{
                                  root: classes.radio,
                                  checked: classes.checked,
                                }}
                              />
                            }
                            label='Male'
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='female'
                            className={classes.formControlLabel}
                            control={
                              <Radio
                                classes={{
                                  root: classes.radio,
                                  checked: classes.checked,
                                }}
                              />
                            }
                            label='Female'
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            value='others'
                            className={classes.formControlLabel}
                            control={
                              <Radio
                                classes={{
                                  root: classes.radio,
                                  checked: classes.checked,
                                }}
                              />
                            }
                            label='Others'
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Grid>
                  <FormLabel component='legend' className={classes.formLabel}>
                    E-mail ID
                  </FormLabel>

                  <OutlinedInput
                    style={{ marginBottom: '15px' }}
                    fullWidth
                    id='email'
                    name='email'
                    value={emailId}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    //   helperText={formik.touched.email && formik.errors.email}
                  />
                  <FormHelperText error id='accountId-error'>
                    {formik.touched.email && formik.errors.email}
                  </FormHelperText>
                  <FormLabel component='legend' className={classes.formLabel}>
                    Password
                  </FormLabel>

                  <OutlinedInput
                    style={{ marginBottom: '15px' }}
                    fullWidth
                    id='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        {' '}
                        <Button
                          className={classes.changeButton}
                          onClick={handlePassword}>
                          Change
                        </Button>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error id='accountId-error'>
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                  <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                      <div
                        style={{
                          textAlign: 'center',
                          marginBottom: '40px',
                          marginTop: '5%',
                        }}>
                        <Button
                          autoFocus
                          type='submit'
                          style={{
                            backgroundColor: '#33BBFF',
                            color: '#FFFFFF',
                            textTransform: 'none',
                          }}>
                          Update Details
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </form>
          </div>
          {/* </Container> */}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      {/* change password dialog */}
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={passwordChange}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography variant='h6' align='center'>
            {' '}
            Change Password{' '}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <FormLabel component='legend' className={classes.formLabel}>
              Enter old Password
            </FormLabel>
            <OutlinedInput
              style={{ marginBottom: '15px' }}
              fullWidth
              id='oldPassword'
              name='oldPassword'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <FormHelperText error id='accountId-error'>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
            <FormLabel component='legend' className={classes.formLabel}>
              Enter new Password
            </FormLabel>

            <OutlinedInput
              style={{ marginBottom: '15px' }}
              fullWidth
              id='oldPassword'
              name='oldPassword'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position='end'>
                  {' '}
                  <img src={VisibilityIcon} />
                </InputAdornment>
              }
            />
            <FormHelperText error id='accountId-error'>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
            <FormLabel component='legend' className={classes.formLabel}>
              Confirm Password
            </FormLabel>
            <OutlinedInput
              style={{ marginTop: '15px', marginBottom: '15px' }}
              fullWidth
              id='oldPassword'
              name='oldPassword'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position='end'>
                  <img src={VisibilityOffIcon} />
                </InputAdornment>
              }
            />
            <FormHelperText error id='accountId-error'>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
            <div
              style={{
                textAlign: 'center',
                margin: '4%',
                marginBottom: '40px',
              }}>
              <Button
                autoFocus
                onClick={handleClose}
                type='submit'
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}>
                Update Password
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>

      {/* change email dialog */}
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={emailChange}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography variant='h6' align='center'>
            Change E-mail Address
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <FormLabel component='legend' className={classes.formLabel}>
              Enter your E-mail ID
            </FormLabel>
            <OutlinedInput
              style={{ marginTop: '15px', marginBottom: '15px' }}
              fullWidth
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              //   helperText={formik.touched.email && formik.errors.email}
            />
            <FormHelperText error id='accountId-error'>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
            <div
              style={{
                textAlign: 'center',
                margin: '4%',
                marginBottom: '40px',
              }}>
              <Button
                autoFocus
                onClick={handleEmailConfirmation}
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}>
                Continue
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      {/* change email confirmation dialog */}
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={emailConfirmation}
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {' '}
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <div>
              <img
                // style={{ marginTop: "10%", height: "162.28px", width: "243.2px" }}
                src={PasswordSuccess}
              />
            </div>
            <div
              style={{
                marginTop: '30px',
                textAlign: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
              }}>
              We???ve sent a confirmation link to your e-mail address. Please
              click the link to confirm.
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default injectWithObserver(EditProfileContainer);
