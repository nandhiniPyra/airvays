import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import { LogoutUser } from '../../utils/firebaseUtils';
import { useNavigate } from 'react-router';
import { SigninRoute } from '../../Routes/RoutesConstants';
import language from './lang';
import injectWithObserver from '../../utils/injectWithObserver';
import { getLang } from '../../utils/storeSelector';

interface Props {
  open: boolean;
  toggleDialog: () => any;
  onLogout?: any;
  stores: any;
}

const LogoutDialog = ({ open, toggleDialog, onLogout, stores }: Props) => {
  const navigate = useNavigate();

  const { selectedLanguage: lang } = getLang(stores);

  const LogoutCurrentUser = () => {
    LogoutUser().then(() => (onLogout ? onLogout() : navigate(SigninRoute)));
  };
  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Log out</DialogTitle>
      <DialogContent style={{ padding: '0 40px' }}>
        <DialogContentText>
          {language[lang].AreYouSureMessage}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog} color="primary">
          {language[lang].Cancel}
        </Button>
        <Button onClick={LogoutCurrentUser} color="primary">
          {language[lang].Okay}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default injectWithObserver(LogoutDialog);
