import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
    },
});

const Product =  mongoose.model('Product', productSchema);
export default Product;
