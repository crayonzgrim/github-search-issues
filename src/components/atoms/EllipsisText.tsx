import { css, styled, Typography } from '@mui/material';

export const EllipsisText = styled(Typography)(({ theme }) => {
  return css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
});
