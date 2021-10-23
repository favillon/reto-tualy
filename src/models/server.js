const cors = require('cors')
const express = require('express')

const {db} = require('../db/connection')


class Server {

    constructor(){
        this.app  = express()
        this.port = process.env.PORT_SERVER || 3000
        this.path = '/api/'
        this.userPath = this.path + 'user'
        this.servicesPath = this.path + 'service'

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
        this.app.use(this.userPath, require('../routes/user.router'))
        this.app.use(this.servicesPath, require('../routes/service.router'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server Node Run port ${this.port}`);
        })
    }
}

 module.exports = Server