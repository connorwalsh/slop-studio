import React, {useState, useEffect, createContext, useContext} from 'react'
import {Subject, BehaviorSubject} from 'rxjs'
import {useWebAudioContext} from './WebAudioContextProvider'
import {createModuleReducer} from './AudioModuleReducer'



// react context for AudioNodes state
export const AudioNodesContext = createContext()


// TODO maybe rename this to useAudioGraph....? or useAudioEngine
// helper wrapper for using the AudioNodesContext
export const useAudioNodesContext = () => {
  const context = useContext(AudioNodesContext)
  if (context === undefined) {
    throw new Error(`useAudioNodesContext must be called within AudioNodesContextProvider!`)
  }

  return context
}

// TODO maybe rename this provider to AudioEngine?? since it will be maintaining and manipulating
// the state of the Audio Nodes
const AudioNodesContextProvider = props => {
  const [context] = useState(useWebAudioContext())
  const [analyzer] = useState(context.createAnalyser())
  const [moduleEvents] = useState(new BehaviorSubject(null))
  const [modules, updateModules] = useState({})
  
  const [actions] = useState(new Subject())

  useEffect(() => {
    const moduleReducer = createModuleReducer(context, moduleEvents)
    const subscription = actions.subscribe(action => {
      updateModules(moduleReducer(modules, action))
    })
    return () => subscription.unsubscribe()
  }, [actions, modules, context, moduleEvents])

  useEffect(() => {
    actions.next({
      type: 'MODULE_ADDED',
      config: { type: 'master'},      
    })
  }, [actions])

  // dispatch wrapper to send actions over the wire
  // TODO eventually use Websocket connection from a provider!
  const dispatch = action => {
    // TODO send message over the wire
    // ws.emit(action)

    // add action to action observable stream
    actions.next(action)
  }


  // oscillator.start()
  
  return (
    <AudioNodesContext.Provider value={{context, analyzer, modules, dispatch, moduleEvents}}>
      {props.children}
    </AudioNodesContext.Provider>
  )
}

export default AudioNodesContextProvider
