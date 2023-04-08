import React from 'react';
import {
  styled,
  css,
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';

import { Button } from '../atoms/Button';
import { EllipsisText } from '../atoms/EllipsisText';

type CardProps = {
  title: string;
  name: string;
  avatar: any;
  url: string;
  userId: string;
  remove: () => void;
};

export const Card = styled((props: CardProps) => {
  /** Property */
  const { title, name, avatar, url, userId, remove, ...others } = props;

  /** Function */
  const handleMoveToRepo = () => {
    window.open(url, '_blank');
  };

  /** Render */
  return (
    <MuiCard {...others}>
      <CardMedia component="img" alt={'name'} image={avatar} height="150" />

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" sx={{ mr: 2 }}>
          {title ?? ''}
        </Typography>
        <EllipsisText variant="body2" color="text.secondary">
          {name ?? ''}
        </EllipsisText>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant={'contained'} size={'small'} onClick={handleMoveToRepo}>
          Go to repository
        </Button>
        <Button variant={'outlined'} size={'small'} onClick={remove}>
          Delete
        </Button>
      </CardActions>
    </MuiCard>
  );
})(({ theme }) => {
  return css`
    min-width: 370px;
    max-width: 370px;
    padding: 10px;
    margin-top: 10px;

    ${theme.breakpoints.down('md')} {
      width: 100%;
    }
  `;
});
