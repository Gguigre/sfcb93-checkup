import React, { ChangeEvent, useCallback, useState } from "react";
import styled from 'styled-components';
import { DateReview as DateReviewType } from "../../business/review";
import { GenericReview } from "./GenericReview";

const MS_IN_DAY = 1_000 * 60 * 60 * 24
const EXPIRATION_WARNING_DAYS = 30;
const EXPIRATION_WARNING_MS = MS_IN_DAY * EXPIRATION_WARNING_DAYS;

const isWithin30Days = (date: string) => {
  return +(new Date()) - +(new Date(date)) > -EXPIRATION_WARNING_MS
}

export const DateReview: React.FC<{
  review: DateReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {
  const [date, setDate] = useState<string | undefined>()
  const isDateInvalid = date ? isWithin30Days(date) : false;

  const onDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value), [setDate])
  const onIssueCallback = useCallback(() => onIssue('problème avec ' + review.location + ' date'), [onIssue, review.location])
  const onOkCallback = useCallback(() => {
    if (isDateInvalid) {
      onIssueCallback()
    } else {
      onOk()
    }
  }, [isDateInvalid, onIssueCallback, onOk])

  return <GenericReview
    Title={<h3>Vérifier la date de <RedText>{review.location}</RedText></h3>}
    onOk={onOkCallback}
    onIssue={onIssueCallback}
    canSubmit={!!date}>
    {review.name}&nbsp;: <input type="month" onChange={onDateChange}/>
    <ErrorContainer>
      {isDateInvalid && <RedText>La date de péremption est proche ou dépassée, une anomalie sera automatiquement remontée</RedText>}
    </ErrorContainer>
  </GenericReview>
}

const RedText = styled.strong({color: 'red'})
const ErrorContainer = styled.div({ marginTop: 16, marginBottom: 16})
