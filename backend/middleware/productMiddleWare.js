import joi from "joi";
export const productMiddleWareValidation = async (req, res, next) => {
    try {
        // Parse `sizes` if it comes as a string
        if (typeof req.body.sizes === "string") {
            try {

                // req.body.sizes = JSON.parse(req.body.sizes);  convert into an array
                req.body.sizes = (req.body.sizes).split(''); // Parse the string into an array
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid sizes format. It must be a valid JSON array.",
                });
            }
        }

        const schema = joi.object({
            name: joi.string().trim().min(5).required(),
            description: joi.string().trim().min(10).max(600).required(),
            price: joi.number().positive().required(),
            image: joi.array().items(joi.string().uri()),
            category: joi.string().trim().required().min(3),
            subcategory: joi.string().trim().required().min(3).max(50),
            sizes: joi.array().items(joi.string().required()).required(), // Validate as an array of strings
            bestseller: joi.boolean(),
            brand: joi.string().trim().required().min(4).max(30)
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message,
            });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
