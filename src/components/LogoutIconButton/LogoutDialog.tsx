import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { LogoutUser } from '../../utils/firebaseUtils';
import { useNavigate } from 'react-router';
import injectWithObserver from '../../utils/injectWithObserver';
import CustomModelComp from '../CustomModelComp';

interface Props {
  open: boolean;
  toggleDialog: () => any;
  onLogout?: any;
  stores: any;
}

const LogoutDialog = ({ open, toggleDialog, onLogout, stores }: Props) => {
  const navigate = useNavigate();

  const [progress, setprogress] = useState(false);
  const LogoutCurrentUser = () => {
    setprogress(true);
    LogoutUser().then(() => {
      toggleDialog();
      setprogress(false);
      window.localStorage.clear();
      navigate('/home');
    });
  };
  const Styledbutton = styled(Button)({
    paddingLeft: 25,
    paddingRight: 25,
    margin: 10,
    minWidth: 140,
  });
  const createFooter = () => {
    return (
      <>
        <Styledbutton onClick={toggleDialog} color='primary' variant='outlined'>
          No
        </Styledbutton>
        <Styledbutton
          onClick={LogoutCurrentUser}
          color='primary'
          style={{ color: '#FFF' }}
          variant='contained'>
          {progress ? (
            <CircularProgress size={20} style={{ color: '#FFF' }} />
          ) : (
            'Yes, Logout'
          )}
        </Styledbutton>
      </>
    );
  };
  return (
    <CustomModelComp
      modelTitle=''
      open={open}
      onClose={toggleDialog}
      renderFooter={() => createFooter()}
      footer={true}>
      <Typography style={{ fontSize: 14 }}>
        Are you sure you want to Logout?
      </Typography>
    </CustomModelComp>
  );
};

export default injectWithObserver(LogoutDialog);
