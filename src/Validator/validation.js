const internModel=require('../Model/internModel')
const collegeModel=require('../Model/collegeModel')

// ========================regex validation==================================================

const isvalidChar=(/^([a-zA-Z_]+\s)*[a-zA-Z_]{2,50}$/)
const isvalidlink=(/^https?:\/\/.*\.[s3].*\.(png|gif|webp|jpeg|jpg)\??.*$/gim)
const isvalidEmail=(/^\w+([\.]?\w+)@\w+([\.]?\w+)(\.\w{2,3})+$/)
const isvalidNumber=(/^[0]?[6789]\d{9}$/)

// ==============================validation for college======================================

const validationforcollege= async function(req,res,next){
    try{
        let data=req.body
        const {name,fullName,logoLink}=data
        if(Object.values(data).length==0){
            return res.status(400).send({status:false,error:"All fields are Mandatory"})
        }
        if(!name){ 
            return res.status(400).send({status:false, error:"Name is required"})
        }else{
            if(!isvalidChar.test(name)) return res.status(400).send({status:false,error:"This name contains certain characters that aren't allowed"})
    
            let duplicateName=await collegeModel.find({name:name})
            if(duplicateName.length>0) return res.status(400).send({status:false, error:"This name is already taken"})
        }
    
        if(!fullName){
            return res.status(400).send({status:false, error:"fullName is required"})
        }else{
            if(!isvalidChar.test(fullName)) return res.status(400).send({status:false,error:"fullName contains certain characters that aren't allowed"})
        }
        if(!logoLink || logoLink == ""){
            return res.status(400).send({status:false,error:"Please provide logolink"})
        }else{
            if (!isvalidlink.test(logoLink)) 
            return res.status(400).send({ status: false, message: " Please enter logoLink in correct format" })
        }
        next()
    }
    catch(error){
        return res.status(500).send({status:false, error:error.message})
        }
    }

// ==============================validation for intern========================================

const validationforintern=async function(req,res,next){
    try{
        let data=req.body
        let {name,email,mobile,collegeName}=data
    
        if(Object.values(data).length==0){
            return res.status(400).send({status:false, error:"All fields are Mandatory"})
        }
        if(!name){ 
            return res.status(400).send({status:false, error:"Name is required"})
        }else{
            if(!isvalidChar.test(name)) return res.status(400).send({status:false,error:"This name contains certain characters that aren't allowed"})
        }
        if(!email){
            return res.status(400).send({status:false,error:"email is required"})
        }else{
            if (!isvalidEmail.test(email)) {
                return res.status(400).send({status:false, error:"please provide valid email"})
            }
            let duplicateEmail=await internModel.find({email:email})
            if(duplicateEmail.length>0){
               return res.status(400).send({status:false, error:"email already taken"}) 
            }
        }
        if(!mobile || mobile==""){
            return res.status(400).send({status:false,error:"Mobile is required"})
        }else{
            if(typeof (mobile)==='string') return res.status(400).send({status:false,error:"Mobile no. should be type of Number"})
            if (!isvalidNumber.test(mobile)){
                return res.status(400).send({status:false,error:"Please provide valid mobile"})
            }
            let duplicateMobile=await internModel.find({mobile:mobile})
            if(duplicateMobile.length>0){
               return res.status(400).send({status:false, error:"Mobile No. already taken"}) 
            }
        }
        if(!collegeName || collegeName==""){
        return res.status(400).send({status:false,error:"College Name is required"})
        }else{
            if(!isvalidChar.test(collegeName)){
                return res.status(400).send({status:false,error:"Please provide valid college name"})
            }
        }
        next()
    }
    catch(error){
        return res.status(500).send({status:false,error:error.message})
    }
}
    
module.exports={validationforcollege,validationforintern}