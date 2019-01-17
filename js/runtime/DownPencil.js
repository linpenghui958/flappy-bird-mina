import { Pencil } from './Pencil.js'
import { Sprite } from '../base/Sprite.js'

export class DownPencil{
  constructor(top) {
    const image = Sprite.getImage('pencilDown')
    super(image, top)
  }

  draw() {
    this.y = this.top - this.height
    super.draw()
  }
}
