require('dotenv').config()
const express=require("express")
const path=require("path")
const hbs=require("hbs")
require("./db/conn")
const Register=require("./models/reg")
const bcrypt=require("bcryptjs")
const cookieParser=require("cookie-parser")
const auth=require("./middleware/auth")

const app=express()
const port=process.env.PORT || 3000



const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")
const partial_path=path.join(__dirname,"../templates/partials")

// console.log(static_path)
app.use(express.json())//ye data ko json may convert karay ga
app.use(express.urlencoded({extended:false}))//form ka data is se get hoga
app.use(express.static(static_path))
app.use(cookieParser())
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)


console.log(process.env.SECRET_KEY);

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/secret",auth,(req,res)=>{
    console.log(`this is cookie ${req.cookies.jwt}`);
    res.render("secret")
    // res.send(`this is cookie ${req.cookies.jwt}`)
})

app.get("/this",auth,async (req,res)=>{
    console.log(`this is cookie ${req.cookies.jwt}`);

    //logout from all devices except this
        req.user.tokens=req.user.tokens.filter((curElem)=>{
            return curElem.token==req.token
        })

        await req.user.save()
    res.render("secret")
    // res.send(`this is cookie ${req.cookies.jwt}`)
})

app.get("/logout",auth,async(req,res)=>{
    try {
        console.log(req.user);

        //for single logout
        req.user.tokens=req.user.tokens.filter((curElem)=>{
            return curElem.token!=req.token
        })

        //for logout from all devices
        // req.user.tokens=[]

        res.clearCookie("jwt")
        await req.user.save()
        console.log("logout successfully");
        res.render("login")
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/register",(req,res)=>{
    res.render("register")
})

//create new user
app.post("/register",async (req,res)=>{
    try {
        console.log(req.body.firstname)
        const pass=req.body.password
        const cpass=req.body.confirmpassword
        if(pass==cpass){
            // res.send("pass match")
            const regEmployee=new Register({
                name:req.body.firstname,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirm_password:req.body.confirmpassword
            })

            console.log("The success part");

            const token=await regEmployee.generateAuthToken()
            console.log("the token part: "+token);

            // The res.cookie() function is used to set the cookie name to value.
 // The value parameter may be a string or object converted to JSON.
//Syntax:
        //res.cookie(name, value, [options])
        res.cookie("jwt", token,{
            expires:new Date(Date.now()+30000),
            httpOnly:true
        })

            const regis=await regEmployee.save()
            

            res.status(201).render("index")
            return
        }
        else{
            // res.send("password not match")
        }
    } catch (error) {
        res.status(400).send(error)
    }
    // res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
/
app.post("/login",async (req,res)=>{
    try {
        const email=req.body.email
        const pass=req.body.password

        // console.log(`Email: ${email} and Password:${pass}`);

        const useremail=await Register.findOne({email:email})
        // res.send(useremail)
        // console.log(useremail.password)

        const isMatch=await bcrypt.compare(pass,useremail.password)

        const tokenA=await useremail.generateAuthToken()
        console.log("the token part: 11 "+tokenA);

        res.cookie("jwt", tokenA,{
            expires:new Date(Date.now()+600000),
            httpOnly:true
            // secure:true
        })

        console.log(isMatch);
        if(isMatch){
            res.render("index")
            return
        }
        else{
            res.send("Invalid Password")
        }
    } catch (error) {
        res.status(400).send("mismatch")
    }
})

// const securePassword=async (password,asd)=>{
//     const passwordHash=await bcrypt.hash(password,12)
//     console.log(passwordHash);

//     const passwordHash1=await bcrypt.compare(password,asd)
//     console.log(passwordHash1);
// }

// securePassword("amjad","asd")
/*
const jwt=require("jsonwebtoken")

const createToken=async()=>{
    const token=await jwt.sign({_id:"63a8c1ab21a6418e9c3a793b"},"mynameisMuhammadAmjadfromBSE5Bfrombahriauniversity",{
        expiresIn:"2 seconds"
    })
    console.log(token);
    const userVer=await jwt.verify(token,"mynameisMuhammadAmjadfromBSE5Bfrombahriauniversity")
    console.log(userVer);
}

createToken()*/

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})