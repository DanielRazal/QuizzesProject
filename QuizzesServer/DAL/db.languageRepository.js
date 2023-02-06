const { readFile } = require('../fs/fs');

class DBLanguagesRepository {
  async getAllLanguages() {
    const language = await readFile('./data/language.json');
    return language;
  }
}

module.exports = new DBLanguagesRepository();
