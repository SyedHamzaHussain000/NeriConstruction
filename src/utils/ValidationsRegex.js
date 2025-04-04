export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
export const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Accepts exactly 10 digits
    return phoneRegex.test(phone);
  };
  
// export const validatePassword = (password) => {
//     // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };
  
export const validatePassword = (password: string) => {
    const passwordRegex = /^.{8}$/;
    return passwordRegex.test(password);
  };
  
  