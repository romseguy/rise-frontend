# Directory structure

```
/src
  /components         // local state only, no knowledge of Redux
  /containers         // global state allowed but not access to route props
    /someContainer
      actions.js      // container-specific action creators
  /routes             // global state and route props allowed
    /someRouteComponent
      actions.js      // route-specific action creators
    index.js          // router configuration
  /redux
    /modules
      actions.js      // action types
      sagas.js
      /auth
        index.js      // selectors
        actions.js    // module-specific action creators
        reducer.js
        sagas.js
        /ui
          actions.js  // action creators
          reducer.js
  /services
    /api
      /endpoint
        endpoint.js
        schemas.js
      /errors
        http.js
      api.js          // base API
      config.js
      createSchema.js // base schema and factory
      router.js       // express middleware for mocking

```

# State management

## Modules

### State shape

UI state must have its own reducer

```
{
  auth: {
    ui: {
      loading
    },
    session: {
      user
    },
    whateverArray: [
    ]
  }
}
```

### Selectors

Use selectors even when synchronously accessing data.

Good: keySelector(state)
Bad: state.key

This reduces the likelihood of mistyped variables leading to subtle undefined values, and simplifies changes to the state shape.

#### Rules

- Selectors must return immutable data, don't forget to wrap empty objects and arrays with `immu`.
- Call `toJS` on immutable array from `mapStateToProps` only, so you can map over it in component's `render` method.

#### Input selectors

```javascript
/*
 * Input-selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed (they do not transform the data they select)
 * and memoization wouldn't provide any benefits.
 */
const uiSelector = state => state.map.ui
const mapSelector = state => uiSelector(state).map
const streamsSelector = state => state.streams
```

#### Memoized selectors


```javascript
import immu from 'immu'
import { createSelector } from 'reselect'

/*
 * Input-selectors are combined to derive new information.
 * Here, visibleStreamsSelector is only recomputed when the value
 * of an input-selector (mapSelector or streamsSelector) changes.
 * Otherwise, the previous value is returned.
 */
const visibleStreamsSelector = createSelector(
  mapSelector,
  streamsSelector
  (map, streams) => {
    if (!map) {
      return immu([])
    }

    return getVisibleStreams(streams, map)
  }
)

function getVisibleStreams(streams, map) {
  return streams.filter(({ latitude, longitude }) => map.getBounds().contains(new L.LatLng(latitude, longitude)))
}
```

### Reducers

#### root

```javascript
import immu from 'immu'
import { identity } from 'ramda'
import types from 'redux/types'
import ui from './ui/reducer'
import session from './session/reducer'

const initialState = {}

/**
 * @param action
 * @returns {Function|undefined} state => newState
 */
function actionToTransition(action) {
  switch (action.type) {
    case '@@redux/INIT':
      return state => ({
        ui: ui(state.ui, action),
        session: session(state.session, action)
      })
      break
    case UI_ACTION:
      return state => ({
        ui: ui(state.ui, action)
      })
      break
    case SESSION_ACTION:
      return state => ({
        session: session(state.session, action)
      })
    default:
      return undefined
  }
}

export default function auth(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return immu({
    ...state,
    ...transition(state)
  })
}
```

#### ui or other sub-reducers

```javascript
import { identity } from 'ramda'
import types from 'redux/types'

const initialState = {
  key: false
}

const setKey = ({ key }) => state => ({key})

function actionToTransition({ type, payload }) {
  switch (type) {
    case types.UI_LOGIN_FORM_SUBMITTED:
      return setKey(payload)
    default:
      return undefined
  }
}

export default function ui(state = initialState, action = {}) {
  const transition = actionToTransition(action)

  if (!transition) {
    return state
  }

  return {
    ...state,
    ...transition(state)
  }
}
```

### Action types

We don't use actions to mean an *intent*, instead they describe *what happened*.

Events are either triggered from the UI or from sagas so we use the following convention:

- UI_$COMPONENTNAME$_$EVENT$ e.g: UI_LOGIN_FORM_SUBMITTED
- SAGA_$MODULE$_$EVENT$ e.g: SAGA_AUTH_RESPONSE

### Action creators

We don't use action creators if the action doesn't require a payload. Dispatch it directly from the component:

`dispatch({type: UI_LOGIN_FORM_SUBMITTED})`

Otherwise we make sure the payload is valid:

```javascript
import createAction from 'fsa-creator'
import types from 'redux/types'

export const loginFormSubmitted = createAction(types.UI_LOGIN_FORM_SUBMITTED, {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    email: {
      format: 'email'
    },
    password: {
      type: 'string'
    }
  }
})
```

### Sagas

Responsibilities of a saga:

- listens to an action pattern with [take](https://github.com/yelouafi/redux-saga#waiting-for-future-actions)
- handles all the side-effects like API service calls with [call and apply](https://github.com/yelouafi/redux-saga#declarative-effects)
- dispatches the services' responses back with [put](https://github.com/yelouafi/redux-saga#dispatching-actions-to-the-store)

#### Rules

- Modules should export a single saga as default export, in charge of calling sub-sagas and handling their errors

```javascript
import { take, put, call } from 'redux-saga/effects'
import types from 'redux/types'

import api, { schemas } from 'services/api/api'

import makeError from 'make-error-cause'
const ModuleSagaError = makeError('ModuleSagaError')
const SubSaga2Error = makeError('SubSaga2Error')

function* subSaga1() {
  while (true) {
    yield take(types.ACTION1)
    yield put(types.ACTION2)
  }
}

function* subSaga2() {
    yield take(types.ACTION3)
    const { response, body } = yield apply(api, api.getStuff)

    if (body === 'green') {
      throw new SubSaga2Error('stuff is green')

    yield put(types.ACTION4)
}

export default function* moduleSaga() {
  try {
    yield [
      call(subSaga1),
      call(subSaga2)
    ]
  } catch (cause) {
    let message = ''

    if (cause instanceof SubSaga2Error) {
      message = 'error during subSaga2'
    }

    throw new ModuleSagaError(message, cause)
  }
}
```


# Services
## API
### Schemas

http://www.jsonschemavalidator.net/

To create a new schema

```
import createSchema from 'services/api/utils/createSchema'

/* eslint-disable quotes */

export const streamsSchemas = {
  '/': createSchema({
    "someArray": {
      "type": "array",
      "items": {...}
  })
}
```

