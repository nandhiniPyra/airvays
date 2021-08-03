import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { updateUserInfo } from '../../../utils/firebaseUtils';
import useSnackbar from '../../../hooks/useSnackbar';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getUser } from '../../../utils/storeSelector';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  errorText: {
    color: '#f84559',
    background: '#ffd8d4',
    fontSize: 15,
    margin: theme.spacing(0, 0, 2),
    padding: '8px 15px',
    borderRadius: 6
  },
  successText: {
    color: '#00856f',
    background: '#c9fff6',
    fontSize: 15,
    margin: theme.spacing(0, 0, 2),
    padding: '8px 15px',
    borderRadius: 6
  }
}));

interface FormFields {
  fullName: string | null | undefined;
  email: string | null | undefined;
  phone: string;
  state: string;
  country: string;
}

const ProfileDetails = ({ className, stores, ...rest }: any) => {
  const { user } = getUser(stores);
  const classes = useStyles();

  const snackBar = useSnackbar();

  const updateFullName = (
    values: FormFields,
    formikHelpers: FormikHelpers<FormFields>
  ) => {
    console.log(values,"values",user)
    updateUserInfo(
      user,
      { displayName: values.fullName },
      (msg: string) => {
        snackBar.show(msg, 'success', undefined, true, 5000);
        formikHelpers.setSubmitting(false);
      },
      (msg: string) => {
        snackBar.show(msg, 'error', undefined, true, 5000);
        formikHelpers.setSubmitting(false);
      }
    );
  };

  return (
    <Formik
      initialValues={{
        fullName: user?.displayName,
        email: user?.email,
        phone: user?.phoneNumber || '',
        state: 'Alabama',
        country: 'USA'
      }}
      onSubmit={updateFullName}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required('Please specify the full name'),
        email: Yup.string().email('Must be a valid email'),
        phone: Yup.string(),
        country: Yup.string(),
        state: Yup.string()
      })}
    >
      {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                    label="Full name"
                    name="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                    variant="outlined"
                  >
                    {states.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
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
                  'Save details'
                )}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default injectWithObserver(ProfileDetails);
