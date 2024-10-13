const express = require('express');
const { add_asset } = require('../controller/operation_controller');

const router = express.Router();

router.route("/addAsset").post(add_asset);

module.exports = router;