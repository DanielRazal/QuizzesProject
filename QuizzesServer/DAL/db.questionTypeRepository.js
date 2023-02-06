const { readFile } = require('../fs/fs');

class DBQuestionTypesRepository {
  async getAllTypes() {
    const questionTypes = await readFile('./data/questionType.json');
    return questionTypes;
  }
}

module.exports = new DBQuestionTypesRepository();
