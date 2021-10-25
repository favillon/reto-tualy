const cors = require('cors')
const express = require('express')

const {db,closeConnection} = require('../db/connection')


class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT_SERVER || 3000
        this.path = '/api/'
        this.userPath = this.path + 'user'
        this.servicesPath = this.path + 'service'
        this.servicio

        // Conexion BD
        this.dbConnection()

        // Middlewares
        this.middlewares()

        // Rutas
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log('Database Online');
        } catch (error) {
            console.log('Error en la conexion');
            throw new Error(error)
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // parse body
        this.app.use(express.json())

        // public
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api', require('../routes/api.router'))
        this.app.use(this.userPath, require('../routes/user.router'))
        this.app.use(this.servicesPath, require('../routes/service.router'))
    }

    listen(){
        this.servicio = this.app.listen(this.port, () =>{
            console.log(`Server Node Run port ${this.port}`);
        })
    }
    async closed(){
        await this.servicio.close()
    }
    async closedDbConnection(){
        try {
            await db.close()
            console.log('Conexion cerrada');
        } catch (error) {
            console.log('Error en el cierre');
            throw new Error(error)
        }
    }
}

 module.exports = Server