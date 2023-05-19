import { useState } from "react";
import styled from "styled-components";
import { Issue } from "./business/Issue";
import { Container } from "./business/Prop";
import { IssuesSumUp } from "./components/IssuesSumUp";
import { LotChoice } from "./components/LotChoice";
import { Review } from "./components/Review";
import SFCBLogo from "./assets/Croix-Blanche_Logo.png";
import LotANoisy from "./data/A_Noisy.json";
import LotASTDenis from "./data/A_St-Denis.json";
import { buildChecksForContainer } from "./libs/buildChecks";
import { Review as ReviewType } from "./business/review";

const lotChoices = [
  {
    name: "Lot A Noisy",
    data: LotANoisy,
  },
  {
    name: "Lot A St Denis",
    data: LotASTDenis,
  },
];

function App() {
  const [checkIndex, setCheckIndex] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [lot, setLot] = useState<Container | null>(null);
  const [checks, setChecks] = useState<Array<ReviewType>>([]);

  const onLotChoice = (data: Container, isQuickCheck: boolean) => {
    setLot(data);
    setChecks(buildChecksForContainer(data, null, isQuickCheck));
  };

  const onOk = () => {
    setCheckIndex(checkIndex + 1);
  };

  const onIssue = (issue: Issue) => {
    setIssues([...issues, issue]);
    setCheckIndex(checkIndex + 1);
  };

  const onRestart = () => {
    setCheckIndex(0);
    setIssues([]);
    setLot(null);
  };

  return (
    <AppContainer>
      <Header>
        <Title>
          <Logo src={SFCBLogo} alt="Logo SFCB" />
          Vérification du matériel SFCB93
        </Title>
        <RestartButton onClick={onRestart}>🔁 Restart</RestartButton>
      </Header>
      <AppContent>
        {lot === null ? (
          <LotChoice choices={lotChoices} onChoice={onLotChoice} />
        ) : checks[checkIndex] !== undefined ? (
          <Review
            review={checks[checkIndex]}
            onOk={onOk}
            onIssue={onIssue}
            progress={checks.length > 0 ? checkIndex / checks.length : 0}
          />
        ) : (
          <IssuesSumUp issues={issues} />
        )}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div({
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: "#282c34",
  color: "white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
const AppContent = styled.div({
  flex: 1,
});
const Header = styled.div({
  padding: 16,
  backgroundColor: "#282c34",
  borderBottom: "2px solid white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const RestartButton = styled.button({
  padding: 4,
  fontWeight: "bolder",
  fontSize: 16,
});
const Title = styled.div({
  display: "flex",
  alignItems: "center",
});
const Logo = styled.img({
  height: 32,
  marginRight: 8,
});

export default App;
