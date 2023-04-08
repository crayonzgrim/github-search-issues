import React from 'react';
import { css, styled, Box, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  //
};

export const Header = styled((props: HeaderProps) => {
  /** Property */
  const { ...others } = props;

  const { pathname } = useLocation();

  /** Render */
  return (
    <Box {...others}>
      <Typography sx={{ fontWeight: 'bold' }}>DONG IL</Typography>
      <Box>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'dodgerblue' }}>
          <Button
            variant={pathname === '/' ? 'contained' : 'outlined'}
            sx={{ mr: 1 }}
          >
            HOME
          </Button>
        </Link>
        <Link
          to={'/lists'}
          style={{ textDecoration: 'none', color: 'dodgerblue' }}
        >
          <Button
            variant={pathname === '/lists' ? 'contained' : 'outlined'}
            sx={{ mr: 1 }}
          >
            LISTS
          </Button>
        </Link>
        <Link
          to={'/issues'}
          style={{ textDecoration: 'none', color: 'dodgerblue' }}
        >
          <Button variant={pathname === '/issues' ? 'contained' : 'outlined'}>
            ISSUES
          </Button>
        </Link>
      </Box>
    </Box>
  );
})(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
  `;
});
