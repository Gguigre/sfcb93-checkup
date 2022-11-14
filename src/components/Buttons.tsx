import React from "react"
import styled from 'styled-components'

type Props = {
  onOk: () => void,
  onIssue: () => void,
}

export const Buttons: React.FC<Props> = ({onOk, onIssue}) => {
  return <Container>
  <Button onClick={onIssue}>
    <strong>❌ Problème</strong>
  </Button>
  <Button onClick={onOk}>
    <strong>✅ Vérifié</strong>
  </Button>
</Container>
}

const Container = styled.div({display: "flex", justifyContent: "space-around"})
const Button = styled.button({padding: 8})
