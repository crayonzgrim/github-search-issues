import React from 'react';
import {
  Snackbar as MuiSnackbar,
  styled,
  css,
  AlertColor
} from '@mui/material';
import { Alert } from './Alert';

type SnackbarProps = {
  open: any;
  message: string;
  severity: AlertColor | undefined;
};

export const Snackbar = styled((props: SnackbarProps) => {
  /** Property */
  const { open, message = '', severity = 'success', ...others } = props;

  /** Function */

  /** Render */
  return (
    <MuiSnackbar {...others} open={open}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message ?? ''}
      </Alert>
    </MuiSnackbar>
  );
})(({ theme }) => {
  return css``;
});
