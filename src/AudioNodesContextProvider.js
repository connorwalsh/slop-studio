import React, {useState, createContext, useContext} from 'react'
import {useWebAudioContext} from './WebAudioContextProvider'


// react context for AudioNodes state
export const AudioNodesContext = createContext()


// TODO maybe rename this to useAudioGraph....? or useAudioEngine
// helper wrapper for using the AudioNodesContext
export const useAudioNodesContext = () => {
  const context = useContext(AudioNodesContext)
  if (context === undefined) {
    throw new Error(`useAudioNodesContext must be called within AudioNodesConntextProvider!`)
  }

  return context
}

// TODO maybe rename this provider to AudioEngine?? since it will be maintaining and manipulating
// the state of the Audio Nodes
const AudioNodesContextProvider = props => {
  const [context] = useState(useWebAudioContext())
  const [analyzer] = useState(context.createAnalyser())

  // get the WebAudio API Context.
  // this means this provider must be nested within the WebAudioContextProvider.
  // setContext(useWebAudioContext())

  // initailize audio graph

  // setup reducers to maintain state

  // just quick.....TODO revise this.
  // setup analyzer
  // const analyzer = context.createAnalyser()
  analyzer.connect(context.destination) // hook up analyzer to destination

  
  return (
    <AudioNodesContext.Provider value={{context, analyzer}}>
      {props.children}
    </AudioNodesContext.Provider>
  )
}

export default AudioNodesContextProvider
