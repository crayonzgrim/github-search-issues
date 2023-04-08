import React, { useState, useEffect, useContext } from 'react';
import { css, styled, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

import { Header } from '../molecules/Header';
import { RepoContext } from '../../context/RepoListContext';
import { PaginationLists } from '../organisms/PaginationLists';
import { EmptyCaution } from '../molecules/EmptyCaution';
import { Layout } from '../molecules';

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  NORMAL: 'normal'
};

export const IssueListPage = styled((props) => {
  /** Property */
  const { ...others } = props;

  const { lists } = useContext(RepoContext);

  const [issueData, setIssueData] = useState<Record<string, any>[] | []>([]);

  const [status, setStatus] = useState(STATUS.NORMAL);

  /** Function */

  const getAllIssues = async () => {
    lists?.forEach((list: Record<string, any>) => {
      const { issues_url } = list;

      const url = issues_url.split('{')[0];

      return axios
        .get(url)
        .then((res) => {
          setStatus(STATUS.NORMAL);

          setIssueData((prev) => [...prev, ...res.data]);
        })
        .catch((err) => {
          setStatus(STATUS.ERROR);

          console.error(err);
        });
    });
  };

  useEffect(() => {
    setStatus(STATUS.LOADING);

    if (lists.length > 0) {
      const getIssues = setTimeout(() => {
        getAllIssues();
      }, 1200);

      return () => {
        clearTimeout(getIssues);
      };
    } else {
      setStatus(STATUS.ERROR);
    }
  }, []);

  /** Render */
  return (
    <Layout>
      <Box {...others}>
        <Header />

        {issueData.length > 0 && <PaginationLists issueDatas={issueData} />}

        {status === 'loading' ? (
          <Box className={'loading'}>
            <CircularProgress size={60} color={'inherit'} sx={{ mb: 4 }} />
            <Typography variant={'h6'}>데이터 불러오는 중...</Typography>
          </Box>
        ) : status === 'error' || issueData.length === 0 ? (
          <EmptyCaution />
        ) : null}
      </Box>
    </Layout>
  );
})(({ theme }) => {
  return css`
    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 700px;
    }
  `;
});
