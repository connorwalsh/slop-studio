import React from 'react'
import {useAudioNodesContext} from './AudioNodesContextProvider'
import './Toolbar.css'


const Toolbar = props => {
  const audio = useAudioNodesContext()
  
  return (
    <div className="Toolbar">
      TOOLBAR
      <button onClick={() => { audio.dispatch( { type: 'MODULE_ADDED', config: { type: 'oscillator'} } )}}>
        add module
      </button>
    </div>
  )
}

export default Toolbar
