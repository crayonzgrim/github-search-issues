import React, { useState, useEffect, useCallback, useContext } from 'react';
import { css, styled, Box, Typography, CircularProgress } from '@mui/material';

import { Header } from '../molecules/Header';
import { RepoContext } from '../../context/RepoListContext';
import { Card } from '../organisms/Card';
import { EmptyCaution } from '../molecules/EmptyCaution';
import { Layout } from '../molecules';

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  NORMAL: 'normal'
};

export const RegisteredPage = styled((props) => {
  /** Property */
  const { ...others } = props;

  const { lists, removeRepo } = useContext(RepoContext);

  const [issueData, setIssueData] = useState<Record<string, any>[] | []>([]);

  const [status, setStatus] = useState(STATUS.NORMAL);

  /** Function */
  const getAllIssues = async () => {
    lists.forEach((list) => {
      const {
        id,
        description,
        name,
        owner: { avatar_url, html_url }
      } = list;

      setStatus(STATUS.NORMAL);
      setIssueData((prev) => [
        ...prev,
        { id, description, name, avatar_url, html_url }
      ]);
    });
  };

  const remove = useCallback(
    async (id: number) => {
      removeRepo(id);

      if (lists.length > 0) {
        setIssueData((prev) => {
          return [...prev.filter((item) => item.id !== id)];
        });
      } else {
        setStatus(STATUS.ERROR);
      }
    },
    [issueData, lists]
  );

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
    <Layout {...others}>
      <Box>
        <Header />

        <Box className={'card-container'}>
          {issueData.length > 0 &&
            status === 'normal' &&
            issueData.map((data, index) => {
              const { id, description, name, html_url, avatar_url } = data;

              return (
                <Card
                  key={index}
                  title={name}
                  name={description}
                  avatar={avatar_url}
                  url={html_url}
                  userId={id}
                  remove={() => remove(id)}
                />
              );
            })}
        </Box>

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
    .card-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      ${theme.breakpoints.down('md')} {
        width: 100%;

        .MuiPaper-root {
          width: 100%;
        }
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      height: 700px;
    }
  `;
});
