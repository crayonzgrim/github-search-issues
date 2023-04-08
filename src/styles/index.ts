import { Box, css, styled } from '@mui/material';

export const OuterContainer = styled(Box)(({ theme }) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100wh;

    background-color: #fff7ed;

    ${theme.breakpoints.down('md')} {
      padding: 0px 0px;
    }
  `;
});

export const InnerContainer = styled(Box)(({ theme }) => {
  return css`
    width: 768px;
    height: 796px;

    padding: 10px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border-radius: 10px;

    ${theme.breakpoints.down('md')} {
      width: 100%;
      border-radius: 0px;
    }
  `;
});
