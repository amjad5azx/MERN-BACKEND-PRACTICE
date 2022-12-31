const express=require("express")
const app=express();
require("./db/conn")
const Student=require("./models/student")
const studentRouter=require("./routers/studentRoute")

const port=process.env.POST || 8000;
app.use(express.json())
app.use(studentRouter)

app.listen(port,()=>{
    console.log(`connection is set in port: ${port}`);
})