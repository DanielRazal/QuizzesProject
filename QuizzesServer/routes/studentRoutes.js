const express = require("express");
const router = express.Router();
const controller = require("../controller/student");
const asyncHandler = require("../helpers/asyncHandler");
const { validateStudentLogin } = require('../validations/validations');


router.get('/', asyncHandler(async (req, res) => {
  const data = await controller.getAllStudents();
  res.send(data);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await controller.getStudentById(id);
  res.send(data);
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;
  const user = await controller.studentLogin(email, fullName);
  let validationError = validateStudentLogin(user, req, res);
  if (validationError) return res.status(404).send(validationError);
  return res.send(user);
}))

module.exports = router;
