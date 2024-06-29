import jwt from 'jsonwebtoken';

const JWT_SECRET = 'ed522a536a31bf7c30a82326e0b0b46743381da51dd0d7019b3fe2b580442616';

export function generateToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}