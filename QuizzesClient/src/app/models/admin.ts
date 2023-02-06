import { Company } from "./company";
import { Field } from "./field";

export class Admin {
  id: string = "";
  email: string = "";
  password: string = "";
  company!: Company;
  field!: Field;
}

