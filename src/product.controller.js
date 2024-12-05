import Product from './product.model.js';

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

// Fetch a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product.' });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    const { name, price, quantity } = req.body;
    const imageUrl = req.file.path;
    console.log(req.body)
    try {
        const newProduct = new Product({ name, price, quantity, imageUrl });
        console.log(newProduct)
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add product.', details: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req?.file) {
            updates.imageUrl = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        console.log(updatedProduct)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update product.', details: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product.' });
    }
};

export {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
