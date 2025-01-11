import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signinUser = async (req, res) => {

    try {
        const { name, email, password, confirmpassword } = req.body;

        // check user is already register or not 
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "User already exist" })
        }

        // check password is match with confirm password or not 
        if (password !== confirmpassword) {
            return res
                .status(400)
                .json({ success: false, message: "password not match" })
        }

        // hash the password for security purpose
        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        // save the data in our database logic 
        const newUser = new userModel({
            name,
            email,
            password: hash_password
        })

        const user = await newUser.save();
        return res
            .status(201)
            .json({
                success: true,
                message: "User register successfull"
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server error"
            })
    }
}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // check user is already register or not for login 
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res
                .status(400)
                .json({ success: false, message: "User not exist" })
        }

        // check password is equal to user password after userExist
        const passwordIsEqual = await bcrypt.compare(password, userExist.password)
        if (!passwordIsEqual) {
            return res
                .status(400)
                .json({ success: false, message: "Password not match" })
        }

        // json web token is used for authorization in our database
        const jwtToken = jwt.sign(
            {
                email: userExist.email,
                id: userExist._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        // login user all field are correct after this 
        return res
            .status(200)
            .json({
                success: true,
                message: "Login successfull",
                token: jwtToken,
                name: userExist.name
            })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const {  email, password } = req.body;

        if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign(
                email+password,
                process.env.JWT_SECRET,
            )
            return res.status(200).json({ success: true, token })
        } else {
            return res.status(400).json({ success: false, message: "Invalid credintials" })
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server error" })
    }
}