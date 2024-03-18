// routes/studentRoutes.js
const express = require('express');
const studentController = require('../controller/controller');

const router = express.Router();

router.post('/createUser', studentController.createUser);
router.post('/loginUser', studentController.loginUser);


router.delete('/delete/:user_id', studentController.deleteUser);
router.get('/getAllUser', studentController.getAllUser);

module.exports = router;