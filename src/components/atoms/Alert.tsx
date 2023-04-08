import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

type AlertProps = {
  children: React.ReactNode;
} & MuiAlertProps;

export const Alert = React.forwardRef<any, AlertProps>((props, ref) => {
  const { children, ...others } = props;

  return (
    <MuiAlert ref={ref} elevation={6} variant="filled" {...others}>
      {children}
    </MuiAlert>
  );
});
