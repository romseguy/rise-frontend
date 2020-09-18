import { createSelector } from 'reselect'

// Input-selectors
const uiSelector = state => state.map.ui
export const mapSelector = state => uiSelector(state).map
export const markerSelector = (state, hash) => uiSelector(state).markerStreamMap[hash]
export const markersLayerSelector = state => uiSelector(state).markersLayer
