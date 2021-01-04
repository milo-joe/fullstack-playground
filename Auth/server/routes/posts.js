const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) =>{
    res.json({post: {data:'forbidden data'}});


});


module.exports = router;