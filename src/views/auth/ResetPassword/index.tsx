import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { sendPasswordResetEmail } from '../../../utils/firebaseUtils';
import language from './lang';
import useSnackbar from '../../../hooks/useSnackbar';
import * as Yup from 'yup';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getLang } from '../../../utils/storeSelector';
import * as firebase from 'firebase/app';
import { useNavigate } from "react-router-dom";

// interface ForgotPassword {
//     // open: boolean;
//     // handleClose: () => any;
//     // eneteredEmail: string;
//     stores: any;
//   }

interface FormValues {
  password: string;
}

const ResetPassword = (props: any) => {
  const { stores } = props;
  const navigate = useNavigate();
  const key = window.location.search;
  const urlParams = new URLSearchParams(key);
  const url_code = urlParams.get('oobCode') || '';
  const [open, setOpen] = React.useState(true);
  const { selectedLanguage: lang } = getLang(stores);
  const snackBar = useSnackbar();
  const updatePassword = (
    { password }: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    firebase
      .auth()
      .confirmPasswordReset(url_code, password)
      .then(function () {
        // Success
        snackBar.show(
          'Password updated Successfully',
          // res,
          'success',
          undefined,
          true,
          3000
        );
        formikHelpers.setSubmitting(false);
        setOpen(false);
        navigate("/signin");
      })
      .catch(function () {
        // Invalid code
      });
  };

  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>
        {language[lang].ForgotPassword}
        {/* Reset Password */}
      </DialogTitle>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Password is required')
          .min(8, 'Passwword must be atleast 8 characters')
        })}
        onSubmit={updatePassword}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>
                Reset Password
                {/* {language[lang].Password} */}
              </DialogContentText>
              <TextField
                variant='outlined'
                margin='normal'
                //   error={Boolean(errors.email)}
                //   helperText={errors.email}
                fullWidth
                label={language[lang].Password}
                name='password'
                autoFocus
                value={values.password}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color='secondary' />
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

export default injectWithObserver(ResetPassword);
