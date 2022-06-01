const { checkSchema } = require("express-validator");

const userValidator = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    isEmpty: false,
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
    },
  },
  firstName: {
    in: ["body"],
    isString: true,
    isEmpty: false,
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
    },
  },
  lastName: {
    in: ["body"],
    isString: true,
    isEmpty: false,
    isLength: {
      options: {
        min: 2,
        max: 50,
      },
    },
  },
  password: {
    in: ["body"],
    isEmpty: false,
    isLength: {
      options: {
        min: 6,
        max: 50,
      },
    },
  },
});

module.exports = {
    userValidator,
};
