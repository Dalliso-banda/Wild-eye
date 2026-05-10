import express from 'express';  
import validator from '../middleware/validateUser.js';
import userSchema from '../schemas/userSchema.js';
import encrypter from '../middleware/encrypt.js';
import userModel from '../models/userModel.js';
import { name } from 'ejs';
const router = express.Router();


router.post('/login', validator(userSchema.login), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await encrypter.decryptPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/register', validator(userSchema.register), encrypter.encryptPassword,  async  (req, res) => {
       
   let temp_user;
     try{
        const { fullName, email, password,phone } = req.body;
      
        const newUser = await userModel.createUser({ 
  fullname: fullName, 
  email, 
  password ,
  phone
});
  temp_user = newUser;
     }catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
     }
   
     res.status(201).json( {message: 'User registered successfully',id:temp_user.id,name:temp_user.fullname} );
  
});

export default router;