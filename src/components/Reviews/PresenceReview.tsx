import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Issue } from "../../business/Issue";
import { PresenceReview as PresenceReviewType } from "../../business/review";
import { Check } from "../Check";
import { GenericReview } from "./GenericReview";

export const PresenceReview: React.FC<{
  review: PresenceReviewType,
  onOk: () => void,
  onIssue: (issue: Issue) => void,
}> = ({review, onOk, onIssue}) => {

  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

  const onIssueCallback = useCallback(
    () => {
      const uncheckedItems = review.items.filter(item => !checkedItems.includes(item))
      const description = window.prompt('Description du problème', `Il manque ${uncheckedItems}`)
      if (description) {
        onIssue({
          location: review.location,
          description
        })
      }
    },
    [onIssue, review.location, review.items, checkedItems]
  )

  const onValueChange = (item: string) => (checked: boolean) => { checked ? onCheck(item) : onUncheck(item)}
  const onCheck = useCallback((item: string) => {
    if (!checkedItems.includes(item)) {
      setCheckedItems(currentCheckedItems => [...currentCheckedItems, item])
    }
  },[checkedItems])
  const onUncheck = useCallback((item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(currentCheckedItems => currentCheckedItems.filter(checkedItem => checkedItem !== item))
    }
  },[checkedItems])

  return review.items.length > 0 ?
  <GenericReview
    Title={<h1>Vérifier que dans <RedText>{review.location}</RedText> il y a</h1>}
    onOk={onOk}
    onIssue={onIssueCallback}
    canSubmit={checkedItems.length === review.items.length}>
    {review.items.map(item => <Check key={item} onValueChange={onValueChange(item)} label={item}></Check>)}
  </GenericReview>
  : null
}

const RedText = styled.strong({color: 'red'})
