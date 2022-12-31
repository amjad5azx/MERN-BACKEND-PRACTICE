const express=require("express")
const app=express()
const path=require("path")
//builtin middleware
// console.log(path.join(__dirname,'../public'))

const staticpath=path.join(__dirname,'../public')
app.use(express.static(staticpath))

app.get("/",(req,res)=>{
    res.send("Hello ")
})
app.get("/about",(req,res)=>{
    res.send("Hello from about")
})

app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})

app.listen(8000,()=>{
    console.log("listening port 8000")
})


// API
// get-read
// post-create
// put-update
// delete-delete