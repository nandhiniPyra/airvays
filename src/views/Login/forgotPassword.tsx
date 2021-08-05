import React from 'react';
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
import { Container, FormLabel, OutlinedInput } from '@material-ui/core';
import VerifyOTP from './verifyOtp';

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

export default function ForgotPassword(props: any) {
  const { openForgotpasswordModal, email_value, closeEmail } = props;
//   const handleClickOpen = () => {
//     setOtpOpen(true);
//   };

  const handleClose = () => {
    closeEmail();
    // setOtpOpen(true);
  };

  const handleChange = (event: any) => {
    console.log(event.currentTarget.value, 'event');
  };



  return (
    <div>
      <Dialog
        onClose={() => closeEmail()}
        aria-labelledby='customized-dialog-title'
        open={openForgotpasswordModal}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id='customized-dialog-title' onClose={() => closeEmail()}>
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
              //   value={'sofiajane@gmail.com'}
              defaultValue={email_value}
              onChange={handleChange}
              // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
            />
            <div
              style={{
                textAlign: 'center',
                margin: '4%',
                marginBottom: '40px',
              }}
            >
              <Button
                autoFocus
                onClick={handleClose}
                style={{
                  backgroundColor: '#33BBFF',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}
              >
                Continue
              </Button>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
