import MasterOutputModule from  './MasterOutput'
import {OscillatorModule} from './Oscillator'


export const createModule = (audioctx, config) => {
  switch (config.type) {
  case 'master':
    return new MasterOutputModule(audioctx)
  case 'oscillator':
    return new OscillatorModule(audioctx)
  default:
    throw new Error(`no such module ${config.type}`)
  }
}
