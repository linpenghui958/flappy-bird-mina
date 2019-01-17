import { ResourceLoad } from './js/base/ResourceLoad.js'
import { Director } from './js/Director.js'
import { BackGround } from './js/runtime/BackGround.js'
import { DataStore } from './js/base/DataStore.js'
import { Land } from './js/runtime/Land.js'
export class Main{
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    const loader = ResourceLoad.createLoader()
    loader.onload(map => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded(map) {
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {
    this.dataStore
          .put('background', BackGround)
          .put('land', Land)
    new Director().run()
  }
}
