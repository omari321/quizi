const { checkSchema } = require("express-validator");

const ordertValidator = checkSchema({
  itemId: {
    in: ["body"],
    isDecimal:true,
    isEmpty: false,
  },
    userId: {
    in: ["body"],
    isInt:true,
    isEmpty: false,
  },
});

module.exports = {
    ordertValidator,
};
