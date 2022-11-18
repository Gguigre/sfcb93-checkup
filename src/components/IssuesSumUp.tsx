import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { Issue as IssueType } from '../business/Issue'
import { Issue } from './Issue'

type Props = {
  issues: Array<IssueType>
}

export const IssuesSumUp: React.FC<Props> = ({issues}) => {

  const hasIssues = issues.length > 0

  const [chiefName, setChiefName] = useState<string | null>()

  const onChiefNameChange = (e: ChangeEvent<HTMLInputElement>) => { setChiefName(e.target.value) }

  const mailTo = `mailto:gui.gremi@gmail.com?subject=${encodeURIComponent(`[${hasIssues ? `${issues.length} problèmes` : <h3>R.A.S.</h3>}]`)}&body=${encodeURIComponent(`Date : ${(new Date()).toLocaleString()} \n Chef de poste : ${chiefName} \n\n\n ${hasIssues && issues.map(issue => `[${issue.location}]\n ${issue.description}\n\n`)}`)}`

  return <div>
    <h1>Résumé des problèmes rencontrés</h1>
    <h2>Liste des problèmes</h2>
    {hasIssues ? issues.map(issue => <Issue issue={issue} />) : <h3>R.A.S.</h3>}
    <h2>Signature du checkup</h2>
    <div>
      <strong>Nom du chef de poste : </strong>
      <input type={'text'} onChange={onChiefNameChange}/>

      <a href={chiefName ? mailTo :`#`}>
      <Button disabled={!chiefName} type="submit">
        <strong>✅ Vérifié</strong>
      </Button>
      </a>
    </div>
  </div>
}

const Button = styled.button({padding: 8})
