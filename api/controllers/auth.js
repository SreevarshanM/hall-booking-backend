import student from "../models/StudentModel.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req,res,next) => {
    try{

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Password, salt);


        const newStudent = new student({
            Student_ID: req.body.Student_ID,
            Student_Name: req.body.Student_Name,
            Department: req.body.Department,
            Email: req.body.Email,
            Password: hash
        })

        await newStudent.save()
        res.status(200).send("Student Registered Successfully") //success register
    }catch(err){
        next(err)
    }
}

export const login = async (req,res,next) => {
    try{
        const userStudent = await student.findOne({Student_ID: req.body.Student_ID});
        if (!userStudent) next(createError(404, "User Not Found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.Password, userStudent.Password);
        if (!isPasswordCorrect) 
            return next(createError(400, "Password not correct"));

        const token = jwt.sign({id:userStudent._id, })

        const { Email, Password, ...otherDetails } = userStudent._doc; //IMPORTANT

        res.status(200).json({...otherDetails}) //login done. Hide Password and Email in return Json. IMPORTANT
    }catch(err){
        next(err) 
    }
}