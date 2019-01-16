import { ResourceLoad } from './js/base/ResourceLoad.js'
import { Director } from './js/Director.js'
import { BackGround } from './js/runtime/BackGround.js'
export class Main{
  constructor() {
    this.canvas = document.querySelector('#game')
    this.ctx = this.canvas.getContext('2d')

    const loader = ResourceLoad.createLoader()
    loader.onload(map => this.loadedFirst(map))
  }

  loadedFirst(map) {
    let background = new BackGround(this.ctx, map.get('background'))
    background.draw()
  }
}
