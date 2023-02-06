const express = require("express");
const router = express.Router();
const controller = require("../controller/quiz");
const asyncHandler = require("../helpers/asyncHandler");
const { validateQuiz } = require('../validations/validations');

router.post('/', asyncHandler(async (req, res) => {
  let validationError = validateQuiz(req, res);
  if (validationError) return res.status(404).send(validationError);
  else await controller.addQuiz(req.body);
  res.send('saved');
}));

router.get('/', asyncHandler(async (req, res) => {
  const data = await controller.getAllQuizzes();
  res.send(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await controller.getQuizById(id);
  res.send(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await controller.deleteQuiz(id);
  res.send('removed');
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let validationError = validateQuiz(req, res);
  if (validationError) return res.status(404).send(validationError);
  else await controller.updateQuiz(id, body);
  res.json({ message: 'Quiz updated successfully' });
}));

module.exports = router;
