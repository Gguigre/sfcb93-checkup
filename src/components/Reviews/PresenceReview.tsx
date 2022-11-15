import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { PresenceReview as PresenceReviewType } from "../../business/review";
import { Check } from "../Check";
import { GenericReview } from "./GenericReview";

export const PresenceReview: React.FC<{
  review: PresenceReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {

  const [nbChecked, setNbChecked] = useState(0);

  const onIssueCallback = useCallback(
    () => onIssue('problème avec ' + review.location),
    [onIssue, review.location]
  )
  
  const onValueChange = useCallback((value: boolean) => {
    if (value) {
      setNbChecked(currentNb => currentNb+1)
    } else {
      setNbChecked(currentNb => currentNb-1)
    }
  }, [setNbChecked])

  return review.items.length > 0 ?
  <GenericReview
    Title={<h1>Vérifier que dans <RedText>{review.location}</RedText> il y a</h1>}
    onOk={onOk}
    onIssue={onIssueCallback}
    canSubmit={nbChecked === review.items.length}>
    {review.items.map(item => <Check key={item} onValueChange={onValueChange} label={item}></Check>)}
  </GenericReview>
  : null
}

const RedText = styled.strong({color: 'red'})