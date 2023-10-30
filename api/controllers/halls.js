import halls from "../models/HallsModel.js"

//CREATE BOOKING
export const createHall = async (req,res,next) =>{
    const newHall = new halls(req.body)

    try{
        const savedHall = await newHall.save()
        res.status(200).json(savedHall)
    }catch(err){
        next(err)
    }
}

//GET ALL HALLS
export const getallHalls = async (req,res,next) =>{
    try{
        const hallsList = await halls.find()
        res.status(200).json(hallsList)
    }catch(err){
        next(err)
    }
}

