class Person {
  constructor(_name, _age, _email) {
    // Abstract
    if (this.constructor.name == 'Person')
      throw new Error('Can not take instance from Person');

    this.name = _name;
    this.age = _age;
    this.email = _email;
  }
}

export default Person;
