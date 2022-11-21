const collegeModel=require('../Model/collegeModel')

const createCollege= async function(req,res){
try{
    let data=req.body
    const {name,fullName,logoLink}=data
    if(Object.values(data).length==0){
        return res.status(400).send({status:false,error:"All fields are Mandatory"})
    }
    if(!name){ 
        return res.status(400).send({status:false, error:"Name is required"})
    }else{
        if(!(/^([a-zA-Z_]+\s)*[a-zA-Z_]{2,30}$/).test(name)) return res.status(400).send({status:false,error:"This name contains certain characters that aren't allowed"})

        let duplicateName=await collegeModel.find({name:name})
        if(duplicateName.length>0) return res.status(400).send({status:false, error:"This name is already taken"})
    }

    if(!fullName){
        return res.status(400).send({status:false, error:"fullName is required"})
    }else{
        if(!(/^([a-zA-Z_]+\s)*[a-zA-Z_]{2,50}$/).test(fullName)) return res.status(400).send({status:false,error:"fullName contains certain characters that aren't allowed"})
    }
    if(!logoLink || logoLink == ""){
        return res.status(400).send({status:false,error:"Please provide logolink"})
    }else{
        if (!(/^https?:\/\/.*\.[s3].*\.(png|gif|webp|jpeg|jpg)\??.*$/gim).test(logoLink)) 
        return res.status(400).send({ status: false, message: " Please enter logoLink in correct format" })
    }

    let saveddata= await collegeModel.create(data)
    return res.status(201).send({status:true, message:saveddata})
}
catch(error){
    return res.status(500).send({status:false, error:error.message})
    }
}
module.exports={createCollege}