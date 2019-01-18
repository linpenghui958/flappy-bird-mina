import { DataStore } from './base/DataStore.js'
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil } from './runtime/DownPencil.js';
export class Director{
  constructor() {
    console.log('init Director')
    this.dataStore = DataStore.getInstance()
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  createPencil() {
    const minTop = DataStore.getInstance().canvas.height / 8
    const maxTop = DataStore.getInstance().canvas.width / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  run() {
    const backgroundSprite = this.dataStore.get('background')
    const landSprite = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    backgroundSprite.draw()
    pencils.forEach((item) => {
      item.draw()
    })
    landSprite.draw()


    if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
      pencils.shift()
      pencils.shift()
    }

    const HALF_WIDTH = (DataStore.getInstance().canvas.width - pencils[0].width) / 2
    if(pencils[0].x < HALF_WIDTH && pencils.length === 2) {
      this.createPencil()
    }

    let timer = requestAnimationFrame(() => this.run())
    this.dataStore.put('timer', timer)
    // cancelAnimationFrame(this.dataStore.get('timer'))
  }
}
