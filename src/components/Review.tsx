import React, { PropsWithChildren } from "react";
import styled from 'styled-components'
import { Review as ReviewType, PresenceReview as PresenceReviewType, DateReview as DateReviewType, CheckReview as CheckReviewType } from "../business/review";
import { Buttons } from "./Buttons";
import { Check } from "./Check";

type Props = {
  review: ReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}

const GenericReview = ({ onOk, onIssue, Title, children }: PropsWithChildren<{onOk: () => void, onIssue: () => void, Title: React.ReactNode}>) => {
  return <Container>
  <ContentContainer>
    {Title}
    <Content>
      {children}
    </Content>
    <Buttons onOk={onOk} onIssue={onIssue} />
  </ContentContainer>
</Container>
}

const PresenceReview: React.FC<{
  review: PresenceReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {
  return review.items.length > 0 ?
  <GenericReview
    Title={<h3>Vérifier que dans <RedText>{review.location}</RedText> il y a</h3>}
    onOk={onOk}
    onIssue={() => onIssue('problème avec ' + review.location)}>
    {review.items.map(item => <Check key={item} onValueChange={() => {}} label={item}></Check>)}
  </GenericReview>
  : null
}

const DateReview: React.FC<{
  review: DateReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => {
  return <GenericReview
  Title={<h3>Vérifier la date de <RedText>{review.location}</RedText></h3>}
  onOk={onOk}
  onIssue={() => onIssue('problème avec ' + review.location + ' date')}>
  {review.name}&nbsp;: <input type="month"/>
</GenericReview>
}


const CheckReview: React.FC<{
  review: CheckReviewType,
  onOk: () => void,
  onIssue: (issue: string) => void,
}> = ({review, onOk, onIssue}) => (
<GenericReview
  Title={<h3>Vérification pour <RedText>{review.location}</RedText></h3>}
  onOk={onOk}
  onIssue={() => onIssue('problème avec ' + review.location + '\u00a0: ' + review.name)}>
  {<GreenText>{review.name}</GreenText>}
</GenericReview>)

export const Review: React.FC<Props> = ({review, ...props}) => {

  switch (review.type) {
    case 'check':
      return <CheckReview review={review} {...props} />
    case 'presence':
      return <PresenceReview review={review} {...props} />
    case 'date':
      return <DateReview review={review} {...props} />
  }

  return null;
}

const Container = styled.div({flexDirection: "column", display: "flex", height: '100%'})
const ContentContainer = styled.div({padding: 48, flex: 1, display: 'flex', flexDirection: "column"})
const Content = styled.div({flex: 1})
const RedText = styled.strong({color: 'red'})
const GreenText= styled.strong({color: 'green'})
