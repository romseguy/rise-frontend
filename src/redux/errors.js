import R from 'ramda'
import makeError, { BaseError } from 'make-error-cause'
import createAction from 'fsa-creator'
import types from 'redux/types'

const sagaError = createAction(types.SAGA_ERROR, {type: 'object'})

export const MainSagaError = makeError('MainSagaError')
export const AuthSagaError = makeError('AuthSagaError')
export const StreamsSagaError = makeError('StreamsSagaError')
export const NewsfeedSagaError = makeError('NewsfeedSagaError')

export const ForbiddenFileTypeError = makeError('ForbiddenFileTypeError')

export function createSagaError(errorProto, message, cause) {
  if (R.is(Object, message)) {
    return sagaError(new errorProto(message))
  }

  return sagaError(new errorProto(message, cause))
}

export class OneTimeUserError extends BaseError {
  constructor({ message, code, cause }) {
    if (typeof cause === 'string') {
      if (cause === '/login') {
        switch (code) {
          case 2:
            message = 'Invalid email or password'
            break
          default:
        }
      }
    }

    super(message, cause instanceof Error ? cause : undefined)
  }
}

export class HTTPResponseError extends BaseError {
  constructor(response, cause) {
    let message = ''

    switch (response.status) {
      default:
        message = `unhandled HTTP code ${response.status}`
    }

    super(message, cause)
  }
}
