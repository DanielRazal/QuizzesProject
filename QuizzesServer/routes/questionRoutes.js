const express = require("express");
const router = express.Router();
const controller = require("../controller/questions");
const asyncHandler = require("../helpers/asyncHandler");
const { validateQuestion } = require('../validations/validations');

router.post('/', asyncHandler(async (req, res) => {
  let validationError = validateQuestion(req, res);
  if (validationError) return res.status(404).send(validationError);
  else await controller.addQuestion(req.body);
  res.send('saved');
}));

router.get('/', asyncHandler(async (req, res) => {
  const data = await controller.getAllQuestions();
  res.send(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await controller.getQuestionById(id);
  res.send(data);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await controller.deleteQuestion(id);
    res.send('removed');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  let validationError = validateQuestion(req, res);
  if (validationError) return res.status(404).send(validationError);
  else await controller.updateQuestion(id, req.body);
  res.send('saved');
}));


module.exports = router;
