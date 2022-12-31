const mongoose=require("mongoose")
const validator=require('validator')

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    phone:{
        type:Number,
        min:3,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

//now creating collection
const Student=new mongoose.model("Student",StudentSchema);


module.exports=Student;