import React, { useCallback, useState } from "react";
import styled from 'styled-components';
import { CheckReview as CheckReviewType } from "../../business/review";
import { Check } from "../Check";
import { GenericReview } from "./GenericReview";

export const CheckReview: React.FC<{
  review: CheckReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {
  const [isChecked, setIsChecked] = useState(false);

  const onValueChange = useCallback((validated: boolean) => {
    setIsChecked(validated)
  }, [setIsChecked])

  return (
    <GenericReview
      Title={<h3>Vérification pour <RedText>{review.location}</RedText></h3>}
      onOk={onOk}
      onIssue={() => onIssue('problème avec ' + review.location + '\u00a0: ' + review.name)}
      canSubmit={isChecked}
      >
      <Check key={review.location+review.name} onValueChange={onValueChange} label={review.name}></Check>
    </GenericReview>)
}

const RedText = styled.strong({color: 'red'})
