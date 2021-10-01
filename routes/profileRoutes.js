const express= require('express');
const auth = require('../utils/auth');

const routers = express.Router();

const {
    updateName,
    updatePasswordValidations,
    updatePassword
}=require('../controllers/profileController');

routers.post('/updateName', auth, updateName);

routers.post(
	'/updatePassword',
	[auth, updatePasswordValidations],
	updatePassword
);

module.exports = routers;
