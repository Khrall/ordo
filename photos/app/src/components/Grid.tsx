import * as React from 'react';
import styled from 'styled-components';

interface IGridProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = '200px';

const GridWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const GridLeft = styled.div`
  width: ${SIDEBAR_WIDTH};
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const GridMain = styled.div`
  width: calc(100% - ${SIDEBAR_WIDTH});
  height: 100%;
  position: relative;
  left: ${SIDEBAR_WIDTH};
`;

export const Grid = (props: IGridProps) => (
  <GridWrapper>{props.children}</GridWrapper>
);
