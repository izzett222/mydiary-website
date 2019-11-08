export const users = [];
export class User {
  constructor(firstName, lastName, email, password) {
    this.user_id = 1;
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = email.trim();
    this.password = password.trim();
  }
}
