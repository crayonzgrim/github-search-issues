import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, css, Box, Typography } from '@mui/material';
import { Button } from '../atoms/Button';
import { Layout } from '../molecules';

export const ErrorPage = styled(({ ...others }) => {
  /** Property */
  const navigate = useNavigate();

  /** Render */
  return (
    <Layout>
      <Box {...others}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          문제가 발생했어요...😭
        </Typography>
        <Typography variant="h6" sx={{ mb: 6 }}>
          죄송합니다. 뒤로가기를 눌러 다시 시도해보세요!
        </Typography>
        <Button variant={'contained'} onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
      </Box>
    </Layout>
  );
})(({ theme }) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100dvh;
    width: 100dwh;
  `;
});
