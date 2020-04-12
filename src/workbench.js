import {useEffect} from 'react'
import {useAudioNodesContext} from './AudioNodesContextProvider'
import './Workbench.css'


// see this https://codeburst.io/react-16-three-js-integration-tips-2019-b6afe19c0b83
// tutorial for details on code structure for integrating three.js with React.

const Workbench = ({ ctx }) => {
  const audio = useAudioNodesContext()

  useEffect(() => {
    audio.moduleEvents.subscribe(event => {
      switch (event.type) {
      case 'MODULE_ADDED':
        ctx.addModule(event.module)
        break
      default:
        throw new Error('no such event type')
      }
    })

    return () => audio.moduleEvents.unsubscribe()
  }, [])
  

  return null
}

export default Workbench
