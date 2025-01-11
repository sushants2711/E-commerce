import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    try {
        // const auth = req.headers['authorization'];
        const { token} = req.headers;
        if(!token) {
            return res
            .status(403)
            .json({ success: false, message: "not authorized to access this"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res
            .status(403)
            .json({ success: false, message: "Not authorized for this page"})
        }
        next()
    } catch (error) {
        return res
        .status(500)
        .json({ success: false, message: "Internal server error"})
    }
}