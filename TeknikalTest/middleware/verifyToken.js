const jwt = require('jsonwebtoken');
const models = require('../models');
const { User } = models;

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization.split('Bearer ')[1];

    if(token == null) return res.status(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403).json({
            msg: err.message
        }); 
        req.user = decoded;
        next();
        
    })
}

const supervisorOnly = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      where:{
        id: decoded.id,
      }
    });
  
    if (!user)
      return res
        .status(404)
        .json({ message: 'User not found' });

    if (user.npp_supervisor !== null)
      return res.status(403).json({ message: 'Access denied' });
    next();
  }

module.exports= {verifyToken, supervisorOnly}