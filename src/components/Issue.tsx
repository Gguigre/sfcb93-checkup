import React from "react";
import styled from "styled-components";
import { Issue as IssueType } from "../business/Issue";

type Props = {
  issue: IssueType
}

export const Issue: React.FC<Props> = ({issue}) => {
  return <Container>
    <strong>[{issue.location}]</strong><br />
    {issue.description}
  </Container>
}

const Container = styled.div(() => ({ padding: 8, backgroundColor: '#cccccc', color: 'black', borderBottom: '1px solid black', 'text-align': "left"}))
