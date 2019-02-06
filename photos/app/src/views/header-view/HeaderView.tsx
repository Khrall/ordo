import * as React from 'react';
import styled from 'styled-components';

const HeaderViewContainer = styled.div`
  background: #F0F0F0;
  overflow: auto;
  height: 48px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0 10px;
`;

export class HeaderView extends React.Component<{}, {}> {
  public render = () => (
    <HeaderViewContainer>
      <Title>Ordo</Title>
    </HeaderViewContainer>
  )
}
