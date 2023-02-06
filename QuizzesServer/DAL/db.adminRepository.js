const { readFile } = require('../fs/fs');
const jwtToken = require('../jwt/token');


class DBAdminLoginRepository {
  async adminLogin(email, password) {
    const users = await readFile('./data/admin.json');
    const companies = await readFile('./data/company.json');
    const fields = await readFile('./data/field.json');
    const admin = users.find(u => u.email === email && u.password === password);
    if (!admin) {
      return;
    }
    users.forEach((user) => {
      user.company = companies.find((company) => company.id === user.companyId);
      user.field = fields.find((field) => field.id === user.fieldId);
      delete user.companyId;
      delete user.fieldId;
    });
    const token = jwtToken(admin, companies, fields);
    return { admin, token };
  }


  async getUserById(id) {
    const data = await readFile('./data/admin.json');
    const companies = await readFile('./data/company.json');
    const fields = await readFile('./data/field.json');
    const item = data.find(i => i.id === id);
    data.forEach((user) => {
      user.company = companies.find((company) => company.id === user.companyId);
      user.field = fields.find((field) => field.id === user.fieldId);
      delete user.companyId;
      delete user.fieldId;
    });
    return item;
  }

  async getAllUsers() {
    const users = await readFile('./data/admin.json');
    const companies = await readFile('./data/company.json');
    const fields = await readFile('./data/field.json');
    users.forEach((user) => {
      user.company = companies.find((company) => company.id === user.companyId);
      user.field = fields.find((field) => field.id === user.fieldId);
      delete user.companyId;
      delete user.fieldId;
    });
    return users;
  }
}

module.exports = new DBAdminLoginRepository();
