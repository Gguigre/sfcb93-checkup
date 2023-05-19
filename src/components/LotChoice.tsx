import React from "react";
import styled from "styled-components";
import { Container } from "../business/Prop";
import Switch from "react-switch";

type Props = {
  choices: Array<Container>;
  onChoice: (choice: Container, isQuickCheck: boolean) => void;
};

export const LotChoice: React.FC<Props> = ({ choices, onChoice, ...props }) => {
  const [isQuickCheck, setIsQuickCheck] = React.useState(false);
  const handleChange = (value: boolean) => {
    setIsQuickCheck(value);
  };
  const onChoicePress = (data: Container) => () => {
    onChoice(data, isQuickCheck);
  };

  return (
    <ContainerView>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: 20, padding: 20 }}>
          Mode vérification rapide
        </div>
        <Switch onChange={handleChange} checked={isQuickCheck} />
      </div>
      {choices.map((choice) => (
        <Choice onClick={onChoicePress(choice)}>{choice.name}</Choice>
      ))}
    </ContainerView>
  );
};

const ContainerView = styled.div({
  flexDirection: "column",
  display: "flex",
  height: "100%",
});
const Choice = styled.div({
  display: "flex",
  padding: 32,
  backgroundColor: "#A0A0A0",
  marginTop: 16,
  marginBottom: 16,
  fontWeight: "bold",
  color: "black",
  fontSize: 24,
  justifyContent: "center",
  borderRadius: 8,
});
