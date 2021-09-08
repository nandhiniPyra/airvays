import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
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
import OtpInput from 'react-otp-input';
import { CircularProgress, Container } from '@material-ui/core';
import { _forgorPasswordVerifyOtp } from '../../services/api/auth';
import ChangePassword from './ChangePassword';

const useStyles = makeStyles(() => ({
  timer: {
    color: '#F02E88',
  },
}));
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

export default function VerifyOTP(props: any) {
  const classes = useStyles();
  const { openOtp, closeOtp, emailId } = props;
  const [otp, setOtp] = useState('');
  const [progress, setprogress] = useState(false);
  const [changepwd, setchangepwd] = useState(false);
  const [seconds, setSeconds] = React.useState(30);
  const handleInputchange = (event: any) => {
    setOtp(event);
  };
  const handleclose_changepwd = () => {
    setchangepwd(false);
  };

  const handleverifyotp = () => {
    setprogress(true);
    _forgorPasswordVerifyOtp(
      { email: emailId, otp: otp },
      function (error: any, response: any) {
        if (error == null) {
          if (response.status == 200) {
            setprogress(false);
            closeOtp();
            setchangepwd(true);
          } else {
            setprogress(false);
          }
        } else if (response == null) {
          setprogress(false);
        }
      },
    );
  };
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
  }, []);
  return (
    <div>
      <Dialog
        onClose={() => closeOtp()}
        aria-labelledby='customized-dialog-title'
        open={openOtp}
        fullWidth
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={() => closeOtp()}>
          <Typography variant='h6' align='center'>
            {'OTP Verification'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <Typography>
              Enter 4-digit OTP code sent to your E-mail ID
              <span className={classes.timer}> 00:{seconds}s</span>
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
                value={otp}
                onChange={handleInputchange}
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
              {progress ? (
                <CircularProgress />
              ) : (
                <Button
                  autoFocus
                  onClick={() => handleverifyotp()}
                  style={{
                    backgroundColor: '#33BBFF',
                    color: '#FFFFFF',
                    textTransform: 'none',
                  }}>
                  Verify Code
                </Button>
              )}
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
      <ChangePassword
        open={changepwd}
        close={() => handleclose_changepwd()}
        emailId={emailId}
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
