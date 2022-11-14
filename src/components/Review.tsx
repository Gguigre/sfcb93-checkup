import React, { PropsWithChildren, useState, useCallback } from "react";
import styled from 'styled-components'
import { Review as ReviewType, PresenceReview as PresenceReviewType, DateReview as DateReviewType, CheckReview as CheckReviewType } from "../business/review";
import { Buttons } from "./Buttons";
import { Check } from "./Check";

type Props = {
  review: ReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}

const GenericReview = ({ onOk, onIssue, Title, canSubmit, children }: PropsWithChildren<{onOk: () => void, onIssue: () => void, Title: React.ReactNode, canSubmit: boolean}>) => {
  return <Container>
  <ContentContainer>
    {Title}
    <Content>
      {children}
    </Content>
    <Buttons onOk={onOk} onIssue={onIssue} canSubmit={canSubmit} />
  </ContentContainer>
</Container>
}

const PresenceReview: React.FC<{
  review: PresenceReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {

  const [nbChecked, setNbChecked] = useState(0);

  const onValueChange = useCallback((value: boolean) => {
    if (value) {
      setNbChecked(currentNb => currentNb+1)
    } else {
      setNbChecked(currentNb => currentNb-1)
    }
  }, [setNbChecked])

  return review.items.length > 0 ?
  <GenericReview
    Title={<h3>Vérifier que dans <RedText>{review.location}</RedText> il y a</h3>}
    onOk={onOk}
    onIssue={() => onIssue('problème avec ' + review.location)}
    canSubmit={nbChecked === review.items.length}>
    {review.items.map(item => <Check key={item} onValueChange={onValueChange} label={item}></Check>)}
  </GenericReview>
  : null
}

const DateReview: React.FC<{
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


const CheckReview: React.FC<{
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

export const Review: React.FC<Props> = ({review, ...props}) => {

  switch (review.type) {
    case 'check':
      return <CheckReview key={JSON.stringify(review)} review={review} {...props} />
    case 'presence':
      return <PresenceReview key={JSON.stringify(review)} review={review} {...props} />
    case 'date':
      return <DateReview key={JSON.stringify(review)} review={review} {...props} />
  }
}

const Container = styled.div({flexDirection: "column", display: "flex", height: '100%'})
const ContentContainer = styled.div({padding: 48, flex: 1, display: 'flex', flexDirection: "column"})
const Content = styled.div({flex: 1})
const RedText = styled.strong({color: 'red'})
