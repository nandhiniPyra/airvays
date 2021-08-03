import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { ChangeUserPassword } from '../../../utils/firebaseUtils';
import language from './lang';
import useSnackbar from '../../../hooks/useSnackbar';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getLang, getUser } from '../../../utils/storeSelector';

interface FormFields {
  password: string;
  confirm: string;
}

const initialState: FormFields = {
  password: '',
  confirm: ''
};

const Password = ({ stores }: any) => {
  const { selectedLanguage: lang } = getLang(stores);
  const { user } = getUser(stores);
  const snackBar = useSnackbar();

  const updatePassword = (
    values: FormFields,
    formikHelpers: FormikHelpers<FormFields>
  ) => {
    // console.log(user&&user.email,"userss", values.password,)
    ChangeUserPassword(
      user,
      values.password,
      (val: string) => {
        snackBar.show(val, 'success', undefined, true, 4000);
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
      },
      (val: string) => {
        snackBar.show(val, 'error', undefined, true, 4000);
        formikHelpers.setSubmitting(false);
      }
    );
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={updatePassword}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .required('Enter password to update')
          .min(8, 'Password must be 8 characters long'),
        confirm: Yup.string().test(
          'password-match',
          'Password should match',
          function (value: any) {
            return this.parent.password === value;
          }
        )
      })}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader={`${language[lang].Update} ${language[lang].Password}`}
              title={language[lang].Password}
            />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                label={language[lang].Password}
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
                onBlur={handleBlur}
              />
              <TextField
                fullWidth
                error={Boolean(touched.confirm && errors.confirm)}
                helperText={touched.confirm && errors.confirm}
                label={language[lang].ConfirmPassword}
                margin="normal"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
                onBlur={handleBlur}
              />
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  language[lang].Update
                )}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default injectWithObserver(Password);
