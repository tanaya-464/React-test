// src/utils/validation.js
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };
  