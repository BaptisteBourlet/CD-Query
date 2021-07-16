const e = require('express');
const express = require('express');
const apiCtrl = require('../controllers/api-ctrl');
router = express.Router();

router.post('/editUserGroup', apiCtrl.editUserGroup);

router.post('/addUserGroup', apiCtrl.addUserGroup);

router.post('/deleteUserGroup', apiCtrl.deleteUserGroup);


router.post('/addReport', apiCtrl.addReport);

router.post('/editReport', apiCtrl.editReport);

router.post('/deleteReport', apiCtrl.deleteReport);


router.post('/addGroupReport', apiCtrl.addGroupReport);

router.post('/editGroupReport', apiCtrl.editGroupReport);

router.post('/deleteGroupReport', apiCtrl.deleteGroupReport);

module.exports = router;