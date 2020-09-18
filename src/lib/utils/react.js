import { keys, filter, is, not } from 'ramda'

export function shallowCompare(nextState, nextProps) {
  const noFn = (props) => filter(prop => not(is(Function, prop)), props || {})

  return !isEqualShallow(noFn(this.props), noFn(nextProps)) || !isEqualShallow(noFn(this.state), noFn(nextState))
}

function isEqualShallow(objA, objB) {
  if (objA === objB) {
    return true
  }

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = keys(objA)
  const keysB = keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}
