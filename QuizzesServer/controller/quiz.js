const db = require("../DAL/db.quizRepository.js");

class QuizzesController {
    getAllQuizzes() {
    return db.getAllQuizzes();
  }

  getQuizById(id) {
    return db.getQuizById(id);
  }

  deleteQuiz(id) {
    return db.deleteQuiz(id);
  }

  updateQuiz(id, body) {
    return db.updateQuiz(id, body);
  }

  addQuiz(body) {
    return db.addQuiz(body);
  }
}

module.exports = new QuizzesController();
