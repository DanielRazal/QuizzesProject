const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const controller = require("../controller/quizType");

router.get('/', asyncHandler(async (req, res) => {
    const data = await controller.getAllTypes();
    res.send(data);
}));

module.exports = router;