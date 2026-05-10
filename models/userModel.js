import knex from'knex';
import config from '../knexfile.js';

const db = knex(config.development);
    //am just mixing up class and functional programming styles here, ignore the class keyword
class userModel{
    constructor(db){
        this.db = db;
    }
    async createUser(user){
        try {
            const [newUser] = await this.db('users').insert(user).returning('*');
            return newUser;
        } catch (error) {
            throw error;
        }
    }
    async getUserByEmail(email){
        try {
            const user = await this.db('users').where({ email }).first();
            return user;
        } catch (error) {
            throw error;
        }
    }       
}


export default new userModel(db);   