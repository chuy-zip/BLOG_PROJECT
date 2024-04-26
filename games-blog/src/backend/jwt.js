import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.PASS

function createToken( user ){
    return jwt.sign(user, secretKey, {expiresIn: '1h'})
}

function validateToken( token ){
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        console.error('Invalid token', error)
        return false
    }

}

export { createToken, validateToken}