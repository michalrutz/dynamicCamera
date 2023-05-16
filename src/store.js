import { proxy } from 'valtio'

const state = proxy({
  pair: [],
  deck: []
})

export { state }
