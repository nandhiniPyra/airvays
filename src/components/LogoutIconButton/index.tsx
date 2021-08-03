import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LogoutDialog from './LogoutDialog';

interface LogoutButtonProps {
  color?:
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'primary'
    | 'secondary'
    | 'error'
    | undefined;
  size?: 'small' | 'medium' | undefined;
}

const LogoutIconButton = ({ color, size }: LogoutButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDialog = () => {
    setOpen((val) => !val);
  };

  return (
    <>
      <IconButton
        size={size}
        color="inherit"
        title="Logout"
        onClick={toggleDialog}
      >
        <ExitToAppIcon color={color || 'inherit'} />
      </IconButton>
      <LogoutDialog open={open} toggleDialog={toggleDialog} />
    </>
  );
};

export default LogoutIconButton;
