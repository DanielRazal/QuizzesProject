const db = require("../DAL/db.quizTypeRepository.js");

class QuizTypesController {
    getAllTypes() {
    return db.getAllTypes();
  }
}

module.exports = new QuizTypesController();
