const collegeModel=require('../Model/collegeModel')
const internModel = require('../Model/internModel')

const createCollege= async function(req,res){
try{
    let data=req.body
   
    let saveddata= await collegeModel.create(data)
    return res.status(201).send({status:true, message:saveddata})
}
catch(error){
    return res.status(500).send({status:false, error:error.message})
    }
}

// ==============================get college details======================================

const getcollegeinterns=async function(req,res){
    try{
        let collegeName=req.query.collegeName
        if(Object.values(req.query)==0){
            return res.status(400).send({status:false,error:"Please provide query"})
        }
        if(!collegeName) return res.status(400).send({status:false,error:"College Name is required"})

        const college= await collegeModel.findOne({name:collegeName},{isDeleted:false})
        if(!college) return res.status(404).send({status:false,error:"College not found"})

        const internData= await internModel.find({collegeId:college._id},{isDeleted:false})
        
        const collegeDetails={
            name:college.name,
            fullName:college.fullName,
            logoLink:college.logoLink,
            interns:internData
        }

        return res.status(200).send({status:true,data:collegeDetails})
    }
    catch(error){
        return res.status(500).send({status:false,error:error.message})
    }
}

module.exports={createCollege,getcollegeinterns}