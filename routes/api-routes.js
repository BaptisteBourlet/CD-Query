const express = require('express');
const apiCtrl = require('../controllers/api-ctrl');
router = express.Router();

router.post('/addReport', apiCtrl.addReport);

router.post('/addUserGroup', apiCtrl.addUserGroup);

router.post('/addGroupReport', apiCtrl.addGroupReport);

router.get('/getUserGroup', apiCtrl.getUserGroup);

module.exports = router;