import express from 'express';
import { body, validationResult } from 'express-validator';
import upload  from './middlewares/multer.middleware.js';
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from './product.controller.js';

const router = express.Router()

// Validation Middleware
const validateProduct = [
    body('name').isString().withMessage('Product Name must be a string.'),
    body('price').isNumeric().withMessage('Price must be a number.'),
    body('quantity').isNumeric().withMessage('Quantity must be a number.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), validateProduct, addProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
