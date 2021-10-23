const { Router } = require('express')
const { check } = require('express-validator')

const {userGet, userPost, userPut, userDelete} = require('../controllers/user.controller')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

router.get('/', userGet)

router.post(
    '/',
    [
        check('full_name', 'Nombre completo es obligatorio').not().isEmpty(),
        check('email', 'Email no valido').isEmail(),
        validateFields
    ],
    userPost
)

router.put(
    '/:id', 
    [
        check('full_name', 'Nombre completo es obligatorio').not().isEmpty(),
        validateFields
    ],
    userPut
)

router.delete('/:id', userDelete)

module.exports = router