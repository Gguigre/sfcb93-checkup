import React, { ChangeEvent, useCallback, useState } from "react";
import styled from 'styled-components';
import { Issue } from "../../business/Issue";
import { DateReview as DateReviewType } from "../../business/review";
import { GenericReview } from "./GenericReview";

const MS_IN_DAY = 1_000 * 60 * 60 * 24
const EXPIRATION_WARNING_DAYS = 30;
const EXPIRATION_WARNING_MS = MS_IN_DAY * EXPIRATION_WARNING_DAYS;

const isWithin30Days = (date: string) => {
  return +(new Date()) - +(new Date(date)) > -EXPIRATION_WARNING_MS
}
const isPast = (date: string) => {
  return +(new Date()) - +(new Date(date)) > 0
}

type Props = {
  review: DateReviewType,
  onOk: () => void,
  onIssue: (issue: Issue) => void,
}

export const DateReview: React.FC<Props> = ({review, onOk, onIssue}) => {
  const [date, setDate] = useState<string | undefined>()
  const isDateInvalid = date ? isWithin30Days(date) : false;

  const onDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {setDate(e.target.value)}, [setDate])
  const onIssueCallback = useCallback(() => {
    const isPastDate = date && isPast(date)
    const defaultMessage = isPastDate ? `Date de péremption dépassée : ${date}` : `Date de péremption dans moins d'un mois : ${date}`
    const description = window.prompt(`Description du problème en plus de la date ${isPastDate ? 'dépassée' : 'proche'}`, ``)
      if (description) {
        onIssue({
          location: review.location,
          description : `${defaultMessage} ET ${description}`
        })
      }
  }, [onIssue, review.location, date])

  const onOkCallback = useCallback(() => {
    if (isDateInvalid && date) {
      const description = isPast(date) ? `Date de péremption dépassée : ${date}` : `Date de péremption dans moins d'un mois : ${date}`
      onIssue({
        location: review.location,
        description
      })
    } else {
      onOk()
    }
  }, [isDateInvalid, review.location, date, onIssue, onOk])

  return <GenericReview
    Title={<h1>Vérifier la date de <RedText>{review.location}</RedText></h1>}
    onOk={onOkCallback}
    onIssue={onIssueCallback}
    canSubmit={!!date}>
    {review.name}&nbsp;: <input type="month" onChange={onDateChange}/>
    <ErrorContainer>
      {isDateInvalid && <RedText>La date de péremption est proche ou dépassée, un problème sera automatiquement remontée</RedText>}
    </ErrorContainer>
  </GenericReview>
}

const RedText = styled.strong({color: 'red'})
const ErrorContainer = styled.div({ marginTop: 16, marginBottom: 16})
