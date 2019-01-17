class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log('parent say')
  }
}

class Cat extends Animal{
  constructor(name, age) {
    super()
  }

  say() {
    console.log('child say')
  }

  fn1 () {
    super.say()
  }
}

var cat = new Cat()
cat.say()
cat.fn1()
