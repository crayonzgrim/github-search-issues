import React from 'react';
import { styled, css, Box, Typography } from '@mui/material';
import { Button } from '../atoms/Button';
import { useLocation, useNavigate } from 'react-router-dom';

type EmptyCautionProps = {
  //
};

export const EmptyCaution = styled((props: EmptyCautionProps) => {
  /** Property */
  const { ...others } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  /** Render */
  return (
    <Box {...others}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        {`- ${pathname === '/issues' ? '이슈' : '리스트'} 페이지 -`}
      </Typography>
      <Typography variant="h4">리스트가 비어있어요...😭</Typography>
      <Typography variant="h4" sx={{ mb: 5 }}>
        레포지토리를 선택하세요!
      </Typography>
      <Button
        onClick={() => navigate('/')}
        variant={'contained'}
        sx={{ height: '45px' }}
      >
        돌아가기
      </Button>
    </Box>
  );
})(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 700px;
  `;
});
