export class Director{
  constructor() {
    console.log('init Director')
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
}
