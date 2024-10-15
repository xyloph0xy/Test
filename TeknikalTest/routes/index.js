var express = require('express');
var router = express.Router();
const presenceRouter = require('./EpresenceRoute')
const authRouter = require('./AuthRoute')

router.use('/presence', presenceRouter)
router.use(authRouter)

module.exports = router;