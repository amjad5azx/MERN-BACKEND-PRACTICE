const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const request=require("request")

const port=8000
const tempPath=path.join(__dirname,"../template/views")
const partialPath=path.join(__dirname,"../template/partials")
console.log(partialPath)

//setting view engine
app.set("view engine","hbs")
app.set("views",tempPath) 
hbs.registerPartials(partialPath)
// app.use(express.static(path.join(__dirname,"../bootstrap-4.6.2-dist/css/bootstrap.min.css")))

console.log()

app.get("/",(req,res)=>{
    res.render("index",{
    name:"amjad"

    })
})

app.get("/about",(req,res)=>{
    // request("https://api.openweathermap.org/data/2.5/weather?lat=24.86&lon=67.00&appid=1cd3122156f95a3d1685c02ac12602c4").on('data', (chunk)=> {
    //     const objjdata=JSON.parse(chunk)
    //     const arr=[objjdata]
    //     let cent=arr[0].main.temp-273
    //     console.log(`city is ${arr[0].name} temp is ${cent}`)
    //     res.send(`city is ${arr[0].name} temp is ${cent}`)
    //         // res.write(realTimeData)
    //         // console.log(realTimeData)
    //     }).on('end', (err)=> {
    //  if (err) return console.log('connection closed due to errors', err);
    //  res.end()
// });
res.render("about")
})

app.get("/about/*",(req,res)=>{
    res.render("404",{
        errorcomment:"About Page not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorcomment:"Page not found"
    })
})

// app.get("/",(req,res)=>{
    // res.send("Hello from express server 2")
// })

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})