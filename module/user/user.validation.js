const joi = require('joi')

const signupval = joi.object({
    userName :joi.string().required(),
    email :joi.string().required(),
    password :joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required(),
    cpassword :joi.string().valid(joi.ref('password')).required(),
    age :joi.number().required(),
})
const signinval = joi.object({
    email :joi.string().required(),
    password :joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required(),

})

module.exports= {
    signupval,signinval
}