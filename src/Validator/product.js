const { checkSchema } = require("express-validator");

const productValidator = checkSchema({
  name: {
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
  price: {
    in: ["body"],
    isDecimal:true,
    isEmpty: false,
    custom:{
        options: (value, { req, location, path })=>
        {
          if (req.body.price<1)
          {
              throw new Error("price cant be less than 1")
          }
          return req.body.price
        }  
    }
  },
    quantity: {
    in: ["body"],
    isInt:true,
    isEmpty: false,
    custom:{
        options: (value, { req, location, path })=>
        {
          if (req.body.quantity<1)
          {
              throw new Error("quantity cant be less than 1")
          }
          return req.body.quantity
        }  
    }
  },
});

module.exports = {
    productValidator,
};
