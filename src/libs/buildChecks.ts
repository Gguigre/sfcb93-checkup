import { Container, isCheckable, isContainer, Prop } from "../business/Prop";
import { Review } from "../business/review";

export const buildChecksForContainer = (itemToCheck: Container, containerName?: string): Review[] => {
  const verifications: Review[] = []
  const location = (containerName ? (containerName + " > ") : '') + itemToCheck.name

  const isEmpty = itemToCheck.content.length === 0
  if (!isEmpty) {
    const hasLeaf = itemToCheck.content.some(child => (child as Container).content === undefined)
    if (hasLeaf) {
      verifications.push({
        location,
        type: 'presence',
        items: getContentChecklist(itemToCheck)
      })
    }
  }

  const containerChildren = itemToCheck.content.filter(isContainer);
  containerChildren.forEach(
    (prop) => {
      const childrenChecks = buildChecksForContainer(prop, itemToCheck.name)
      verifications.push(...childrenChecks)
    }
  )

  const itemChildren = itemToCheck.content.filter(item => !isContainer(item));
  itemChildren.forEach(
    (prop) => {
      const checkable = isCheckable(prop)
      if (checkable) {
        verifications.push(
          ...prop.checks.map(check => ({...check, location: location + " > " + prop.name}))
        )
      }
    }
  )

  return verifications
}

export const getContentChecklist = (itemToCheck: Container) => {
  return itemToCheck.content.reduce<Array<string>>(
    (previousValue: string[], currentValue: Prop) => {
      return isContainer(currentValue) ? previousValue : [`${currentValue.number} x ${currentValue.name}` , ...previousValue]
    },
  [])
}
