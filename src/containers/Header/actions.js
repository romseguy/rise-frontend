import createAction from 'fsa-creator'
import types from 'redux/types'

export const NewsfeedButtonActions = {
  onClick: createAction(types.UI_NEWSFEED_BUTTON_CLICKED)
}

export const SigninButtonActions = {
  onClick: createAction(types.UI_HEADER_SIGNIN_BUTTON_CLICKED)
}

export const UserMenuActions = {
  onLogoutClick: createAction(types.UI_AUTH_USERMENU_LOGOUT_CLICKED)
}

export const SearchActions = {
  onSearchClick: createAction(types.UI_SEARCH_BUTTON_CLICKED)
}

export const SearchBarActions = {
  onOutsideClick: createAction(types.UI_SEARCH_BAR_OUTSIDE_CLICKED),
  onChange: createAction(types.UI_SEARCH_BAR_CHANGED, {
    type: 'string'
  }),
  onSuggestSelect: createAction(types.UI_SEARCH_BAR_SUGGEST_SELECTED, {
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
}
