export const serverEnvironment = {
  production: false,
  baseUrl: 'http://localhost:4000/',
};

export const adminLoginEnvironment = {
  production: false,
  api: 'api/Admin',
  routeLogin: '/login'
};

export const studentEnvironment = {
  production: false,
  api: 'api/Students',
  routeLogin: '/login'
};

export const quizEnvironment = {
  production: false,
  api: 'api/Quizzes',
};

export const questionEnvironment = {
  production: false,
  api: 'api/Questions',
  routeAddQuestion: '/addQuestion'
};

export const questionTypeEnvironment = {
  production: false,
  api: 'api/QuestionType',
};

export const languageEnvironment = {
  production: false,
  api: 'api/Languages',
};

export const quizTypeEnvironment = {
  production: false,
  api: 'api/QuizType',
};

export const answerEnvironment = {
  production: false,
  api: 'api/Answers',
};

export const completedQuizEnvironment = {
  production: false,
  api: 'api/CompletedQuizzes',
};
