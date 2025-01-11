import joi from "joi";

export const signinMiddleWare = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().min(2).max(30).required().trim(),
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(40).required(),
        confirmpassword: joi.string().min(8).max(40).required(),
        cartdata: joi.object().default({})
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message
            })
    }
    next()
}