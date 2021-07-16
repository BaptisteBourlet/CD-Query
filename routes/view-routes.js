const express = require('express');
const viewCtrl = require('../controllers/view-ctrl');
router = express.Router();

router.get('/report', viewCtrl.ReportOverview);

router.get('/report-entry', viewCtrl.ReportEntry);

router.get('/report-edit', viewCtrl.ReportEdit);

// ================================================

router.get('/user-group', viewCtrl.UserGroupOverview);

router.get('/user-group-entry', viewCtrl.UserGroupEntry);

router.get('/user-group-edit', viewCtrl.UserGroupEdit);

// ================================================

router.get('/user-group-link', viewCtrl.UserGroupLinkOverview);

router.get('/user-group-link-entry', viewCtrl.UserGroupLinkEntry);

router.get('/user-group-link-edit', viewCtrl.UserGroupLinkEdit);

module.exports = router;