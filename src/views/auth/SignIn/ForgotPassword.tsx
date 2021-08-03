import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress
} from '@material-ui/core';
import { sendPasswordResetEmail } from '../../../utils/firebaseUtils';
import language from './lang';
import useSnackbar from '../../../hooks/useSnackbar';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getLang } from '../../../utils/storeSelector';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => any;
  eneteredEmail: string;
  stores: any;
}

interface FormValues {
  email: string;
}

const ForgotPassword = (props: ForgotPasswordProps) => {
  const { open, handleClose, eneteredEmail, stores } = props;

  const { selectedLanguage: lang } = getLang(stores);
  const snackBar = useSnackbar();

  const sendResetLink = (
    { email }: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    email &&
      sendPasswordResetEmail(
        email,
        (res:any) => {
          snackBar.show(
            'Successfully sent the reset link',
            // res,
            'success',
            undefined,
            true,
            3000
          );
          formikHelpers.setSubmitting(false);
          handleClose();
        },
        (_err: any) => {
          snackBar.show(_err, 'error', undefined, true, 5000);
          formikHelpers.setSubmitting(false);
        }
      );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {language[lang].ForgotPassword}
      </DialogTitle>
      <Formik
        initialValues={{ email: eneteredEmail }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Enter email')
            .email('Must be a valid email')
        })}
        onSubmit={sendResetLink}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>
                {language[lang].EnterYourEmail}
              </DialogContentText>
              <TextField
                variant="outlined"
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                label={language[lang].Email}
                type="email"
                name="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  language[lang].Send
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default injectWithObserver(ForgotPassword);
