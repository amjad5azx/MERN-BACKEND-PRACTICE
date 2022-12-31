const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    res.send("Hello ")
})
app.get("/about",(req,res)=>{
    res.status(200).send("Hello from about")
})

app.get("/temp",(req,res)=>{
    res.send({
        id:1,
        name:"Amjad"
    })
})

app.get("/arr",(req,res)=>{
//     res.send([
//     {
//         id:1,
//         name:"Amjad"
//     },
//     {
//         id:2,
//         name:"Zaid"
//     },
// ])
// })

res.json([
    {
        id:1,
        name:"Amjad"
    },
    {
        id:2,
        name:"Zaid"
    },
])
})

app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/home.html")
})

app.listen(8000,()=>{
    console.log("listening port 8000")
})

// The methods are identical when an object or array is passed, but res.json() will also convert non-objects,such as null and undefined, which are not valid JSON.

// On using status(), we are actually checking it's status first than sending some response which is a good practice , and  on using  send() ,we r  sending response directly i.e. what to show on the page ,So in case of an error we can send a message as response on using status () which is the benefit of this


// res.send(200); returns source code
// res.json(200); returns object
// API
// get-read
// post-create
// put-update
// delete-delete