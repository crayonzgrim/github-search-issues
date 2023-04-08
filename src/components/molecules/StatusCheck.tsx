import React from 'react';
import { styled, css, Box } from '@mui/material';
import { Snackbar } from '../atoms/Snackbar';

type StatusCheckProps = {
  status: string;
  open: any;
};

export const StatusCheck = styled((props: StatusCheckProps) => {
  /** Property */
  const { status, open, ...others } = props;

  /** Function */

  /** Render */
  return (
    <Box {...others}>
      {status === 'success' ? (
        <Snackbar message={'추가 되었습니다!'} severity={status} open={open} />
      ) : status === 'error' ? (
        <Snackbar
          message={'실패..! 동일 레포지토리는 추가 되지 않습니다'}
          severity={status}
          open={open}
        />
      ) : status === 'warning' ? (
        <Snackbar
          message={'레포지토리는 4개까지만 저장 가능합니다!'}
          severity={status}
          open={open}
        />
      ) : null}
    </Box>
  );
})(({ theme }) => {
  return css``;
});
