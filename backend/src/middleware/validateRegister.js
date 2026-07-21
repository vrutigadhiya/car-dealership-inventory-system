const { body } = require("express-validator");

const validateRegister = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),


    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail(),


    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")

        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")

        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")

        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")

        .matches(/[!@#$%^&*]/)
        .withMessage(
            "Password must contain at least one special character"
        )

];


module.exports = validateRegister;