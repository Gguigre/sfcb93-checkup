import React from "react";
import { Issue } from "../business/Issue";
import { Review as ReviewType } from "../business/review";
import { CheckReview } from "./Reviews/CheckReview";
import { DateReview } from "./Reviews/DateReview";
import { PresenceReview } from "./Reviews/PresenceReview";

type Props = {
  review: ReviewType,
  onOk: () => void,
  onIssue: (issue: Issue) => void,
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
