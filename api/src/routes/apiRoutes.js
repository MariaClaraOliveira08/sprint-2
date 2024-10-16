const router = require('express').Router()


const userController = require("../controllers/userController")

router.post('/user', userController.createUsuario);
router.get('/user', userController.getAllUsuario);
router.put('/user', userController.updateUsuario);
router.delete('/user/:cpf', userController.deleteUsuario);



module.exports = router