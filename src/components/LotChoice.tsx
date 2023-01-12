import React from "react";
import styled from "styled-components";
import { Container } from "../business/Prop";

type Props = {
  choices: Array<{
    name: string;
    data: Container;
  }>;
  onChoice: (choice: Container) => void;
};

export const LotChoice: React.FC<Props> = ({ choices, onChoice, ...props }) => {
  return (
    <ContainerView>
      {choices.map((choice) => (
        <Choice onClick={() => {
          onChoice(choice.data)
        }}>{choice.name}</Choice>
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
