import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'

export class Birds extends Sprite{
  constructor() {
    const image = Sprite.getImage('birds')
    super(image,
      0,0,
      image.width, image.height,
      0,0,
      image.width, image.height,
      )
    //小鸟的三种状态需要一个数组去存储
    //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
    this.clippingX = [
      9,
      9 + 34 + 18,
      9 + 34 + 18 + 34 + 18
    ];
    this.clippingY = [10, 10, 10]
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]
    const birdX = window.innerWidth / 4
    this.birdX = [birdX, birdX, birdX]
    const birdY = window.innerHeight / 2
    this.birdY = [birdY, birdY, birdY]
    const birdWidth = 34
    const birdHeight = 24
    this.birdWidth = [birdWidth, birdWidth, birdWidth]
    this.birdHeight = [birdHeight, birdHeight, birdHeight]
    this.y = [birdY, birdY, birdY]
    this.index = 0
    this.count = 0
    this.time = 0
  }

  draw() {
    const speed = 0.2
    // this.count = this.count + speed
    // if (this.index >= 2) {
    //   this.count = 0
    // }
    // this.index = Math.floor(this.count)
    this.index = Math.floor((this.count += speed) % 3)

    const g = 0.98 / 2.4
    const offsetUp = 40
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2;

    for (let i = 0; i <= 2; i++) {
      this.birdY[i] = this.y[i] + offsetY
    }
    this.time++

    super.draw(
      this.img,
      this.clippingX[this.index], this.clippingY[this.index],
      this.clippingWidth[this.index], this.clippingHeight[this.index],
      this.birdX[this.index], this.birdY[this.index], 
      this.birdWidth[this.index], this.birdHeight[this.index],
    )

  }
}