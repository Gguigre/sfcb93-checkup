import { useState } from 'react';
import styled from 'styled-components';
import { Issue } from './business/Issue';
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
      ? <Review review={checks[checkIndex]} onOk={onOk} onIssue={onIssue}/>
      : <div>
          {issues.map(issue => <>{JSON.stringify(issue)}<br /></>)}
        </div>}
    </AppContainer>
  );
}

const AppContainer = styled.div({
  padding: 16,
  paddingBottom: 48,
  textAlign: 'center',
  backgroundColor: '#282c34',
  color: 'white',
  height: '100vh',
})

export default App;
