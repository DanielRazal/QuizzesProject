const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const controller = require("../controller/language");

router.get('/', asyncHandler(async (req, res) => {
    const Language = await controller.getAllLanguages();
    res.send(Language);
}));

module.exports = router;
