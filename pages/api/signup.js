import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //validate name, email, password values
        if (!isLength(name, { min: 6, max: 25 })) {
            return res.status(422).send('Name must be 6-25 characters long');
        } else if (!isLength(password, { min: 6 })) {
            return res
                .status(422)
                .send('Password must be at least 6 characters long');
        } else if (!isEmail(email)) {
            return res.status(422).send('Must use valid email');
        }
        //check to see if user exists already
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(422)
                .send(`User already exists with email ${email}`);
        }
        //if not hash password
        const hash = await bcrypt.hash(password, 10);
        //create user
        const newUser = await new User({ name, email, password: hash }).save();
        // create a cart for new user
        await new Cart({ user: newUser._id }).save();
        //create token for user
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        //send back token to user
        res.status(201).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up. Please try again later');
    }
};
