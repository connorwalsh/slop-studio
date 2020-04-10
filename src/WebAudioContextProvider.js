import React, {useState, useEffect, createContext, useContext} from 'react'


// react context for WebAudio API context
export const WebAudioContext = createContext()


// helper wrapper for using the WebAudioContext
export const useWebAudioContext = () => {
  const context = useContext(WebAudioContext)
  if (context === undefined) {
    throw new Error(`useWebAudioContext must be called within WebAudioContextProvider!`)
  }

  return context
}


const WebAudioContextProvider = props => {
  // maintain local state of WebAudio context availability and WebAudio Context object
  const [isAvailable, setAvailability] = useState(false)
  const [context, setContext] = useState(null)

  // initialize/destruct the WebAudio API Context on mount/unmount
  useEffect(() => {
    // handle legacy browsers
    const AudioContext = window.AudioContext || window.webkitAudioContext

    // initialize audio context
    const ctx = new AudioContext()

    // set the new WebAudio Context and its availability in our state
    setContext(ctx)
    setAvailability(true)

    // return function for cleaning up when component unmounts
    return () => {
      // close the WebAudio Context if it exists
      if (context !== null) context.close()
    }
  }, [])

  // return the provider for the WebAudioContext
  // only render the provider and children once the WebAudio API Context is available.
  return isAvailable ?
        (
          <WebAudioContext.Provider value={context}>
            {props.children}
          </WebAudioContext.Provider>     
        ) :
        (<div className="blah">WebAudio API Context is Initializing...</div>)
}

export default WebAudioContextProvider
