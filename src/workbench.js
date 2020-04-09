import React, {Component} from 'react'
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import './workbench.css'

// see this https://codeburst.io/react-16-three-js-integration-tips-2019-b6afe19c0b83
// tutorial for details on code structure for integrating three.js with React.

class Workbench extends Component {

  componentDidMount() {
    this.setupScene()
    this.addSceneObjects()
    this.animate()

    // make responsive on window resize
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    // remove all stuff attached to the window object when this component unmounts
    // this will avoid memory leaks.

    window.removeEventListener('resize', this.handleWindowResize)
    window.cancelAnimationFrame(this.requestID)
  }
  
  handleWindowResize = () => {
    // whenever the window resizes, we want to re-render so that our app
    // is responsive.
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.renderer.setSize( width, height );
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
  
  setupScene = () => {
    // get the dimensions of the container!
    const width  = this.container.clientWidth
    const height = this.container.clientHeight

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,             // field of view (fov)
      width / height, // aspect ration
      0.1,            // near plane
      1000            // far plane
    )

    // set the distance of the camera
    this.camera.position.z = 50

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor( 0xffffff, 1)

    // setup effects composer
    this.composer = new EffectComposer(this.renderer)

    // add post-processing chain to effect composer
    var renderPass = new RenderPass( this.scene, this.camera );
    this.composer.addPass( renderPass );
    
    // var glitchPass = new GlitchPass();
    // this.composer.addPass( glitchPass );
    
    // add the 3js canvas to the DOM (using a React ref)
    this.container.appendChild( this.renderer.domElement );
  }
  
  addSceneObjects = () => {
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var geometry = new THREE.TorusGeometry(10,3,16,100);
    var material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xf5428d } );
    this.cube = new THREE.Mesh( geometry, material );

    // add cube to scene
    this.scene.add( this.cube );
  }
  
  animate = () => {
    // update all objects in scene
    this.cube.rotation.x += 0.07;
    this.cube.rotation.y += 0.07;

    // render scene using effect composer (which wraps this.renderer)
    this.composer.render()

    // call this method everytime there is a request for a new frame by the window.
    // this is better than having a setInterval loop because it will pause the loop
    // whenever we are not in this current browser window/tab.
    this.requestID = window.requestAnimationFrame(this.animate);
  }
  
  render() {
    return (
      <div className="workbench" ref={ref => (this.container = ref)}></div>
    ) 
  }
}


export default Workbench
