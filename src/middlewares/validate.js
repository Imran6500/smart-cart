const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(422).json({
                success: false,
                message: "Validation failed",
                data: error.details.map((detail) => detail.message),
                meta: null
            });
        }

        req.body = value;

        next();
    };
};

module.exports = validate;