const { readFile, updateItem, removeItem, insertItem } = require('../fs/fs');
const { v4 } = require('uuid');
const formatDate = require('../date/dateFormatter');


class DBQuizzesRepository {

    async getAllQuizzes() {
        const quizzes = await readFile('./data/quiz.json');
        const languages = await readFile('./data/language.json');
        const types = await readFile('./data/quizType.json');
        quizzes.forEach((quiz) => {
            if (typeof quiz.languageId === "string") {
                quiz.language = languages.find((language) => language.id === quiz.languageId);
            }
            if (typeof quiz.typeId === "string") {
                quiz.type = types.find((type) => type.id === quiz.typeId);
            }
            delete quiz.languageId;
            delete quiz.typeId;
        });
        return quizzes;
    }

    async addQuiz(quiz) {
        const formattedDate = formatDate();
        const quizId = v4();
        const questionsId = quiz.questions.map(question => question.id);

        const quizToInsert = {
            id: quizId, lastUpdate: formattedDate, ...quiz, isActive: false, questionsId
        };
        insertItem('./data/quiz.json', quizToInsert);
        return quizToInsert;
    }

    async updateQuiz(id, body) {
        const formattedDate = formatDate();
        const quizToUpdate = {
            ...body, lastUpdate: formattedDate,
            questionsId: body.questions.map(question => question.id)
        };
        const updatedQuiz = updateItem('./data/quiz.json', id, quizToUpdate);
        return updatedQuiz;
      }
      

    async getQuizById(id) {
        const quizzes = await readFile('./data/quiz.json');
        const types = await readFile('./data/quizType.json');
        const languages = await readFile('./data/language.json');
        const item = quizzes.find(i => i.id === id);


        quizzes.forEach((data) => {
            if (data.typeId === "2" || (data.type && data.type.id === "2")) {
                data.questions.sort(() => Math.random() - 0.5);
            }
        });


        quizzes.forEach((quiz) => {
            if (typeof quiz.languageId === "string") {
                quiz.language = languages.find((language) => language.id === quiz.languageId);
            }
            if (typeof quiz.typeId === "string") {
                quiz.type = types.find((type) => type.id === quiz.typeId);
            }
            delete quiz.languageId;
            delete quiz.typeId;
        });

        return item;
    }

    async deleteQuiz(id) {
        const item = removeItem('./data/quiz.json', id);
        return item;
    }
}

module.exports = new DBQuizzesRepository();
