const express=require("express")
const router=express.Router()
const CollegeController=require('../Controller/collegeController')
const InternController=require('../Controller/internController')
const validator=require('../Validator/validation')

router.post('/functionup/colleges',validator.validationforcollege, CollegeController.createCollege)

router.post('/functionup/interns',validator.validationforintern ,InternController.createIntern)

router.get('/functionup/collegeDetails',CollegeController.getcollegeinterns)

module.exports=router