const internModel=require('../Model/internModel')
const collegeModel=require('../Model/collegeModel')

const createIntern=async function(req,res){
try{
    let data=req.body
    let {collegeName}=data

        let collegedetail= await collegeModel.findOne({name:collegeName},{isDeleted:false})
        if(!collegedetail) return res.status(404).send({status:false, message:"Not found"})
        
        data.collegeId=collegedetail._id

        let internData= await internModel.create(data)
        return res.status(201).send({status:true, message:"Intern Created Successfully", data:internData})
    }
catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}

module.exports={createIntern}