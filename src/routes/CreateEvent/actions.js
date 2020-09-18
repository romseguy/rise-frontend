import createAction from 'fsa-creator'
import types from 'redux/types'

export const onOutsideClick = createAction(types.UI_CREATE_EVENT_OUTSIDE_CLICKED)

export const onSubmit = createAction(types.UI_CREATE_EVENT_SUBMITTED, {
  type: 'object',
  required: ['title', 'tags', 'description'],
  properties: {
    title: {type: 'string'},
    tags: {type: 'array'},
    description: {type: 'string'},
    thumbnail: {type: 'object'}
  }
})

export const onDrop = createAction(types.UI_CREATE_EVENT_FILES_DROPPED, {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      lastModified: {type: 'number'},
      lastModifiedDate: {type: 'object'},
      name: {type: 'string'},
      preview: {type: 'string'},
      size: {type: 'number'},
      type: {type: 'string'},
      webkitRelativePath: {type: 'string'}
    }
  }
})

export const onClose = createAction(types.UI_CREATE_EVENT_CLOSED)

export const onLocationChange = createAction(types.UI_CREATE_EVENT_LOCATION_CHANGED, {type: 'string'})
export const onDateChange = createAction(types.UI_CREATE_EVENT_DATE_CHANGED, {type: 'object'/*moment*/})

export const onSuggestSelect = createAction(types.UI_CREATE_EVENT_SUGGEST_SELECTED, {
  required: ['label', 'location'],
  type: 'object',
  properties: {
    label: {
      type: 'string'
    },
    placeId: {
      type: 'string'
    },
    location: {
      type: 'object',
      required: ['lat', 'lng'],
      properties: {
        lat: {
          type: 'number'
        },
        lng: {
          type: 'number'
        }
      }
    },
    gmaps: {
      type: 'object'
      //https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult
    }
  }
})
