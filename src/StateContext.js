import React from 'react';

export const defaultState = {
  audio: {
    context: null,
    analyzer: null,
  }
}

export const StateContext = React.createContext(defaultState)
StateContext.displayName = 'State'
