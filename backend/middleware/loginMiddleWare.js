import joi from "joi";

export const loginMiddleWare = async (req, res, next) => {

    const schema = joi.object({
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(40).required(),
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