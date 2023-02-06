const express = require("express");
const app = express();
const questionRouter = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const questionTypeRoutes = require("./routes/questionTypeRoutes");
const studentRoutes = require("./routes/studentRoutes");
const quizRoutes = require("./routes/quizRoutes");
const languageRoutes = require("./routes/languageRoutes");
const quizTypeRoutes = require("./routes/quizTypeRoutes");
const completedQuizRoutes = require("./routes/completedQuizRoutes");

const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./settings/staticUrls");

app.use(cors());
app.listen(Urls.serverPort, () =>
  console.log(
    `YahalomTests server is running at ${Urls.serverDomain}:${Urls.serverPort}`
  )
);

app.use(bodyParser.json());

app.use("/api/Questions", questionRouter);
app.use("/api/Admin", adminRoutes);
app.use("/api/QuestionType", questionTypeRoutes);
app.use("/api/Students", studentRoutes);
app.use("/api/Quizzes", quizRoutes);
app.use("/api/Languages", languageRoutes);
app.use("/api/QuizType", quizTypeRoutes);
app.use("/api/CompletedQuizzes", completedQuizRoutes);