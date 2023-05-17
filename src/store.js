import { proxy } from 'valtio'

const state = proxy({
  pair: [],
  deck: [],
  count: 0,
  difficulty: 12,
})

export { state }
