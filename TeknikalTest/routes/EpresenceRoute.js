var express = require('express');
var router = express.Router();
const {verifyToken, supervisorOnly} = require('../middleware/verifyToken')
const {
  createPresences,
  updatePresence,
  getAllData,
  getDataByID
} = require('../controllers/EpresenceController')

router.post('/', verifyToken, createPresences)
router.patch('/:id', verifyToken, supervisorOnly, updatePresence)
router.get('/', verifyToken, getAllData)
router.get('/:id', verifyToken, getDataByID)


module.exports = router;