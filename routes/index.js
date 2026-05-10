import express from 'express';
import users from './user.js';

const route = express.Router();

route.use('/user',users );

export default route;