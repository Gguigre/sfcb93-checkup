import React from "react"
import styled from 'styled-components'

type Props = {
  onOk: () => void,
  onIssue: () => void,
  canSubmit?: boolean,
}

export const Buttons: React.FC<Props> = ({onOk, onIssue, canSubmit}) => {
  return <Container>
  <Button onClick={onIssue}>
    <strong>❌ Problème</strong>
  </Button>
  <Button onClick={onOk} disabled={!canSubmit}>
    <strong>✅ Vérifié</strong>
  </Button>
</Container>
}

const Container = styled.div({display: "flex", justifyContent: "space-around", paddingBottom: 32, paddingtop: 16})
const Button = styled.button({padding: 8})
