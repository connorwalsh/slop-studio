import * as THREE from 'three';
import {Module} from '../Module'


class MasterOutputModule extends Module {
  constructor(audioctx) {
    super(audioctx)

    this.name = 'master'
    
    // create audio nodes
    this.nodes = {
      gain: audioctx.createGain(),
      destination: audioctx.destination,
    }

    // initialize map of controllable parameters
    this.parameters = {
      gain: this.nodes.gain.value
    }
    
    // initialize set of pluggable inputs
    this.inputs = [this.nodes.gain]
    
    // set the master output
    this.output = this.nodes.destination

    // connect internal components
    this.nodes.gain.connect(this.nodes.destination)
    
    // initialize objects which represent this module
    const geometry = new THREE.TorusGeometry(10,3,16,100);
    const material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xf5428d } );
    this.objects = {
      torus: new THREE.Mesh( geometry, material ),
    }
  }

  update() {
    // for now do nothing
    this.objects.torus.rotation.x += 0.07;
    this.objects.torus.rotation.y += 0.07;

  }
}

export default MasterOutputModule
