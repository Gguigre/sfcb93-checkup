import { useState } from 'react';
import './App.css';
import { Verification } from './components/Check';
import LotA from "./data/A.json";
import { buildChecksForContainer } from './scripts/buildChecks';

const checks = buildChecksForContainer(LotA);

function App() {

  const [checkIndex, setCheckIndex] = useState(0);
  const [issues, setIssues] = useState<string[]>([]);

  const onOk = () => {
    setCheckIndex(checkIndex+1)
  }

  const onIssue = (issue: string) => {
    setIssues([...issues, issue])
    setCheckIndex(checkIndex+1)
  }

  console.log(checks[checkIndex]);
  

  return (
    <div className="App">
      {checks[checkIndex] !== undefined
      ? <Verification verification={checks[checkIndex]} onOk={onOk} onIssue={onIssue}/>
      : <div>
          {issues.map(issue => <><span>{issue}</span><br /></>)}
        </div>}
    </div>
  );
}

export default App;
