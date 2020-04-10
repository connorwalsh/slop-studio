import React, {Component} from 'react'
import {map, range} from 'lodash'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import {StateContext} from './StateContext'
import './Visualizer.css'


class Visualizer extends Component {
  static contextType = StateContext

  constructor(props) {
    super(props)
    this.analyzer = this.context.audioAnalyzer

    this.analyzer.fftSize = 512
    this.bufferLength = this.analyzer.frequencyBinCount
    this.dataArray = new Uint8Array(this.bufferLength)
  }
  
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
    this.camera.position.z = 3

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor( 0xffffff, 1)

    // setup effects composer
    this.composer = new EffectComposer(this.renderer)

    // add post-processing chain to effect composer
    var renderPass = new RenderPass( this.scene, this.camera );
    this.composer.addPass( renderPass );
    
    
    // add the 3js canvas to the DOM (using a React ref)
    this.container.appendChild( this.renderer.domElement );
  }
  
  addSceneObjects = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xf5428d } );
    this.cube = new THREE.Mesh( geometry, material );

    // add cube to scene
    this.scene.add( this.cube );

    this.createWaveFormObject();
    this.scene.add(this.splineObject)
  }

  createWaveFormObject = () => {
    this.curve = new THREE.SplineCurve(
      map(range(this.bufferLength), x => (new THREE.Vector2(x, 0)))
    )

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } )

    this.splineObject = new THREE.Line(geometry, material)
  }
  
  animate = () => {
    // get the fft data from the analyzer
    this.analyzer.getByteFrequencyData(this.dataArray)

    // render scene using effect composer (which wraps this.renderer)
    this.composer.render()

    // call this method everytime there is a request for a new frame by the window.
    // this is better than having a setInterval loop because it will pause the loop
    // whenever we are not in this current browser window/tab.
    this.requestID = window.requestAnimationFrame(this.animate);
  }

  render() {
    console.log(this.context.audioContext)

    return (
      <div className="Visualizer" ref={ref => (this.container = ref)}></div>
    )
  }
}

export default Visualizer
