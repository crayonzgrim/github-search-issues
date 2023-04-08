import React from 'react';
import { Box, styled, css, CardMedia, Paper, Typography } from '@mui/material';

export const Banner = styled(({ ...others }) => {
  return (
    <Paper {...others}>
      <CardMedia
        component={'img'}
        src={
          'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
        }
        alt={'github'}
        height="250"
        sx={{ filter: `blur(2px)` }}
      />

      <Box className={'bg-text'}>
        <Typography variant="h4">Github Repository Issues</Typography>
      </Box>
    </Paper>
  );
})(({ theme }) => {
  return css`
    position: relative;
    box-shadow: 0 0;

    .bg-text {
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 10px;
      color: white;
      font-weight: bold;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;

      z-index: 2;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
});
