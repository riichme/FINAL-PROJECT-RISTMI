// Import ODM Mongoose
const {Schema, model} = require('mongoose');

// Schema Model for Delivery Address
const deliveryAddressSchema = Schema({

    nama: {
        type: String,
        maxLength: [255, 'Panjang nama alamat maksimal 255 karakter'],
        required: [true, 'Nama alamat harus diisi'],
    },

    kelurahan: {
        type: String,
        maxLength: [255, 'Panjang kelurahan maksimal 255 karakter'],
        required: [true, 'Kelurahan harus diisi'],
    },

    kecamatan: {
        type: String,
        maxLength: [255, 'Panjang kecamatan maksimal 255 karakter'],
        required: [true, 'Kecamatan harus diisi'],
    },

    kabupaten: {
        type: String,
        maxLength: [255, 'Panjang kabupaten maksimal 255 karakter'],
        required: [true, 'Kabupaten harus diisi'],
    },

    provinsi: {
        type: String,
        maxLength: [255, 'Panjang provinsi maksimal 255 karakter'],
        required: [true, 'Provinsi harus diisi'],
    },

    detail: {
        type: String,
        maxLength: [1000, 'Panjang detail maksimal 1000 karakter'],
        required: [true, 'Detail alamat harus diisi'],
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

}, {timestamps: true}); // add createdAt and updatedAt

// export to controller delivery address
module.exports = model('DeliveryAddress', deliveryAddressSchema);