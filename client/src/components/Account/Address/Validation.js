// Initialize the validation rules of form and then export to address form

const rules = {
    nama: {
      required: { value: true, message: "nama alamat Harus diisi" },
      maxlength: { value: 500, message: "Panjang alamat maksimal 500 karakter" },
      minlength: { value: 5, message: "Panjang alamat minimal 5 karakter" },
    },
    provinsi: {
      required: { value: true, message: " Provinsi Harus diisi" },
    },
    kabupaten: {
      required: { value: true, message: " kabupaten Harus diisi" },
    },
    kecamatan: {
      required: { value: true, message: " kecamatan Harus diisi" },
    },
    kelurahan: {
      required: { value: true, message: "kelurahan Harus diisi" },
    },
    detail: {
      required: { value: true, message: "detail alamat Harus diisi" },
      maxlength: {
        value: 1000,
        message: "Panjang detail alamat maksimal 1000 karakter",
      },
    },
  };
  
  export { rules };