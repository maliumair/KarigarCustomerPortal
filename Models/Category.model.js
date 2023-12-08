const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    tag:{
        type: String,
        required: [true, "Tag is required"]
    },
    icon:{
        type: String,
        required: [true, "Icon is required"]
    },
    created_at:{
        type: Date,
        default: Date()
    },
    updated_at:{
        type: Date,
        default: Date()
    }
}
);

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category