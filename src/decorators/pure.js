import { shallowCompare } from 'lib/utils/react'

export default function pure(Component) {
  Component.prototype.shouldComponentUpdate = shallowCompare
}
