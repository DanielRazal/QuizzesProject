const express = require("express");
const router = express.Router();
const controller = require("../controller/admin");
const asyncHandler = require("../helpers/asyncHandler");
const { validateAdminLogin } = require('../validations/validations');


router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await controller.adminLogin(email, password);
  let validationError = validateAdminLogin(user, req, res);
  if (validationError) return res.status(404).send(validationError);
  return res.send(user);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await controller.getUserById(id);
  res.send(data);
}));

router.get('/', asyncHandler(async (req, res) => {
  const data = await controller.getAllUsers();
  res.send(data);
}));

module.exports = router;
