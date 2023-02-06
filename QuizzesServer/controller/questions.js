const db = require("../DAL/db.questionsRepository.js");

class QuestionsController {
  getAllQuestions() {
    return db.getAllQuestions();
  }

  getQuestionById(id) {
    return db.getQuestionById(id);
  }

  deleteQuestion(id) {
    return db.deleteQuestion(id);
  }

  updateQuestion(id, body) {
    return db.updateQuestion(id, body);
  }

  addQuestion(body) {
    return db.addQuestion(body);
  }
}

module.exports = new QuestionsController();
