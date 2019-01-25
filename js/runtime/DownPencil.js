import { Pencil } from './Pencil.js'
import { Sprite } from '../base/Sprite.js'
import { DataStore } from '../base/DataStore.js'
 
export class DownPencil extends Pencil{
  constructor(top) {
    const image = Sprite.getImage('pencilDown')
    super(image, top)
  }

  draw() {
    let gap = window.innerHeight / 5;
    this.y = this.top + gap;
    super.draw()
  }
}
