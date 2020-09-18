import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor'
import ChartMonitor from 'redux-devtools-chart-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import { omit } from 'ramda'

const log = false
const black = false
const defaultIsVisible = false
const select = omit(['routing'])

const chartOptions = {
  text: {
    colors: {
      hover: black ? 'white' : 'black'
    }
  }
}
const tooltipOptions = {
  style: {
    'font-size': '0.7em',
    'min-width': '80%'
  }
}

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-shift-h"
    changePositionKey="ctrl-shift-l"
    defaultPosition="left"
    defaultIsVisible={defaultIsVisible}
  >
    {log && (
      <LogMonitor
        select={select}
      />
    ) || (
      <ChartMonitor
        tooltipOptions={tooltipOptions}
        style={chartOptions}
        select={select}
        widthBetweenNodesCoeff={0.5}
      />
    )}
  </DockMonitor>
)
