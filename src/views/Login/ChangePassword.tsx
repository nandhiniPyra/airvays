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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import succesImg from '../../assets/Password successful - Illustration@2x.png';
import useSnackbar from '../../Hoc/useSnackbar';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

export default function ChangePassword(props: any) {
  const { open, close } = props;
  const snackBar = useSnackbar();
  const [values] = React.useState({
    showPassword: false,
  });
  const [showPassword, setshowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    key === 'Password'
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
