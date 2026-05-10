//spider monkey lol

import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv'
dotenv.config();
const PORT = process.env.SERVER_PORT
;


const app = express();
app.use(express.json());
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

