const express = require('express');
const appCtrl = require('../controllers/app-ctrl');
router = express.Router();

router.post('/addReport', appCtrl.addReport);

router.post('/addUserGroup', appCtrl.addUserGroup);

router.post('/addGroupReport', appCtrl.addGroupReport);

router.get('/getUserGroup', appCtrl.getUserGroup);

module.exports = router;