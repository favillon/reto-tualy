const { Router } = require('express');
const {validService} = require('../Queues/Queue')
const router = Router()

router.get('/', function(req, res) {
    res.status(200).json({ name: 'Reto' });
});

router.post('/service/:service', async(req, res)  => {

    const idService = Number(req.params.service)

    await validService({service:idService})
    let fecha = new Date()
    res.status(200).json({ msg: `Servicio procesando ${idService} ${fecha}` })
});

module.exports = router