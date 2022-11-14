import { Container, isCheckable, isContainer } from "../business/Prop";
import { Verification } from "../business/Verification";




export const buildChecksForContainer = (itemToCheck: Container, containerName?: string): Verification[] => {
  const verifications: Verification[] = []
  const location = (containerName ? (containerName + " > ") : '') + itemToCheck.name

  const isEmpty = itemToCheck.content.length === 0
  if (!isEmpty) {
    const hasLeaf = itemToCheck.content.some(child => (child as Container).content === undefined)
    if (hasLeaf) {
      verifications.push({ location, type: 'presence', items: itemToCheck.content.map(prop => prop.name)})
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
