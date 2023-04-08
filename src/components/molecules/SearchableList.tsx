import React from 'react';
import { Box, Typography, css, styled, Divider } from '@mui/material';

type SearchableListProps = {
  names: string[] | undefined;
};

export const SearchableList = styled((props: SearchableListProps) => {
  /** Property */
  const { names, ...others } = props;

  /** Render */
  return (
    <Box {...others}>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold', pl: 1 }}>
        검색 가능 목록
      </Typography>
      <Box className={'lists'}>
        {(names ?? [])?.sort().map((name, index) => (
          <Box key={index}>
            <Typography sx={{ padding: '10px' }}>{name}</Typography>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
})(({ theme }) => {
  return css`
    position: relative;

    margin-top: 20px;
    padding-bottom: 10px;

    .lists {
      position: absolute;
      overflow: scroll;

      width: 100%;
      height: 300px;

      border: 2px solid lightGray;
      border-radius: 8px;
    }
  `;
});
