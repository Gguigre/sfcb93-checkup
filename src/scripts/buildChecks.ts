import { Container, isCheckable, isContainer, Prop } from "../business/Prop";
import { Verification } from "../business/Verification";




export const buildChecksForContainer = (itemToCheck: Container, containerName?: string): Verification[] => {
  const verifications: Verification[] = []
  const location = (containerName ? (containerName + " > ") : '') + itemToCheck.name

  verifications.push({ location, type: 'presence', items: itemToCheck.content.map(prop => prop.name)})

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
