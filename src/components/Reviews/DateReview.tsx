import React, { useState } from "react";
import styled from 'styled-components';
import { DateReview as DateReviewType } from "../../business/review";
import { GenericReview } from "./GenericReview";

export const DateReview: React.FC<{
  review: DateReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {
  const [date, setDate] = useState<string | undefined>()
  
  return <GenericReview
  Title={<h3>Vérifier la date de <RedText>{review.location}</RedText></h3>}
  onOk={onOk}
  onIssue={() => onIssue('problème avec ' + review.location + ' date')}
  canSubmit={!!date}>
  {review.name}&nbsp;: <input type="month" onChange={(e) => setDate(e.target.value)}/>
</GenericReview>
}

const RedText = styled.strong({color: 'red'})
