const express = require('express');
const viewCtrl = require('../controllers/view-ctrl');
router = express.Router();

router.get('/reports', viewCtrl.getReportOverview);

router.get('/user-group', viewCtrl.getUserGroupOverview);

router.get('/user-group-link', viewCtrl.getUserGroupLinkOverview);

module.exports = router;