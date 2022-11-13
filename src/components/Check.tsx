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
    <div style={{padding: 10}}>
      <h3>Vérifier que dans <strong style={{color: 'red'}}>{verification.location}</strong> il y a</h3>
      {verification.items.map(item => <span><br />{item}</span>)}
      <div>
        <button onClick={onOk}>
          Vérifié
        </button>
        <button>
          Problème
        </button>
      </div>
    </div>
    : null
  } else if (verification.type === 'date') {
    return <div style={{padding: 10}}>
      <h3>Vérifier la date de <strong style={{color: 'red'}}>{verification.location}</strong><br /></h3>
      {verification.name} : <input type={"month"}/>
      <div>
        <button onClick={onOk}>
          Vérifié
        </button>
        <button>
          Problème
        </button>
      </div>
    </div>
  } else if (verification.type === 'check') {
    return <div style={{padding: 10}}>
      <h3>Vérification pour <strong style={{color: 'red'}}>{verification.location}</strong><br /><strong style={{color: 'green'}}>{verification.name}</strong></h3>
      <div>
        <button onClick={onOk}>
          Vérifié
        </button>
        <button>
          Problème
        </button>
      </div>
    </div>
  }

  return null;
}
