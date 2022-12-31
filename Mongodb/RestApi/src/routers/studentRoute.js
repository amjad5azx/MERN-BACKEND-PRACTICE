const express=require("express")
const router =new express.Router()
const Student=require("../models/student")

//creae a new student
// router.post("/students",(req,res)=>{
//     console.log(req.body);
//     const user=new Student(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

//post using async
router.post("/students",async (req,res)=>{
    
    try {
        const user=new Student(req.body)
        const createUser=await user.save()
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/students',async(req,res)=>{
    try {
        const studentData=await Student.find()
        res.send(studentData)
    } catch (error) {
        res.send(error)
    }
})
// get by using id
// router.get('/students/:id',async(req,res)=>{
//     try {
//         const _id=req.params.id;
//         const  studentData=await Student.findById(_id)
//         if(!studentData){
//             return res.status(404).send()
//         }
//         else{
//             res.send(studentData)
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// get by using name 
router.get('/students/:email',async(req,res)=>{
    try {
        const _email=req.params.email;
        const  studentData=await Student.findOne({ email:_email });
        if(!studentData){
            return res.status(404).send()
        }
        else{
            res.send(studentData)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//Update Student
router.patch("/students/:id",async(req,res)=>{
    try {
        const updateStudent=await Student.findByIdAndUpdate(req.params.id,req.body,{
            new:true    
        })
            res.send(updateStudent)
    } catch (error) {
        return res.status(404).send()
    }
})

//delete record
router.delete("/students/:id",async(req,res)=>{
    try {
        const deleteStudent=await Student.findByIdAndDelete(req.params.id)
        if(!deleteStudent){
            return res.status(404).send()
        }else{
            res.send(deleteStudent)
        }
    } catch (error) {
        return res.status(500).send()
    }
})

module.exports=router