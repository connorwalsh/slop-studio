import {map} from 'lodash'


/**
 * a Module is a sound module, or audio node, which can be added to an
 * audio graph.
 *
 * a Module has two primary types of sub-components:
 * (1) a collection of WebAudio API AudioNodes
 * (2) a collection of three.js objects which graphically represent the audio node.
 */
export class Module {
  constructor(audioctx) {
    this.audioctx   = audioctx  // the global WebAudio API Context
    this.objects    = {}        // an id -> three.js object map
    this.nodes      = {}        // an id -> AudioNode map
    this.parameters = {}        // a name -> AudioParam map
    this.inputs     = []        // a list of AudioNodes
    this.output     = null      // the final output of this Module, AudioNode
  }

  /**
   * Adds all the three.js objects to the scene
   *
   * @param {!THREE.Scene} scene the three.js scene we wish to add our objects to.
   */
  addObjects(scene) {
    map(this.objects, (object, _) => scene.add(object))
  }

  /**
   * Removes all the three.js objects from the scene
   */
  removeObjects(scene) {
    // TODO how do we do this?
  }

  /**
   * Updates all three.js objects on each frame. this is called from within
   * the three.js animation loop on each render.
   *
   * All derived classes must provide their own implementation.
   */
  update() {
    throw new Error(`You must provide an implementation for this Module's update method`)
  }
}
