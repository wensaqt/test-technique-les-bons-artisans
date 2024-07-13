export const nameRestrictions = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "Username must be at least 3 characters",
  },
  pattern: {
    value: /^(?=.*[A-Z]).{3,}$/,
    message: "Username must contain at least one uppercase letter",
  },
};
