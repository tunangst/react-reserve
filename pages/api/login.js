import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
    const { email, password } = req.body;
    try {
        // check to see if user exists with email
        const user = await User.findOne({ email }).select('+password');
        //no user: return error
        if (!user) {
            return res.status(404).send('No user exists with this email');
        }
        //check to see if password matches db password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        //if yes, generate token
        if (passwordsMatch) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            //send token to user
            res.status(200).json(token);
        } else {
            res.status(401).send('Passwords do not match');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
};
