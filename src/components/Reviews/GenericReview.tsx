import React from "react";
import styled from 'styled-components';
import { Buttons } from "../Buttons";


export const GenericReview: React.FC<{
  onOk: () => void,
  onIssue: () => void,
  Title: React.ReactNode,
  canSubmit: boolean,
  children: React.ReactNode}
> = ({ onOk, onIssue, Title, canSubmit, children }) => {
  return <Container>
  <ContentContainer>
    {Title}
    <Content>
      {children}
    </Content>
    <Buttons onOk={onOk} onIssue={onIssue} canSubmit={canSubmit} />
  </ContentContainer>
</Container>
}

const Container = styled.div({flexDirection: "column", display: "flex", height: '100%'})
const ContentContainer = styled.div({padding: 48, flex: 1, display: 'flex', flexDirection: "column"})
const Content = styled.div({flex: 1})
