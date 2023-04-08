import React from 'react';
import {
  Button as MuiButton,
  buttonClasses as MuiButtonClasses,
  css,
  styled
} from '@mui/material';

export const Button = styled(
  React.forwardRef<any, any>((props, ref) => {
    /** Property */
    const { children, ...others } = props;

    /** Function *

    /** Render */
    return (
      <MuiButton ref={ref} {...others}>
        {children}
      </MuiButton>
    );
  })
)(({ theme }) => {
  return css`
    &.${MuiButtonClasses.root} {
      text-transform: none;
    }
  `;
});
