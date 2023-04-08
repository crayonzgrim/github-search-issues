import React, { useEffect, useState } from 'react';
import {
  Box,
  styled,
  css,
  TablePagination,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

import { EllipsisText } from '../atoms/EllipsisText';

const PER_PAGE = 6;

type PaginationListsProps = {
  issueDatas: Record<string, any>[];
};

type IssueData = {
  id: string;
  title: string;
  login: any;
  created_at: string;
  html_url: string;
  updated_at: string;
  avatar_url: string;
};

export const PaginationLists = styled((props: PaginationListsProps) => {
  /** Property */
  const { issueDatas, ...others } = props;

  const [issueLists, setIssueLists] = useState<IssueData[] | []>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PER_PAGE);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /** Function */

  useEffect(() => {
    const data = (issueDatas ?? []).map((data: Record<string, any>) => {
      const { created_at, html_url, title, updated_at, user } = data;
      const { avatar_url, login, id } = user;

      return { id, title, login, created_at, html_url, updated_at, avatar_url };
    });

    if (data.length > 0) {
      setIssueLists(data);
    }
  }, [issueDatas]);

  /** Render */
  return (
    <Box {...others} sx={{ position: 'relative', height: '675px' }}>
      <Box
        sx={{
          overflow: 'scroll',
          minHeight: '620px',
          maxHeight: '620px'
        }}
      >
        {issueLists
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data, index) => {
            const {
              title,
              login,
              html_url,
              updated_at,
              created_at,
              avatar_url
            } = data;

            return (
              <List key={index} className={'list'}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Box
                      component="img"
                      src={avatar_url}
                      alt={title}
                      sx={{ width: '70px', borderRadius: '10px', mr: 3 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6">{login}</Typography>
                        <Typography variant={'body2'} sx={{ ml: 1, mr: 1 }}>
                          {' - '}
                        </Typography>
                        <Typography
                          variant={'body2'}
                          onClick={() => window.open(html_url, '_target')}
                          sx={{
                            color: 'dodgerblue',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          이슈 보러 가기
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        component={'span'}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <EllipsisText
                          variant={'body2'}
                          sx={{ display: 'inline-block' }}
                        >
                          이슈 : {title}
                        </EllipsisText>

                        <Box>
                          <Typography
                            variant={'body2'}
                            component={'span'}
                            sx={{ display: 'inline-block' }}
                          >
                            만든 날짜 : {created_at}
                          </Typography>
                          <Typography
                            variant={'body2'}
                            component={'span'}
                            sx={{ fontWeight: 'bold', ml: 1, mr: 1 }}
                          >
                            {' | '}
                          </Typography>
                          <Typography
                            variant={'body2'}
                            component={'span'}
                            sx={{ display: 'inline-block' }}
                          >
                            업데이트 날짜 : {updated_at}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            );
          })}
      </Box>

      <TablePagination
        rowsPerPageOptions={[6, 10, 20]}
        component="div"
        count={issueLists.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ position: 'absolute', bottom: 0, right: 0 }}
      />
    </Box>
  );
})(({ theme }) => {
  return css`
    .list {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      border-radius: 10px;
      margin-top: 1;
      max-hight: 120px;
    }
  `;
});
