export const passwordRestrictions = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  },
};
