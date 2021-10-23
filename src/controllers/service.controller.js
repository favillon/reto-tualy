const {response, request} = require('express')
const Service = require('../models/service.model')

const servicesGet = async (req = request, res = response)  => {
    
    try {
        const {limit = 10, from = 0} = req.query
        const query = {
            where:{
                status: true
            }
        }
    
        const [total, services] = await Promise.all([
            Service.count(query),
            Service.findAll({
                where:{
                    status: true
                },
                offset: from, 
                limit,
                order: [
                    ['id', 'DESC']
                ]
            })
        ])
    
        res.json({
            msg : 'get Services Controller',
            total,
            services
        })        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - get Services Controller',
        })
    }

}
const  servicePost = async(req, res = response)  => {
         
    try {

        const { user_id, date_of_service, products} = req.body
        const service = new Service({ user_id, date_of_service, products})
        await service.save()

        res.json({
            msg : 'Service Created', 
            service
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : 'Contacte con su Administrado de BD - Service Created',
        })
    }

} 


module.exports = {
    servicesGet,
    servicePost
}