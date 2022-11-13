import { Check } from "./Check";

export type Prop = Container | Item

export type Container = {
  name: string,
  content: Prop[],
}
export type Item = CheckableItem | NonCheckableItem

export type CheckableItem = {
  name: string,
  number: number,
  checks: Check[],
}

export type NonCheckableItem = {
  name: string,
  number: number,
}

export const isContainer = (value: Prop): value is Container => {
  return (value as Container).content !== undefined
}

export const isCheckable = (value: Prop): value is CheckableItem => {
  return (value as CheckableItem).checks !== undefined
}
