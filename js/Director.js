import { DataStore } from './base/DataStore.js'
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

  run() {
    const backgroundSprite = this.dataStore.get('background')
    const landSprite = this.dataStore.get('land')
    backgroundSprite.draw()
    landSprite.draw()
    requestAnimationFrame(() => this.run())
  }
}
