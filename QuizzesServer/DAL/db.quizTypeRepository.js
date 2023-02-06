const { readFile } = require('../fs/fs');

class DBQuizTypesRepository {
  async getAllTypes() {
    const quizTypes = await readFile('./data/quizType.json');
    return quizTypes;
  }
}

module.exports = new DBQuizTypesRepository();
