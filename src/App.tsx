import { useState } from 'react';
import styled from 'styled-components';
import { Issue } from './business/Issue';
import { Container } from './business/Prop';
import { IssuesSumUp } from './components/IssuesSumUp';
import { LotChoice } from './components/LotChoice';
import { Review } from './components/Review';
import LotANoisy from "./data/A_Noisy.json";
import LotASTDenis from "./data/A_St-Denis.json";
import { buildChecksForContainer } from './libs/buildChecks';

const lotChoices = [{
  name: "Lot A Noisy",
  data: LotANoisy
},{
  name: "Lot A St Denis",
  data: LotASTDenis
}]

function App() {

  const [checkIndex, setCheckIndex] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [lot, setLot] = useState<Container | null>(null)

  const onLotChoice = (data: Container) => {
    setLot(data)
  }

  const checks = lot ? buildChecksForContainer(lot) : [];

  const onOk = () => {
    setCheckIndex(checkIndex+1)
  }

  const onIssue = (issue: Issue) => {
    setIssues([...issues, issue])
    setCheckIndex(checkIndex+1)
  }

  return (
    <AppContainer>
      {lot === null ? <LotChoice choices={lotChoices} onChoice={onLotChoice} /> : checks[checkIndex] !== undefined
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
