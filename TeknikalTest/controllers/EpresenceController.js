const models = require('../models');
const { Epresence, User } = models;
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const { where } = require('sequelize');


module.exports={
    createPresences: async (req,res)=>{
        let type = req.body.type
        let UserId = req.user.id
        let waktu = new Date()

        try {
            let data = await Epresence.create({ UserId, type, waktu });

            res.status(200).json({
                msg: "Register berhasil",
                data: data

            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: error.message
            })
        }
    },
    updatePresence: async (req,res)=>{
        const { id } = req.params;
        const is_approve = req.body.is_approve
        let nppUser = req.user.npp

        try {
            const epresence = await Epresence.findOne({
                where:{
                    id
                },
                include:[{
                    model: User,
                    attributes: ['npp_supervisor']
                }]
            })
           

            if (epresence === null) {
                res.status(404).json({ msg: 'Epresence not found' });
              } 

            if (nppUser !== epresence.User.npp_supervisor) {
                res.status(403).json({ msg: 'Access denied, you are not the supervisor of the employee' });
              }

            await Epresence.update({is_approve},{
                where: {
                  id,
                },
              });

              res.status(404).json({
                msg: "Success Update Data",
            })

        } catch (error) {
            console.log(error);
            res.status(404).json({
                msg: error.message
            })
        }
    },

    getAllData: async (req, res) => {
        try {
            const data= await Epresence.findAll({
                attributes: ['UserId', 'type', 'waktu', 'is_approve'],
                // group: ['UserId','type', 'waktu', 'is_approve']
            })
            console.log(data);
            // process.exit()
            res.status(200).json({
                msg: "success",
                data
                // data : [
                //     {
                //         "id_user" : data.id_user,
                //         "nama_user":data.User.name,
                //     }
                // ]
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: error.message
            })
        }
    },

    getDataByID: async (req, res) => {
        
    }
}