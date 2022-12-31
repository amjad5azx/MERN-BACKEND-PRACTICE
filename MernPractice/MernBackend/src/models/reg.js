const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const empSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
    ]
})

//generating tokens
empSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (e) {
        res.send("the error: "+e)
        console.log("the error: "+e)
    }
}


//hashing
empSchema.pre("save",async function(next){
    if(this.isModified("password")){
        // const passwordHash=await bcrypt.hash(password,12)
        console.log(`the password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,12)
        console.log(`the password is ${this.password}`);
        this.confirm_password=await bcrypt.hash(this.confirm_password,12)
        console.log(`the confirm password is ${this.password}`);
    }
    next()

})

const Register=new mongoose.model("workRegistration",empSchema)

module.exports=Register