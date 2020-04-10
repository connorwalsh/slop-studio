import React from 'react'
import {useAudioNodesContext} from './AudioNodesContextProvider'
import './Workbench.css'


// see this https://codeburst.io/react-16-three-js-integration-tips-2019-b6afe19c0b83
// tutorial for details on code structure for integrating three.js with React.

const Workbench = ({ bundle }) => {
  const audio = useAudioNodesContext()
  
  console.log(bundle)
  console.log(audio)
  return (<div>ALALAL</div>) // TODO return null because we actually don't want to re-render anything here.
}

export default Workbench
