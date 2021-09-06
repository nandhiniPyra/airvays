import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

const CustomModelComp = (props) => {
  return (
    <div>
      <Dialog
        {...props}
        style={{ borderRadius: 20 }}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <Typography
            style={Object.assign(
              {},
              {
                fontWeight: 'bold',
                fontSize: props.customStyle ? '24px' : '30px',
                lineHeight: '30px',
              },
              props.cancelStyle
            )}
          >
            {props.modelTitle}
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            paddingBottom: 10,
          }}
        >
          {props.children}
        </DialogContent>
        {props.footer && (
          <DialogActions >
            {props.renderFooter()}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default CustomModelComp;
