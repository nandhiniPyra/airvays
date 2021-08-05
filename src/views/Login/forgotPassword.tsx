import React, { useState, useEffect } from 'react';
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
import {
  CircularProgress,
  Container,
  FormLabel,
  OutlinedInput,
} from '@material-ui/core';
import VerifyOTP from './verifyOtp';
import { _forgotPasswordSendOtp } from '../../services/api/auth';

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

export default function ForgotPassword(props: any) {
  const { openForgotpasswordModal, email_value, closeEmail } = props;
  const [emailId, setemailId] = useState(email_value ? email_value : '');
  const [openOtpverify, setopenOtpverify] = useState(false);
  const [progress, setprogress] = useState(false);
  useEffect(() => {
    setemailId(email_value);
  }, [email_value]);
  const handleCloseOtp = () => {
    setopenOtpverify(false);
  };
  const handleopenOtp = () => {
    setopenOtpverify(true);
  };
  const handlesendotp = () => {
    console.log('handlesendotp', emailId, openOtpverify);
    if (emailId !== '') {
      setprogress(true);
      _forgotPasswordSendOtp(
        { email: emailId },
        function (error: any, response: any) {
          if (error == null) {
            if (response.status == 200) {
              setprogress(false);
              closeEmail();
              handleopenOtp();
            } else {
              setprogress(false);
            }
          } else if (response == null) {
            setprogress(false);
          }
        },
      );
    }
  };

  const handleChange = (event: any) => {
    setemailId(event.currentTarget.value);
  };

  return (
    <div>
      <Dialog
        // onClose={() => {
        //   console.log('onclose', emailId, openOtpverify);
        //   closeEmail();
        // }}
        aria-labelledby='customized-dialog-title'
        open={openForgotpasswordModal}
        fullWidth
        maxWidth='xs'>
        <DialogTitle
          id='customized-dialog-title'
          onClose={() => {
            console.log('onclosepage', emailId, openOtpverify);
            closeEmail();
          }}>
          <Typography variant='h6' align='center'>
            Forgot Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <FormLabel component='legend'>Confirm E-mail ID</FormLabel>
            <OutlinedInput
              style={{ marginTop: '15px' }}
              fullWidth
              id='outlined-adornment-weight'
              defaultValue={email_value}
              onChange={(e) => handleChange(e)}
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                'aria-label': 'weight',
              }}
              value={emailId}
              labelWidth={0}
            />
            <div
              style={{
                textAlign: 'center',
                margin: '4%',
                marginBottom: '40px',
              }}>
              {progress ? (
                <CircularProgress />
              ) : (
                <Button
                  autoFocus
                  onClick={() => handlesendotp()}
                  style={{
                    backgroundColor: '#33BBFF',
                    color: '#FFFFFF',
                    textTransform: 'none',
                  }}>
                  Continue
                </Button>
              )}
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <VerifyOTP
        openOtp={openOtpverify}
        closeOtp={() => handleCloseOtp()}
        emailId={emailId}
      />
    </div>
  );
}
