// 6
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: {
    type: Date, default: Date.now()
  }
})
exports.UserModel = mongoose.model("users", userSchema);
// הרשמה
exports.userValid = (_bodyValid) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    // email() -> בודק שגם האימייל לפי תבנית מייל
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(6).max(50).required(),
  })
  return joiSchema.validate(_bodyValid);
}
// התחברות
exports.loginValid = (_bodyValid) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(6).max(50).required(),
  })
  return joiSchema.validate(_bodyValid);
}


exports.createToken = (user_id) => {
  let token = jwt.sign({id:user_id}, "BatShevaSecret", {expiresIn: "60mins"});
  return token;
}