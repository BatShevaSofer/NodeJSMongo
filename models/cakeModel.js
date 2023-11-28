// 6
const mongoose = require("mongoose");
const Joi = require("joi");
const cakeSchema = new mongoose.Schema({
  name: String,
  cals: Number,
  price: Number,
  user_id: String
})
exports.CakeModel = mongoose.model("cakes", cakeSchema);

exports.cakeValid = (_bodyValid) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    // email() -> בודק שגם האימייל לפי תבנית מייל
    cals: Joi.number().min(0).max(5000).required(),
    price: Joi.number().min(6).max(50).required(),
  })
  return joiSchema.validate(_bodyValid);
}



