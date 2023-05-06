export function User(id, name, lastName) {
  this.id = id;
  this.name = name;
  this.lastName = lastName;
};

User.prototype.getFullName = function () {
  return `${this.name} ${this.lastName}`;
};

export function Admin(id, name, lastName) {
  User.call(this, id, name, lastName); // наследование от предка

  this.isAdmin = true;
};

Admin.prototype = Object.create(User.prototype);// наследование свойств и методов от предка
Admin.prototype.constructor = Admin;

Admin.prototype.getAdminData = function () {
  return `${this.name} ${this.lastName} is admin`;
}