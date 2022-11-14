import { useState } from 'react';
import './App.css';
import { Review } from './components/Review';
import LotA from "./data/A.json";
import { buildChecksForContainer } from './libs/buildChecks';

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

  return (
    <div className="App">
      {checks[checkIndex] !== undefined
      ? <Review review={checks[checkIndex]} onOk={onOk} onIssue={onIssue}/>
      : <div>
          {issues.map(issue => <><span>{issue}</span><br /></>)}
        </div>}
    </div>
  );
}

export default App;
