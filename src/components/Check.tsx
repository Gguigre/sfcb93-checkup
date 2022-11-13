import React from "react";
import { Verification as VerificationType } from "../business/Verification";

type Props = {
  verification: VerificationType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}

export const Verification: React.FC<Props> = ({verification, onOk, onIssue}) => {

  if (verification.type === 'presence') {
    return verification.items.length > 0 ?
    <div style={{flexDirection: "column", display: "flex", height: '100%'}}>
      <div style={{padding: 24, flex: 1, display: 'flex', flexDirection: "column"}}>
        <h3>Vérifier que dans <strong style={{color: 'red'}}>{verification.location}</strong> il y a</h3>
        <div style={{flex: 1}}>{verification.items.map(item => <span><br />{item}</span>)}</div>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <button onClick={() => onIssue('')} style={{backgroundColor: "red", padding: 8}}>
            <strong>Problème</strong>
          </button>
          <button onClick={onOk} style={{backgroundColor: "greenyellow", padding: 8}}>
            <strong>Vérifié</strong>
          </button>
        </div>
      </div>
    </div>
    : null
  } else if (verification.type === 'date') {
    return <div style={{flexDirection: "column", display: "flex", height: '100%'}}>
    <div style={{padding: 24, flex: 1, display: 'flex', flexDirection: "column"}}>
      <h3>Vérifier la date de <strong style={{color: 'red'}}>{verification.location}</strong><br /></h3>
      <div style={{flex: 1}}>{verification.name} : <input type={"month"}/></div>
      <div style={{display: "flex", justifyContent: "space-around"}}>
          <button onClick={() => onIssue('')} style={{backgroundColor: "red", padding: 8}}>
            <strong>Problème</strong>
          </button>
          <button onClick={onOk} style={{backgroundColor: "greenyellow", padding: 8}}>
            <strong>Vérifié</strong>
          </button>
        </div>
      </div>
    </div>
  } else if (verification.type === 'check') {
    return <div style={{flexDirection: "column", display: "flex", height: '100%'}}>
            <div style={{padding: 24, flex: 1, display: 'flex', flexDirection: "column"}}>
              <h3>Vérification pour <strong style={{color: 'red'}}>{verification.location}</strong></h3>
              <div style={{flex: 1}}>
                <strong style={{color: 'green'}}>{verification.name}</strong>
              </div>
              <div style={{display: "flex", justifyContent: "space-around"}}>
                <button onClick={() => onIssue('')} style={{backgroundColor: "red", padding: 8}}>
                  <strong>Problème</strong>
                </button>
                <button onClick={onOk} style={{backgroundColor: "greenyellow", padding: 8}}>
                  <strong>Vérifié</strong>
                </button>
              </div>
            </div>
          </div>
  }

  return null;
}
