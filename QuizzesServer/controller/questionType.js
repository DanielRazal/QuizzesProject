const db = require("../DAL/db.questionTypeRepository.js");

class QuestionTypesController {
    getAllTypes() {
    return db.getAllTypes();
  }
}

module.exports = new QuestionTypesController();
