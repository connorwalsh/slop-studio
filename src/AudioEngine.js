import {useAudioNodesContext} from './AudioNodesContextProvider'


const AudioEngine = props => {
  const nodes = useAudioNodesContext()
  
  return null
}


// class AudioEngine extends Component {
//   static contextType = StateContext

//   componentWillMount() {
//     this.setupAudioContext()
//     this.setupAudioGraph()
//   }

//   componentWillUnmount() {
//     // close the context when we unmount
//     this.ctx.close()
//   }

//   setupAudioContext = () => {
//     // handle legacy browsers
//     const AudioContext = window.AudioContext || window.webkitAudioContext

//     // initialize audio context
//     this.ctx = new AudioContext()

//     // set the context for the rest of the app to use in the StateContext
//     this.context.setAudioContext(this.ctx)
//   }

//   setupAudioGraph = () => {
//     this.oscillator = this.ctx.createOscillator()

//     this.oscillator.type = 'square'
//     this.oscillator.frequency.setValueAtTime(440, this.ctx.currentTime); // value in hertz

//     this.masterGain = this.ctx.createGain()
//     this.masterGain.gain.value = 0.1

//     // setup audio analyzer
//     this.analyzer = this.ctx.createAnalyser()
//     // set the context for the rest of the app to use in the StateContext
//     this.context.setAudioAnalyzer(this.analyzer)
    
//     this.oscillator.connect(this.masterGain);
//     this.masterGain.connect(this.analyzer);
//     this.analyzer.connect(this.ctx.destination);
//     // this.oscillator.start();
//   }
  
//   render() {
//     return null
//   }
// }

export default AudioEngine
