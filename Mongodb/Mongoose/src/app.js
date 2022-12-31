const mongoose=require("mongoose")
const validator=require("validator")

//mongoose validators:
//https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbUtzeDVzLUgzaVpGbkhuX3N1VEJDb2dyVnQzQXxBQ3Jtc0ttaHFoT1d3TFZxbXlETGEwTldJMThmRWNRTEoxYVotTmdsNnp2N2lvT0luZ3gyQUlUalFuSS1tby03eXFDTzZQSFMtWHRsY3dBYml6ZUJ2UE9ZUTF3V1R2M0s3V3U5YnF2VDZWVktBSGEzWXJ5OVdERQ&q=https%3A%2F%2Fmongoosejs.com%2Fdocs%2Fvalidation.html&v=SorjuKKAMmI

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/mywork", { useNewUrlParser: true, useUnifiedTopology:true } ).then(()=>console.log("Successfully connected")).catch((err)=>console.log("Failed to connect"));

//Schema describe structure of document
// const studentSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         trim:true, //letf right may diye gae space faaltu space khatam krta hay
//         minlength:5,
//         maxlength:15
//     },
//     program:{
//         type: String,
//         required:true,
//         enum:["BSE","CS","BSCS"]//agr value is se match karay gi to he insert ho ga wrna nhi
//     },
//     semester:{
//         type:Number,
//         validate(value){
//             if(value<=0){
//                 throw new Error('semester must be +ve')
//             }
//         }
//     },
//     dob:{
//         type:Date,
//         default:Date.now
//     },
//     status:Boolean
// })

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, //letf right may diye gae space faaltu space khatam krta hay
        minlength:5,
        maxlength:50
    },
    program:{
        type: String,
        required:true,
        enum:["BSE","CS","BSCS"]//agr value is se match karay gi to he insert ho ga wrna nhi
    },
    semester:{
        type:Number,
        validate(value){
            if(value<=0){
                throw new Error('semester must be +ve')
            }
        }
    },
    dob:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!(validator.isEmail(value))){
                throw new Error("Email is invalid")
            }
        }
    },
    status:Boolean
})

//creating collection
// const Studentlist=new mongoose.model("Studentlist",studentSchema);
const Studentlist=new mongoose.model("StudentEmail",studentSchema);

// craeteing or inserting in document
const createDocument=async ()=>{
    try{
        // const student1=new Studentlist({
        //     name:"Ali",
        //     program:"CS",
        //     semester:5,
        //     status:true
        // })

        // const student2=new Studentlist({
        //     name:"Haider",
        //     program:"BSE",
        //     semester:6,
        //     status:true
        // })

        // const student3=new Studentlist({
        //     name:"Zain",
        //     program:"BSE",
        //     semester:1,
        //     status:true
        // })
        const student3=new Studentlist({
                name:"Ameer Hamza Bhinder",
                program:"BSE",
                semester:11,
                email:"ameerhamza@gmail.com",
                status:true
            })

        // const result=await student1.save() this is use for inserting only one document
        const result=await Studentlist.insertMany([student3])
        console.log(result)
    }
    catch(error){
        console.log(error)
    }
}

createDocument()
// console.log()

const getDocument=async()=>{
    try{
        // const result=await Studentlist.find()
    // const result=await Studentlist.find({name:"Amjad"})
    // const result=await Studentlist.find({name:"Amjad"}).select({name:1})
    // const result=await Studentlist.find().select({name:1}).limit(2)
    // const result=await Studentlist.find({semester:{$lt:5}}).select({name:1})
    // const result=await Studentlist.find({program:{$in:["CS"]},semester:{$eq:6}}).select({name:1})
    // const result=await Studentlist.find({$or:[{semester:1},{name:"Amjad"},{program:"CS"}]})
    // const result=await Studentlist.find({name:"Amjad"}).countDocuments()
    // const result=await Studentlist.find().sort({semester:1})//ascending order
    // const result=await Studentlist.find().sort({semester:-1})//descending order
    const result=await Studentlist.find().sort({name:1})



    console.log(result)
    }catch(err){
        console.log(err)
    }
}

// getDocument()
const updateDocument= async(name) =>{
    try{
        // const result= await Studentlist.updateOne({name},{
        const result= await Studentlist.findOneAndUpdate({name},{
        $set:{
            program:"BS"
        }
    });
    console.log(result)
}
catch(err){
        console.log(err)
    }
}

// updateDocument("Haider")

const deleteDocument=async(name)=>{
    try{
        const result=await Studentlist.findOneAndDelete({name})
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

// deleteDocument("Zain")
