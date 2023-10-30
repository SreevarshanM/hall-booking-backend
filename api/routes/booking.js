import express from "express";
import { createBooking, deleteBooking, getAvailableTimes, getBooking, getallBooking, updateBooking } from "../controllers/booking.js";

const router = express.Router();

//CREATE
router.post('/', createBooking)

//UPDATE
router.put('/:id', updateBooking)

//DELETE
router.delete('/:id', deleteBooking)

//AVAILABLE SLOTS FOR PARTICULAR HALL
router.get('/availableslots',getAvailableTimes)

//GET
router.get('/:id', getBooking)

//GET ALL
router.get('/', getallBooking)



















// import express from "express";

// const router = express.Router();

// router.get("/", (req,res)=> {
//     res.send("This is booking endpoint");
// })

export default router