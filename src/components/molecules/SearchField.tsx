import React, { useState, useCallback } from 'react';
import { Box, TextField, styled, css } from '@mui/material';
import { Button } from '../atoms/Button';

type SearchFieldProps = {
  allRepoDatas: any;
  setSearchedRepoData: (value: any) => void;
};

export const SearchField = styled((props: SearchFieldProps) => {
  /** Property */
  const { allRepoDatas, setSearchedRepoData, ...others } = props;

  const [search, setSearch] = useState('');

  /** Function */
  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (search.length > 0) {
        const searchedRepo = (allRepoDatas ?? [])?.map(
          (data: Record<string, string>) => {
            if (data.full_name.includes(search)) {
              return data;
            } else {
              return undefined;
            }
          }
        );

        setSearchedRepoData(
          (searchedRepo ?? []).filter(
            (data: Record<string, string>) => data !== undefined
          )
        );
      } else {
        setSearchedRepoData(undefined);
      }
    },
    [search]
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
  };

  /** Render */
  return (
    <Box
      {...others}
      component="form"
      onSubmit={(event) => handleSearchSubmit(event)}
    >
      <TextField
        fullWidth={true}
        type="text"
        size={'small'}
        value={search ?? ''}
        placeholder={'레포지토리를 검색하세요....'}
        onChange={(event) => handleSearch(event)}
      />

      <Button
        type={'submit'}
        size={'medium'}
        variant={'contained'}
        sx={{ ml: 2 }}
      >
        Search
      </Button>
    </Box>
  );
})(({ theme }) => {
  return css`
    display: flex;
    align-items: center;
    margin-top: 30px;
  `;
});
