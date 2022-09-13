// Import all needed dependencies
const mongoose = require('mongoose') // odm
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

// user schema
let userSchema = Schema({

    full_name: {
        type: String,
        required: [true, 'Nama wajib diisi'],
        maxLength: [255, 'Panjang nama harus antara 3 - 255 karakter'],
        minLength: [3, 'Panjang nama harus antara 3 - 255 karakter'],
    },

    customer_id: {
        type: Number,
    },

    email: {
        type: String,
        required: [true, 'Email wajib diisi'],
        maxLength: [255, 'Panjang email maksimal 255 karakter'],
    },

    password: {
        type: String,
        required: [true, 'Password wajib diisi'],
        maxLength: [255, 'Panjang password maksimal 255 karakter'],
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]

}, { timestamps: true });

// user email validation
userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

userSchema.path('email').validate(async function(value){
    try {
        // (1) lakukan pencarian ke _collection_ User berdasarkan `email`
        const count = await this.model('User').count({email: value});

        // (2) kode ini mengindikasikan bahwa jika user ditemukan akan mengembalikan `false` jika tidak ditemukan mengembalikan `true`
        // jika false maka validasi gagal
        // jika true maka validasi berhasil
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);

// password hashing
const HASH_ROUND = 10;
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});

// handle auto increment for id customer
userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

// export to auth controller
module.exports = model('User', userSchema);