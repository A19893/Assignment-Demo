const mongoose= require("mongoose");
const { generateShortUuid } = require("../libs/utils");

const User = new mongoose.Schema({
    uuid:{
        type: String,
        unique:true
    },
    username:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        unique: true,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        },
        isActive:{
            type: Boolean,
            default: true
        },
    }]
},{timestamps: true})

User.pre("save",function(next){
    this.uuid = generateShortUuid();
  next();
})

const users_model=mongoose.model("users",User)
module.exports = users_model
