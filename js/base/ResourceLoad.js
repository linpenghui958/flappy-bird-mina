// 资源文件加载器，确保canvas在图片资源加载完成后进行渲染
import {Resource} from './Resource.js'
export class ResourceLoad{
  constructor() {
    this.map = new Map(Resource)
    for (let [key, value] of this.map) {
      const image = wx.createImage()
      image.src = value
      this.map.set(key, image)
    }
  }

  onload(callback) {
    let loadCount = 0
    for (let value of this.map.values()) {
      value.onload = () => {
        loadCount++
        if (loadCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

  static createLoader() {
    return new ResourceLoad()
  }
}