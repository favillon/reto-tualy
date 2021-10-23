const {response, request} = require('express')
const User = require('../models/user.model')

const userGet = async (req = request, res = response)  => {
    
    try {
        const {limit = 5, from = 0} = req.query
        const query = {
            where:{
                status: true
            }
        }
    
        const [total, users] = await Promise.all([
            User.count(query),
            User.findAll({
                where:{
                    status: true
                },
                offset: from, 
                limit
            })
        ])
    
        res.json({
            msg : 'get User Controller',
            total,
            users
        })        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - Get Users',
        })
    }

}


const  userPost = async(req, res = response)  => {

    try {

        const { full_name, email, status=true} = req.body

        const existEmail = await User.findOne({
            where:{
                email
            }
        })
        
        if (existEmail) {
            return res.status(400).json({
                msg : `Ya existe un usuario con el email : ${email}`
            })
        }
            
        const user = new User({ full_name, email, status})
        await user.save()

        res.json({
            msg : 'User Created', 
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - Created User',
        })
    }    

} 


const  userPut = async(req, res = response)  => {
    const id = req.params.id
    const {full_name, status} = req.body

    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(400).json({
                msg : `No existe usuario : ${id}`
            })
        }

       await user.update({full_name})

        res.json({
            msg : 'Usuario update', 
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - Update User',
        })
    }
}

const userDelete  = async(req, res = response)  => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(400).json({
                msg : `No existe usuario : ${id}`
            })
        }

       await user.update({status:false})

        res.json({
            msg : 'Usuario Delete', 
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - Update User',
        })
    }
}

module.exports = {
    userGet, 
    userPost,
    userPut,
    userDelete
}