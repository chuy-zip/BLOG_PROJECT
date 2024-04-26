import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRETKEY = process.env.KEY_PASS

function createToken( user ){
    return jwt.sign(user, SECRETKEY, {expiresIn: '1h', algorithm: 'HS256'})
}

function validateToken( token ){
    try {
        return jwt.verify(token, SECRETKEY)
    } catch (error) {
        console.error('Invalid token', error)
        return false
    }

}

export { createToken, validateToken}