const db = require("../DAL/db.languageRepository.js");

class LanguagesController {
    getAllLanguages() {
    return db.getAllLanguages();
  }
}

module.exports = new LanguagesController();
