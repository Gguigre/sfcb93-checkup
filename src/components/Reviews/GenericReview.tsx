import React from "react";
import styled from 'styled-components';
import { Buttons } from "../Buttons";
import ProgressBar from "../ProgressBar";


export const GenericReview: React.FC<{
  onOk: () => void,
  onIssue: () => void,
  Title: React.ReactNode,
  canSubmit: boolean,
  progress: number,
  children: React.ReactNode}
> = ({ onOk, onIssue, Title, progress, canSubmit, children }) => {
  return <Container>
  <ContentContainer>
    {Title}
    <ProgressBar progress={progress} color={'red'} />
    <Content>
      {children}
    </Content>
    <Buttons onOk={onOk} onIssue={onIssue} canSubmit={canSubmit} />
  </ContentContainer>
</Container>
}

const Container = styled.div({flexDirection: "column", display: "flex", height: '100%'})
const ContentContainer = styled.div({flex: 1, display: 'flex', flexDirection: "column"})
const Content = styled.div({flex: 1, marginTop: 32})
