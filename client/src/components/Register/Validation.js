// Initialize the validation rules of form and then export to register form

const rules = {
    full_name: {
      required: "Nama lengkap harus diisi",
      maxLength: {
        value: 255,
        message: "panjang nama lengkap maksimal 255 karakter",
      },
    },
  
    email: {
      required: { value: true, message: "Email Harus diisi" },
      maxLength: { value: 255, message: "Panjang email maksimal 255 karakter" },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Email tidak valid",
      },
    },
  
    password: {
      required: { value: true, message: "Password harus diisi" },
      maxLength: {
        value: 255,
        message: "Panjang password maksimal 255 karakter",
      },
    },
  
    passwordConfirm: {
      required: { value: true, message: "Harus diisi" }
    },
  };
  
  export { rules };