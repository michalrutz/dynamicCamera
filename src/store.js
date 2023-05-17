import { proxy } from 'valtio'

const state = proxy({
  pair: [],
  deck: [],
  difficulty: 12,
})

export { state }
