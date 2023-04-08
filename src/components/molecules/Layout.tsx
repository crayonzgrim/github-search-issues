import React from 'react';
import { styled, css } from '@mui/material';
import { OuterContainer, InnerContainer } from '../../styles';

type LayoutProps = {
  children: any;
};

export const Layout = styled((props: LayoutProps) => {
  /** Property */
  const { children, ...others } = props;

  /** Render */
  return (
    <OuterContainer {...others}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
})(({ theme }) => {
  return css``;
});
