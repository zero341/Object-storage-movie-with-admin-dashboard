const { body, validationResult } = require('express-validator');

// Middleware for validating movie input
const validateMovieInput = () => {
    return [
        body('title').isString().notEmpty().withMessage('Title is required'),
        body('year').isNumeric().withMessage('Year must be a number'),
        body('genre').isString().notEmpty().withMessage('Genre is required'),
        body('director').isString().notEmpty().withMessage('Director is required'),
        body('file').isObject().notEmpty().withMessage('File is required')
    ];
};

// Middleware to handle validation result
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateMovieInput, validateResult };