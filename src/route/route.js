const express=require("express")
const router=express.Router()

const CollegeController=require('../Controller/collegeController')

router.post('/functionup/colleges',CollegeController.createCollege)

module.exports=router