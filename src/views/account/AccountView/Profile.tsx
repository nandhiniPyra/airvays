import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import injectWithObserver from '../../../utils/injectWithObserver';
import { getUser } from '../../../utils/storeSelector';
import { updateUserInfo } from '../../../utils/firebaseUtils';
import * as firebase from 'firebase/app';
import 'firebase/storage'
import useSnackbar from '../../../hooks/useSnackbar';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, stores, ...rest }: any) => {
  const classes = useStyles();
  const snackBar = useSnackbar();

  const { user: loggedUser } = getUser(stores);
  console.log(loggedUser, 'loggedUser');

  const handleUpload = ({ target }: any) => {
    if (target.files[0]) {
      const uploadTask = firebase
        .storage()
        .ref(`/images/${loggedUser?.email}`)
        .put(target.files[0])
        .then(async(res) => {
          const img_url =await res.ref.getDownloadURL();
          updateUserInfo(loggedUser,{photoURL: img_url,displayName:loggedUser?.displayName},()=>{
            snackBar.show('profile picture uploaded', 'success', undefined, true, 5000);
          },()=>{
            snackBar.show('profile picture not uploaded', 'error', undefined, true, 5000);
          })
        });
    }
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar
            className={classes.avatar}
            src={loggedUser?.photoURL || undefined}
          />
          <Box mt={2}>
            <Typography
              color='textPrimary'
              align='center'
              gutterBottom
              variant='h4'
            >
              {loggedUser?.displayName}
            </Typography>
          </Box>
          <Typography color='textSecondary' variant='body1'>
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {/* <Button color='primary' fullWidth variant='text'>
          Upload picture
        </Button> */}
        {/* <input  type="file" /> */}
        <Button color='primary' fullWidth variant='text' component='label'>
          Upload File
          <input
            type='file'
            // accept="image/jpeg"
            hidden
            onChange={handleUpload}
          />
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default injectWithObserver(Profile);
