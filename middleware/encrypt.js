import bcrypt from 'bcrypt';

const encryptPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword; // Replace plain password with hashed version
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}   ;
const decryptPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match; // Returns true if passwords match, false otherwise
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Internal server error');
    }
}
const encrypt = { decryptPassword ,encryptPassword}; 

export default encrypt;