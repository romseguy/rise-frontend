export default function waitForEvent(elm, eventType) {
  return new Promise(resolve => {
    const cb = e => {
      resolve(e)
      elm.removeEventListener(eventType, cb)
    }
    elm.addEventListener(eventType, cb)
  })
}
