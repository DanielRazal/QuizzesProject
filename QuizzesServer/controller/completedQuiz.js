const db = require("../DAL/db.completedQuizRepository.js");

class CompletedQuizzesController {
    getAllCompletedQuizzes() {
    return db.getAllCompletedQuizzes();
  }

  getCompletedQuizById(id) {
    return db.getCompletedQuizById(id);
  }

  deleteCompletedQuiz(id) {
    return db.deleteCompletedQuiz(id);
  }

  updateCompletedQuiz(id, body) {
    return db.updateCompletedQuiz(id, body);
  }

  addCompletedQuiz(body) {
    return db.addCompletedQuiz(body);
  }

  getCompletedQuizzesByStudentId(studentId) {
    return db.getCompletedQuizzesByStudentId(studentId);
  }
}

module.exports = new CompletedQuizzesController();
