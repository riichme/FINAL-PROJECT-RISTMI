// Import all needed dependencies
const mongoose = require('mongoose');
const { model, Schema} = mongoose;

// Schema Model for Category
const categorySchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Panjang nama kategori minimal 3 karakter'],
        maxLength: [20, 'Panjang nama kategori maksimal 20 karakter'],
        required: [true, 'Nama kategori harus diisi'],
    },
});

// export to controller category
module.exports = model('Category', categorySchema);