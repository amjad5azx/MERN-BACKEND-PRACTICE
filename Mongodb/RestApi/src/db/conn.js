const mongoose=require("mongoose")
const validator=require('validator')

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/student-api",{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successful")
}).catch((e)=>{
    console.log("no connection")
});