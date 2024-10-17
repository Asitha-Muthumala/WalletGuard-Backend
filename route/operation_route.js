const express = require('express');
const { add_asset, get_recent_asset, get_dashboard_data } = require('../controller/operation_controller');

const router = express.Router();

router.route("/addAsset").post(add_asset);
router.route("/getRecentCashflows").get(get_recent_asset);
router.route("/getDashboardData").get(get_dashboard_data);

module.exports = router;