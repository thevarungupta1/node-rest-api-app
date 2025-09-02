const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [100, 'title must be less than 100 characters'],
        required: [true, 'title is required'],
        unique: [true, 'title must be unique'],
        trim: true
    },
    description:{
        type: String,
        maxlength: [500, 'description must be less than 500 characters'],
        required: [true, 'description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    tags: {
        type: [String],
        required: [true, 'tags are required'],
        enum: ['electronics', 'clothing', 'accessories']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema)