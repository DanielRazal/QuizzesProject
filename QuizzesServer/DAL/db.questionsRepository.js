const { readFile, updateItem, removeItem, insertItem, saveFile } = require('../fs/fs');
const { v4 } = require('uuid');
const formatDate = require('../date/dateFormatter');

class DBQuestionsRepository {

  async getAllQuestions() {
    const questions = await readFile('./data/question.json');
    const types = await readFile('./data/questionType.json');

    questions.forEach((data) => {
      data.type = types.find((type) => type.id === data.typeId);
      delete data.typeId;
    });
    return questions;
  }

  async addQuestion(question) {

    const formattedDate = formatDate();

    question.answers = question.answers.map(answer => {
      return { id: v4(), ...answer };
    });
    const questionToInsert = {
      id: v4(), lastUpdate: formattedDate, ...question
    };
    const item = insertItem('./data/question.json', questionToInsert);
    return item;
  }

  async updateQuestion(id, question) {
    const formattedDate = formatDate();
    if (question.answers) {
      for (let i = 0; i < question.answers.length; i++) {
        question.answers[i].id = v4();
      }
    }
    const questionToInsert = { ...question, lastUpdate: formattedDate };
    const item = updateItem('./data/question.json', id, questionToInsert);
    return item;
  }

  async getQuestionById(id) {
    const questions = await readFile('./data/question.json');
    const types = await readFile('./data/questionType.json');
    const item = questions.find(i => i.id === id);

    questions.forEach((data) => {
      data.type = types.find((type) => type.id === data.typeId);
      delete data.typeId;
    });
    return item;
  }

  async deleteQuestion(id) {
    const quizzes = await readFile('./data/quiz.json');

    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.questions.length === 1 && quiz.questions[0].id === id) {
        throw new Error("Can't delete the last question of the quiz")
      }
      quiz.questions = quiz.questions.filter((question) => question.id !== id);
      quiz.questionsId = quiz.questionsId.filter(qId => qId !== id);
      return quiz;
    });

    saveFile('./data/quiz.json', updatedQuizzes);

    const item = removeItem('./data/question.json', id);
    return { item: item, updatedQuizzes: updatedQuizzes };
  }
}

module.exports = new DBQuestionsRepository();
