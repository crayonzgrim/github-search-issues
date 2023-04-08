import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  styled,
  css,
  Box,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Snackbar } from '../atoms/Snackbar';
import { RepoContext } from '../../context/RepoListContext';

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  NORMAL: 'normal'
};

type SearchedListProps = {
  saveStorage: any;
  setSaveStorage: any;
  searchedRepoData: any;
};

export const SearchedList = styled((props: SearchedListProps) => {
  /** Property */
  const { saveStorage, setSaveStorage, searchedRepoData, ...others } = props;

  // const hello = useContext(RepoContext);
  const { addRepo, lists } = useContext(RepoContext);

  // 추가 성공 여부
  const [status, setStatus] = useState(STATUS.NORMAL);

  const [isProblem, setIsProblem] = useState(false);
  useEffect(() => {
    setIsProblem(status === STATUS.NORMAL ? false : true);
  }, [status]);

  /** Function */
  const onClickHandler = useCallback(
    async (id: React.MouseEvent<HTMLButtonElement>) => {
      // 검색한 ID와 같은 것만 필터
      const repo = (searchedRepoData ?? [])?.filter(
        (data: Record<string, any>) => data.id === id
      );

      // 동일 레포지토리가 존재하는지 체크
      const isExist = lists.every(
        (item: Record<string, any>) => item.id !== id
      );

      // 저장한 데이터 갯수
      const dataCount = lists.length;

      if (repo && isExist) {
        if (dataCount < 4) {
          addRepo(repo);

          setStatus(STATUS.SUCCESS);

          setTimeout(() => {
            setStatus(STATUS.NORMAL);
          }, 2000);
        } else {
          setStatus(STATUS.WARNING);

          setTimeout(() => {
            setStatus(STATUS.NORMAL);
          }, 2000);
        }
      } else {
        setStatus(STATUS.ERROR);

        setTimeout(() => {
          setStatus(STATUS.NORMAL);
        }, 2000);
      }
    },
    [searchedRepoData, lists]
  );

  /** Render */
  return (
    <Box {...others}>
      {status === 'success' ? (
        <Snackbar
          message={'추가 되었습니다!'}
          severity={status}
          open={isProblem}
        />
      ) : status === 'error' ? (
        <Snackbar
          message={'실패..! 동일 레포지토리는 추가 되지 않습니다'}
          severity={status}
          open={isProblem}
        />
      ) : status === 'warning' ? (
        <Snackbar
          message={'레포지토리는 4개까지만 저장 가능합니다!'}
          severity={status}
          open={isProblem}
        />
      ) : null}

      <Box className={'searched-lists'}>
        {searchedRepoData?.map((data: Record<string, any>) => {
          const { description, full_name, html_url, id, owner } = data;

          return (
            <List
              key={id}
              sx={{
                boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px`
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Box
                    component="img"
                    src={owner.avatar_url}
                    alt={owner.login}
                    sx={{ width: '60px', borderRadius: '50%', mr: '20px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`Name : ${full_name}`}
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        component={'span'}
                        variant={'body2'}
                        color={'text.primary'}
                        sx={{ display: 'inline-block' }}
                      >
                        Repository : {html_url}
                      </Typography>
                      <Typography
                        component={'span'}
                        variant={'body2'}
                        color={'text.primary'}
                        sx={{ display: 'inline-block' }}
                      >
                        Description: {description}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemIcon>
                  <IconButton onClick={() => onClickHandler(id)}>
                    <AddCircleIcon sx={{ color: 'dodgerBlue' }} />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            </List>
          );
        })}
      </Box>
    </Box>
  );
})(({ theme }) => {
  return css`
    position: relative;

    margin-top: 20px;
    border-radius: 10px;

    .searched-lists {
      overflow: scroll;
      height: 320px;
      border: 2px solid lightgrey;
      border-radius: 10px;
    }
  `;
});
