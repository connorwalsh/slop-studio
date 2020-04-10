import React from 'react';
import {WEBGL} from './CheckWebGL'
import './App.css';
import WebAudioContextProvider from './WebAudioContextProvider'
import AudioNodesContextProvider from './AudioNodesContextProvider'
import AudioEngine from './AudioEngine'

// import {StateContext, defaultState} from './StateContext'
// import Workbench from './workbench'
// import Visualizer from './Visualizer'


const App = () => {
  return (
    <div className="App">
      <WebAudioContextProvider>
        <AudioNodesContextProvider>
          <AudioEngine/>
        </AudioNodesContextProvider>
      </WebAudioContextProvider>
    </div>
  )
}







// class App extends Component {
//   constructor(props) {
//     super(props)

//     // initialize audio context
//     this.setupAudioContext()
    
//     this.state = {
//       audio: {
//         context: this.audioContext,
//         analyzer: this.audioContext.createAnalyzer(),
//       }
//     }
//   }

//   setupAudioContext = () => {
//     // handle legacy browsers
//     const AudioContext = window.AudioContext || window.webkitAudioContext

//     // initialize audio context
//     this.audioContext = new AudioContext()
//   }

  
//   render() {
//     return (
//       <div className="App">
//         <StateContext.Provider value={this.state}>
//           <AudioEngine/>
//           <div>header</div>
//           <Visualizer/>
//           <Workbench/>
//           <div>
//             {
//               WEBGL.isWebGLAvailable() ? "all good" : "Oops, webGL isn't available in your browser."
//             }
//           </div>
//         </StateContext.Provider>
//       </div>
//     ) 
//   }
// }

export default App;
