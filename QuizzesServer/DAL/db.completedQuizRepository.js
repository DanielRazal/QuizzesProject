const { readFile, updateItem, removeItem, insertItem } = require('../fs/fs');
const formatDate = require('../date/dateFormatter');


class DBCompletedQuizzesRepository {
    async getAllCompletedQuizzes() {
        const item = await readFile('./data/completedQuiz.json');
        const students = await readFile('./data/student.json');
        const quizs = await readFile('./data/quiz.json');

        item.forEach((data) => {
            data.student = students.find((student) => student.id === data.studentId);
            data.quiz = quizs.find((quiz) => quiz.id === data.quizId);
            delete data.studentId;
            delete data.quizId;
        });

        return item;
    }

    async addCompletedQuiz(body) {
        const formattedDate = formatDate();
        const completedQuizToInsert = { doneDate: formattedDate, ...body };
        insertItem('./data/completedQuiz.json', completedQuizToInsert);
        return completedQuizToInsert;
    }

    async getCompletedQuizById(id) {
        const students = await readFile('./data/student.json');
        const data = await readFile('./data/completedQuiz.json');
        const quizs = await readFile('./data/quiz.json');
        const item = data.find(i => i.id === id);

        data.forEach((data) => {
            data.student = students.find((student) => student.id === data.studentId);
            data.quiz = quizs.find((quiz) => quiz.id === data.quizId);
            delete data.quizId;
            delete data.studentId;
        });
        return item;
    }

    async deleteCompletedQuiz(id) {
        const item = removeItem('./data/completedQuiz.json', id);
        return item;
    }

    async updateCompletedQuiz(id, body) {
        const formattedDate = formatDate();
        body.doneDate = formattedDate;
        const item = updateItem('./data/completedQuiz.json', id, body);
        return item;
    }

    async getCompletedQuizzesByStudentId(studentId) {
        const data = await readFile('./data/completedQuiz.json');
        const students = await readFile('./data/student.json');
        const quizs = await readFile('./data/quiz.json');
        const completedQuizzes = data.filter(i => i.studentId === studentId);

        data.forEach((data) => {
            data.student = students.find((student) => student.studentId === data.studentId);
            data.quiz = quizs.find((quiz) => quiz.id === data.quizId);
            delete data.quizId;
            delete data.studentId
        });

        return completedQuizzes;
    }
}

module.exports = new DBCompletedQuizzesRepository();
