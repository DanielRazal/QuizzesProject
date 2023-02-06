const db = require("../DAL/db.studentRepository.js");

class StudentsController {
    getAllStudents() {
    return db.getAllStudents();
  }

  getStudentById(id) {
    return db.getStudentById(id);
  }

  studentLogin(email, fullName) {
    return db.studentLogin(email, fullName);
  }
}

module.exports = new StudentsController();
