import React, { useState } from 'react';
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
import Link from '@material-ui/core/Link';
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
import { CircularProgress, FormHelperText } from '@material-ui/core';
import PriceAlertSuccess from '../../assets/Price Alert - Illustration@2x.png';
import { _trackPrice } from '../../services/api/flight';
import { useStore } from '../../mobx/Helpers/UseStore';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    editDetails: {
      marginTop: '82px',
      marginLeft: '30px',
      color: '#DCAB5E',
      fontSize: '17px',
      textTransform: 'none',
      background: 'none',
    },
    formLabel: {
      fontFamily: 'Crimson Text',
      color: '#1C2460',
      fontSize: '17px',
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

const TrackPricesContainer = (props: any) => {
  const store = useStore();
  const formik = useFormik({
    initialValues: {
      email: props.request.email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { searchRequest, searchKeys } = toJS(store.FlightDetails);

  const classes = useStyles();
  const [modalOpen, setMoadalOpen] = React.useState(false);
  const [emailConfirmation, setEmailConfirmation] = React.useState(false);
  const [progress, setprogress] = React.useState(false);
  const request = props.request;
  const handleClickOpen = () => {
    setMoadalOpen(true);
  };
  const handleClose = () => {
    setMoadalOpen(false);
    setEmailConfirmation(false);
  };
  const [emailID, setemailId] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemailId((event.target as HTMLInputElement).value);
    request.email = (event.target as HTMLInputElement).value;
  };

  const handleEmailConfirmation = () => {
    setprogress(true);
    _trackPrice(request, function (error: any, response: any) {
      if (error == null) {
        if (response.status == 200) {
          setprogress(false);
          setMoadalOpen(false);
          setEmailConfirmation(true);
        }
      } else if (response == null) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: '#FFFFF',
          color: '#1C2460',
          textTransform: 'none',
          border: '1px solid #1C2460',
        }}
        onClick={handleClickOpen}>
        Track Prices
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={modalOpen}
        fullWidth
        maxWidth='xs'>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography variant='h6' align='center' style={{color:'#1C2460', fontFamily:'AvantGarde-Demi', fontSize:'16px'}}>
            Track Prices
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <Typography
              align='center'
              style={{ backgroundColor: '#E8F7FF', padding: '10px' }}>
              <b>{searchRequest.fromcity}</b> ({searchRequest.from}) -{' '}
              <b>{searchRequest.tocity}</b> ({searchRequest.to})
            </Typography>
            <Typography
              align='center'
              style={{
                marginTop: '40px',
                fontSize: '14px',
                fontFamily: 'Crimson Text',
                color: '#1C2460',
              }}>
              Get updates whenever the price changes. <br />
              Please confirm your e-mail address to receive Price Alerts.
            </Typography>
            <Container component='main' maxWidth='xs'>
              <form onSubmit={formik.handleSubmit}>
                <FormLabel
                  component='legend'
                  className={classes.formLabel}
                  style={{ marginTop: '25px' }}>
                  E-mail ID
                </FormLabel>

                <TextField
                  style={{ marginTop: '15px', marginBottom: '15px' }}
                  fullWidth
                  id='email'
                  name='email'
                  value={emailID}
                  onChange={handleChange}
                  variant='outlined'
                />

                <div
                  style={{
                    textAlign: 'center',
                    margin: '4%',
                    marginBottom: '40px',
                  }}>
                  {progress ? (
                    <CircularProgress style={{ color: 'rgb(75, 175, 201)' }} />
                  ) : (
                    <Button
                      autoFocus
                      type='submit'
                      style={{
                        backgroundColor: '#33BBFF',
                        color: '#FFFFFF',
                        textTransform: 'none',
                      }}
                      onClick={handleEmailConfirmation}>
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </Container>
            <div>
              <Typography
                style={{ fontSize: '12px', fontFamily: 'Crimson Text' }}>
                By clicking on submit, you agree to our{' '}
                <Link
                  href='#'
                  style={{ color: '#4BAFC9', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  href='#'
                  style={{ color: '#4BAFC9', textDecoration: 'underline' }}>
                  Terms of use
                </Link>{' '}
              </Typography>
            </div>
          </Container>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      {/* Track Prices-1 dialog */}
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={emailConfirmation}
        fullWidth
        maxWidth='xs'>
        <DialogContent>
          <Container component='main' maxWidth='xs'>
            <div>
              <img
                style={{
                  marginTop: '10%',
                  marginLeft: '20%',
                  marginRight: '20%',
                  height: '150px',
                }}
                src={PriceAlertSuccess}
              />
            </div>
            <div
              style={{
                marginTop: '30px',
                textAlign: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                fontFamily: 'Crimson Text',
                color: '#09B7A3',
              }}>
              Your Price Alert has been set successfully !
              <div
                style={{
                  marginTop: '10px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  marginBottom: '30px',
                  fontFamily: 'Crimson Text',
                  color: '#1C2460',
                }}>
                We'll see you soon
              </div>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default injectWithObserver(TrackPricesContainer);
