import * as THREE from 'three';
import {Module} from '../Module'


export class OscillatorModule extends Module {
  constructor(audioctx) {
    super(audioctx)

    this.name = "OSCILLATOR"
    
    // const oscillator = context.createOscillator()
    // oscillator.type = 'square'
    // oscillator.frequency.setValueAtTime(440, context.currentTime); // value in hertz

    
    // create audio nodes
    this.nodes = {
      gain: audioctx.createGain(),
      oscillator: audioctx.createOscillator(),
    }

    // initialize map of controllable parameters
    this.parameters = {
      gain: this.nodes.gain.value,
      frequency: this.nodes.oscillator.frequency
    }

    // initialize properties
    this.properties = {
      waveform: this.nodes.oscillator.type
    }
    
    // initialize set of pluggable inputs
    this.inputs = [this.nodes.oscilator]
    
    // set the output
    this.output = this.nodes.gain

    // initialize all parameters and properties
    this.parameters.gain = 0.1
    this.parameters.frequency.setValueAtTime(440, audioctx.currentTime); //value in hertz
    this.nodes.oscillator.type = 'square' // TODO need to channge this in a function...
    
    // connect all internal components
    this.nodes.oscillator.connect(this.nodes.gain)

    // initialize objects which represent this module
    const geometry = new THREE.TorusGeometry(10,3,16,100);
    const material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0x28a649 } );
    this.objects = {
      torus: new THREE.Mesh( geometry, material ),
    }
  }

  update() {
    // for now do nothing
    this.objects.torus.rotation.x += 0.04;
    this.objects.torus.rotation.y += 0.04;

  }
}

export default OscillatorModule
