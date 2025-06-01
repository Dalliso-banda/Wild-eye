import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wildEye'

});

const tables = {
  alerts: 'clothes',
};

class DBwrap {
  constructor() {
    this.config = dbConfig;
    this.tables = tables;

  }


  async query(sql) {
    try {
    
      const [rows] = await this.config.query(sql);
      return rows;
    } catch (error) {

      throw new Error('Error executing query'+error);
    }
  }



    async getAll(){
     try{
       const [rows]= await this.config.promise().execute('SELECT * FROM crime_reports');  
       return rows
     } catch(error) {
         console.error(error)
     } finally {
         await this.close()
     }
                
            
     
  
    }



  async close() {
    try {
      await this.config.end();  

    } catch (error) {

    }
  }
}

export default DBwrap;
