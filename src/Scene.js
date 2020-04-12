import React, {Component} from 'react'
import {get} from 'lodash'
import {WEBGL} from './CheckWebGL'
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';


class Scene extends Component {
  constructor(props) {
    super(props)

    // the only state we want to keep track of (which triggers a re-render) will
    // be if the Three.js scene objects have been created successfully and the child
    // scene controller component is ready to be rendered.
    //
    // 'ready' means that all the three.js objects (scene, camera, renderer, etc.) are
    // defined and will be available once the child component (scene controller) is rendered.
    this.state = {ready: false}

    // setup initial configuration
    this.config = {
      camera: {
        fov: get(this.props, `config.camera.fov`, 75),
        nearPlane: get(this.props, `config.camera.nearPlane`, 0.1),
        farPlane: get(this.props, `config.camera.farPlane`, 1000),
        position: {
          x: get(this.props, `config.camera.position.x`, 0),
          y: get(this.props, `config.camera.position.y`, 0),
          z: get(this.props, `config.camera.position.z`, 50),
        }
      }
    }

    // objects is a map of objects which are registered with the scene via addObject
    // these objects all must implement the update() method which is run on each animation frame.
    // the map is keyed by the objects id.
    this.modules = {}
  }
  
  componentDidMount() {
    this.setupScene()
    this.animate()

    // make responsive on window resize
    window.addEventListener('resize', this.handleWindowResize)

    this.setState({ready: true})
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
      this.config.camera.fov,       // field of view (fov)
      width / height,               // aspect ration
      this.config.camera.nearPlane, // near plane
      this.config.camera.farPlane   // far plane
    )

    // set the distance of the camera
    this.camera.position.x = this.config.camera.position.x
    this.camera.position.y = this.config.camera.position.y
    this.camera.position.z = this.config.camera.position.z

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
  
  animate = () => {

    Object.values(this.modules).forEach(module => module.update())
    
    // render scene using effect composer (which wraps this.renderer)
    this.composer.render()

    // call this method everytime there is a request for a new frame by the window.
    // this is better than having a setInterval loop because it will pause the loop
    // whenever we are not in this current browser window/tab.
    this.requestID = window.requestAnimationFrame(this.animate);
  }

  addModule = module => {
    this.modules[module.name] = module
    module.addObjects(this.scene)
  }
  
  render() {
    
    const ctx = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      composer: this.composer,
      addModule: this.addModule,
    }

    // get the controller for this scene (a React component passed in as a prop)
    const Controller = this.props.controller

    // get Scene component to render, or WebGL error
    const scene = WEBGL.isWebGLAvailable() ?
          (
            <div className={this.props.className} ref={ ref => (this.container = ref) }>
              {this.state.ready ? <Controller ctx={ctx}/> : null}
            </div>
          )
          : (
            <div>
              "Oops, WebGL isn't available in your broswer :("
            </div>
          )
    
    return scene
  }
}

export default Scene
