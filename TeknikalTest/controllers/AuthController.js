const models = require('../models');
const { User } = models;
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports={
    register: async (req,res)=>{
        let {name, password, email, npp, npp_supervisor} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)
        password = hashPass

        try {
            const user = await User.create({ name, email, password, npp, npp_supervisor});
            user.password = undefined;
            res.status(200).json({
                msg: "Register berhasil",
                data: user
            })
        } catch (error) {
            res.status(500).json({
                msg: error
            })
        }
    },
    login: async (req,res)=>{
        try {
            
            const user = await User.findOne({
                where:{
                    npp: req.body.npp
                }
            })

            if (user === null) {
                res.status(404).json({ msg: 'User not found' });
              } 

            const match = await bcrypt.compareSync(req.body.password, user.password)
            if(!match){
                return res.status(400).json({
                    msg:"password are incorrect"
                })
            }

            const id = user.id
            const name = user.name
            const email = user.email
            const npp = user.npp
            const npp_supervisor = user.npp_supervisor
            


            const accessToken = jwt.sign({id,name,email, npp, npp_supervisor}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            })

            if (user) {
                req.session = user.id
                res.json({
                  msg: 'success login',
                  token: accessToken,
                });
              } else {
                res.status(401).json({
                  msg: 'username or password are incorrect',
                });
              }

        } catch (error) {
            console.log(error);
            res.status(404).json({
                msg: error.message
            })
        }
    }
}