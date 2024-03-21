const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require ("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
     console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname,"./client/build")));


let userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    age : Number,
    email : String,
    password : String,
    mobile : String,
    profilePic : String,
});
let User = new mongoose.model("user",userSchema);

app.post("/login",upload.none(),async(req,res)=>{

    console.log(req.body);
    let userDetails = await User.find().and({email:req.body.email});
    console.log(userDetails);

    if(userDetails.length>0){

      //  if(userDetails[0].password == req.body.password){
        if( await bcrypt.compare(req.body.password,userDetails[0].password) == true){


let token = jwt.sign({email:req.body.email,password:req.body.password},"raniachari")

            let userDataToSend = {
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                password:userDetails[0].password,
                mobile:userDetails[0].mobile,
                profilePic:userDetails[0].profilePic,
                token:token,


            }
          res.json({status:"success",data:userDataToSend});
        }
        else{
            res.json({status:"failure",msg:"Invalid Password"});

        }
     
    }
    else{
      res.json({status:"failure",msg:"User doesnot exist"});
    }
    console.log(["Ani"]);
    
});

app.post("/Signup",upload.single("profilePic"), async(req,res)=>{
    console.log(req.body);
    console.log(req.file.path);

    let emailUser = await  User.find().and({email:req.body.email});

    if(emailUser.length>0){
        res.json({status:"failure",msg:"User already exist"});

    }else{

    let hashedPassword = await bcrypt.hash(req.body.password,7)

        try{


            let newUser = new User({
                firstName :req.body.firstName,
                lastName :req.body.lastName,
                age :Number(req.body.age),
                email :req.body.email,
                password : hashedPassword,
                mobile :req.body.mobile,
                profilePic :req.file.path,
        
            });
        
            await User.insertMany([newUser])
            res.json({status:"success",msg:"user created sucessfully"});
        
            
        }
        catch(err){
           
            res.json({status:"failuer",msg:"Unable to create an account"});
        }

    }

   
});

app.post("/loginWithToken",upload.none(),async (req,res)=>{
  
    console.log(req.body);
    let decryptedToken = jwt.verify(req.body.token,"raniachari");
    console.log(decryptedToken);

    let userDetails = await User.find().and({email:decryptedToken.email});
    if(userDetails.length >0){

        if(userDetails[0].password == decryptedToken.password){
            let userDataToSend = {
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                mobile:userDetails[0].mobile,
                profilePic:userDetails[0].profilePic,
                


            }
          res.json({status:"success",data:userDataToSend});
        }

    }else{
        res.json({status:"failure",msg:"Invalid Token"});
    }

  

});

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{

    console.log(req.body);
    try{
        if(req.body.firstName.trim().length>0){
            let updateDetails = await User.updateMany({email:req.body.email},{firstName:req.body.firstName});
    
        };
        
        if(req.body.firstName.trim().length>0){
            let updateDetails = await User.updateMany({email:req.body.email},{lastName:req.body.lastName});
    
        }

        if(req.body.age.trim().length>0){
            let updateDetails = await User.updateMany({email:req.body.email},{age:req.body.age});
    
        }
        if(req.body.password.trim().length>0){
            let updateDetails = await User.updateMany({email:req.body.email},{password:req.body.password});
    
        }
        if(req.body.mobile.trim().length>0){
            let updateDetails = await User.updateMany({email:req.body.email},{mobile:req.body.mobile});
    
        }
        console.log(req.file);
        if(req.file){
            let updateDetails = await User.updateMany({email:req.body.email},{profilePic:req.file.path});
    
        }
        res.json({status:"success",msg:"User details updated successfully"});
    }catch(error){
        res.json({status:"failure",msg:"Unable to update user details",error:error,});

    }

});


app.delete("/deleteProfile",upload.none(),async(req,res)=>{

    console.log(req.body);
    try{
        let deleteDetails = await User.deleteMany({email:req.body.email});
          res.json({status:"success",msg:"User deleted successfully."});
    }catch(error){
          res.json({status:"failure",msg:"Unable to delete the user",error:error});
    }

});

app.listen(process.env.port,()=>{
console.log(`Listening to port ${process.env.port}`);
});
let connectToMDB = async (req,res)=>{
    try{
     
     await mongoose.connect(process.env.mdburl);
       
   console.log("Successfully connected to MDB");
    }
    catch(error){
        console.log("Unable to connect to MDB");
    }

}
connectToMDB();

