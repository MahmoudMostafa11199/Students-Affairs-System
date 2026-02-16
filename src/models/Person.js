export default class Person {
  constructor(_id, _name, _email) {
    // Abstract
    if (this.constructor.name == 'Person')
      throw new Error('Can not take instance from Person');

    this.id = _id;
    this.name = _name;
    this.email = _email;
  }
}
