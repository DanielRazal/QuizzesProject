const express = require("express");
const router = express.Router();
const controller = require("../controller/completedQuiz");
const asyncHandler = require("../helpers/asyncHandler");

router.post('/', asyncHandler(async (req, res) => {
  const { body } = req;
  await controller.addCompletedQuiz(body);
  res.send('saved');
}));

router.get('/', asyncHandler(async (req, res) => {
  const data = await controller.getAllCompletedQuizzes();
  res.send(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await controller.getCompletedQuizById(id);
  res.send(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await controller.deleteCompletedQuiz(id);
  res.send('removed');
}));


router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await controller.updateCompletedQuiz(id, body);
  res.send('saved');
}));

router.get('/student/:studentId', asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const data = await controller.getCompletedQuizzesByStudentId(studentId);
  res.send(data);
}));

module.exports = router;
