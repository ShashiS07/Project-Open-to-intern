const internModel=require('../Model/internModel')
const collegeModel=require('../Model/collegeModel')

const createIntern=async function(req,res){
try{
    let data=req.body
    let {name,email,mobile,collegeName}=data

    if(Object.values(data).length==0){
        return res.status(400).send({status:false, error:"All fields are Mandatory"})
    }
    if(!name){ 
        return res.status(400).send({status:false, error:"Name is required"})
    }else{
        if(!(/^([a-zA-Z_]+\s)*[a-zA-Z_]{2,30}$/).test(name)) return res.status(400).send({status:false,error:"This name contains certain characters that aren't allowed"})
    }
    if(!email){
        return res.status(400).send({status:false,error:"email is required"})
    }else{
        if (!(/^\w+([\.]?\w+)@\w+([\.]?\w+)(\.\w{2,3})+$/).test(email)) {
            return res.status(400).send({status:false, error:"please provide valid email"})
        }
        let duplicateEmail=await internModel.find({email:email})
        if(duplicateEmail.length>0){
           return res.status(400).send({status:false, error:"email already taken"}) 
        }
    }
    if(!mobile || mobile==(null||undefined||"")){
        return res.status(400).send({status:false,error:"Mobile is required"})
    }else{
        if(typeof (mobile)==='string') return res.status(400).send({status:false,error:"Mobile no. should be type of Number"})
        if (!(/^[0]?[6789]\d{9}$/).test(mobile)){
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
        if(!(/^([a-zA-Z_]+\s)*[a-zA-Z_]{2,30}$/).test(collegeName)){
            return res.status(400).send({status:false,error:"Please provide valid college name"})
        }

        let collegedetail= await collegeModel.findOne({name:collegeName},{isDeleted:false})
        if(!collegedetail) return res.status(404).send({status:false, error:"Not found"})
        
        data.collegeId=collegedetail._id

        let internData= await internModel.create(data).populate('collegeId')
        return res.status(201).send({status:false, message:"Intern Created Successfully", data:internData})
    }
}
catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}

module.exports={createIntern}