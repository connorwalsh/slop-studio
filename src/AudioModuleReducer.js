import {createModule} from './Modules/Factory'



export const createModuleReducer = (audioctx, moduleEvents) => (state, action) => {
  switch (action.type) {
  case 'MODULE_ADDED':
    
    // create module
    const module = createModule(audioctx, action.config)

    // broadcast to UI
    moduleEvents.next({
      type: 'MODULE_ADDED',
      module: module,
    })

    return {...state, [module.name]: module}; // TODO add to id->Module mapping
  case 'MODULE_REMOVED':
    return {};
  case 'MODULES_CONNECTED':
    // connect the input -> output modules (note, this is a side-effect)
    return state;
  case 'MODULES_DISCONNECTED':
    // disconnect the input -> output modules (note: this is a side-effect)
    return state;
  default:
    throw new Error('no such action for module reducer')
  }
}
