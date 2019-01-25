import { DataStore } from './base/DataStore.js'
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil } from './runtime/DownPencil.js';
export class Director{
  constructor() {
    this.dataStore = DataStore.getInstance()
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  createPencil() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerWidth / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdsEvent() {
    const Birds = this.dataStore.get('birds')
    console.log(Birds.y)
    for (let i = 0; i <= 2; i++) {
      Birds.y[i] = Birds.birdY[i]
    }
    Birds.time = 0
  }
  
  /**
   * @return \{{{boolean}}\} {{是否撞击}}{{}}
   * @param  birds边框模型
   * @param  pencil边框模型
   */
  isStrike(b, p) {
    let r = false
    if (b.top > p.bottom ||
      b.bottom < p.top ||
      b.right < p.left ||
      b.left > p.right
    ) {
        r = true;
    }  
    return !r
  }

  // 判断小鸟是否撞击地板
  check() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')
    if (birds.birdY[0] + birds.birdHeight[0] >= land.y){
      console.log('game over')
      this.isGameOver = true
    }

    const birdBorder = {
      top: birds.birdY[0],
      bottom: birds.birdY[0] + birds.birdHeight[0],
      left: birds.birdX[0],
      right: birds.birdX[0] + birds.birdWidth[0]
    }

    const length = pencils.length
    for (let i = 0; i < length; i++) {
      const p = pencils[i]
      const pencilBorder = {
        top: p.y,
        bottom: p.y + p.height,
        left: p.x,
        right: p.x + p.width
      }
      if (this.isStrike(birdBorder, pencilBorder)) {
        console.log('撞到水管啦');
        this.isGameOver = true
      }
    }
    // 加分逻辑
    if (birds.birdY[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false
      score.scoreNumber++
    }

  }

  run() {
    this.check()
    if (!this.isGameOver) {
      const backgroundSprite = this.dataStore.get('background')
      const landSprite = this.dataStore.get('land')
      const pencils = this.dataStore.get('pencils')
      const birds = this.dataStore.get('birds')
      const score = this.dataStore.get('score')
      backgroundSprite.draw()
      pencils.forEach((item) => {
        item.draw()
      })
      landSprite.draw()
  
  
      if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true
      }
  
      const HALF_WIDTH = (window.innerWidth - pencils[0].width) / 2
      if(pencils[0].x < HALF_WIDTH && pencils.length === 2) {
        this.createPencil()
      }
      birds.draw()
      score.draw()
  
      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    } else {
      console.log('GAME OVER')
      console.log(this.dataStore.get('startButton'))
      this.dataStore.get('startButton').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
    }
    
  }
}
