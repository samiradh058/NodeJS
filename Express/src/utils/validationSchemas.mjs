export const createUserValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Username must be 5-32 characters long",
    },
    notEmpty: {
      errorMessage: "Username is required",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },

  age: {
    isInt: {
      options: { min: 18, max: 120 },
      errorMessage: "Age must be a valid integer between 18 and 120",
    },
    notEmpty: {
      errorMessage: "Age is required",
    },
  },
};

export const queryValidationSchema = {
  filter: {
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter must not be empty",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Filter must be 3-10 characters long",
    },
  },
};
