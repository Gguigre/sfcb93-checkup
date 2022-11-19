import { useState } from 'react';
import styled from 'styled-components';
import { Issue } from './business/Issue';
import { IssuesSumUp } from './components/IssuesSumUp';
import { Review } from './components/Review';
import LotA from "./data/A.json";
import { buildChecksForContainer } from './libs/buildChecks';

const checks = buildChecksForContainer(LotA);

function App() {

  const [checkIndex, setCheckIndex] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);

  const onOk = () => {
    setCheckIndex(checkIndex+1)
  }

  const onIssue = (issue: Issue) => {
    setIssues([...issues, issue])
    setCheckIndex(checkIndex+1)
  }

  return (
    <AppContainer>
      {checks[checkIndex] !== undefined
      ? <Review review={checks[checkIndex]} onOk={onOk} onIssue={onIssue} progress={checks.length > 0 ? checkIndex/checks.length : 0}/>
      : <IssuesSumUp issues={issues} />}
    </AppContainer>
  );
}

const AppContainer = styled.div({
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: '#282c34',
  color: 'white',
  height: '100%',
})

export default App;
