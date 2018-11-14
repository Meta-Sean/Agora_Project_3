const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.inventory = !isEmpty(data.inventory) ? data.inventory : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required";
  }

  if (!Validator.isInt(data.price)) {
    errors.price = "Price field must be a number";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (!Validator.isInt(data.inventory)) {
    errors.inventory = "Inventory field must be a number";
  }

  if (Validator.isEmpty(data.inventory)) {
    errors.inventory = "Inventory field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
