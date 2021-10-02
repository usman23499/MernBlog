const User = require('../models/User'); // call user schema
const jwt=require('jsonwebtoken'); // for create new token when name is updated
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();
module.exports.updateName = async (req, res) => {
    const {name,id}=req.body;
    if(name===""){
		return res.status(400).json({ errors: [{ msg: 'Name is required' }] });
    }
    else{
        try {
            const user = await User.findOneAndUpdate(
                {_id:id}, // this is used for match
                {name:name}, // this is used for update
                {new:true} // this is used to call updated user
            );
            console.log(user);
            const token = jwt.sign({ user },process.env.SECRET, 
            {
				expiresIn:'7d',
			}
            );
            console.log(token);
			return res.status(200).json({  msg: 'Your name has been updated',token });
		
        } catch (error) {
			return res.status(500).json({ errors });
            
        }
    }
    
};

module.exports.updatePasswordValidations = [
	body('current')
		.not()
		.isEmpty()
		.trim()
		.withMessage('Current password is required'),
	body('newPassword')
		.isLength({ min: 6 })
		.withMessage('New password must be 6 characters long'),
];

module.exports.updatePassword = async (req, res) => {
	const { current, newPassword, userId } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const matched = await bcrypt.compare(current, user.password); // user.password is possword save in database
			if (!matched) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Current password is wrong' }] });
			} else {
				try {
					const salt = await bcrypt.genSalt(10);
					const hash = await bcrypt.hash(newPassword, salt); // slat for more secure
					const newUser = await User.findOneAndUpdate(
						{ _id: user },
						{ password: hash },
						{ new: true }
					);
					return res
						.status(200)
						.json({ msg: 'Your password has been updated' });
				} catch (error) {
					return res.status(500).json({ errors });
				}
			}
		}
	}
};
