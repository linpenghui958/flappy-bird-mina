(function () {
  'use strict'
  var Animal = function (name, age) {
    this.name = name
    this.age = age
  }

  Animal.prototype.say = function () {
    console.log('i am animal')
  }

  var Cat = function () {
    Animal.call(this)
  }
  
  Cat.prototype.miao = function () {
    console.log('miao')
  }
  // Cat.prototype = new Animal()
  // Cat.prototype = Object.create(new Animal())

  var buoumao = new Cat()
  buoumao.say()
  buoumao.miao()

  class Cat{
    constructor() {
      super(this)
    }
  }
})()