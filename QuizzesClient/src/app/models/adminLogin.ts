import { Admin } from "./admin";

export class AdminLogin {
  admin!: Admin;
  token!: Token;
}

export class Token {
  token: string = "";
}
