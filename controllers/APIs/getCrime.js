import dbWrapper from '../dbWrapper.js'
import express from 'express'
const router = express.Router()

        
router.get('/getCrimes',async (req,res)=>{
     const db = new dbWrapper();
     try{
        
   console.log("get crimes hit")
   const db = new dbWrapper();
   let data = await db.getAll();
      
      res.json(data)
         
         
         
     } catch(error) {
         console.log(error)
     } finally {
         db.close();
     }
})

export default router;