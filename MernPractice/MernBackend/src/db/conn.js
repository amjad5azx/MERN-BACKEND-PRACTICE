const mongoose=require("mongoose")


mongoose.set('strictQuery',true)

mongoose.connect("mongodb://localhost:27017/workRegistration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex :true
}).then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log("no connection")
})