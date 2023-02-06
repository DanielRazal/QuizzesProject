const { readFile } = require('../fs/fs');

class DBStudentsRepository {
  async getAllStudents() {
    const users = await readFile('./data/student.json');
    return users;
  }

  async getStudentById(id) {
    const users = await readFile('./data/student.json');
    const user = users.find(i => i.id === id);
    return user;
  }

  async studentLogin(email, fullName) {
    const users = await readFile('./data/student.json');
    const user = users.find(u => u.email === email && u.fullName === fullName);
    return user;
  }
}

module.exports = new DBStudentsRepository();
