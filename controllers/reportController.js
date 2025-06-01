import dbWrapper from './dbWrapper.js'
const db= new dbWrapper()
console.log('hi...')
function uploadCrime(data){
    try{
        db.query(data)
    } catch(error) {
        console.log(error)
    
    } finally {
        db.close();
    }
}

export default uploadCrime;