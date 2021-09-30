const express= require('express');
const auth = require('../utils/auth');

const routers = express.Router();

const {
    updateName,
}=require('../controllers/profileController');

routers.post('/updateName', auth, updateName);

module.exports = routers;
