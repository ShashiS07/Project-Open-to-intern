const collegeModel=require('../Model/collegeModel')
const internModel = require('../Model/internModel')

const createCollege= async function(req,res){
try{
    let data=req.body
   
    let saveddata= await collegeModel.create(data)
    return res.status(201).send({status:true, message:"College Created Successfully",data:saveddata})
}
catch(error){
    return res.status(500).send({status:false, error:error.message})
    }
}

// ==============================get college details======================================

const getcollegeinterns=async function(req,res){
    // res.setHeader('Access-Control-Allow-Origin','*')
    try{
        let collegeName=req.query.collegeName

        if(!collegeName) return res.status(400).send({status:false,message:"College Name is required"})

        const college= await collegeModel.findOne({name:collegeName},{isDeleted:false})
        if(!college) return res.status(404).send({status:false,message:"College not found"})

        const internData= await internModel.find({collegeId:college._id},{isDeleted:false})
        
        if(internData.length==0) return res.status(200).send({status:false,message:"No interns found"})

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