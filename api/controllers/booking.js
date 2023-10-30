import booking from "../models/BookingModel.js"

//CREATE BOOKING
export const createBooking = async (req,res,next) =>{
    const newBooking = new booking(req.body)

    try{
        const savedBooking = await newBooking.save()
        res.status(200).json(savedBooking)
    }catch(err){
        next(err)
    }
}

//UPDATE BOOKING
export const updateBooking = async (req,res,next) =>{
    try{
        const updatedBooking = await booking.findByIdAndUpdate(
            req.params.id,
            { $set : req.body },
            { new : true } //shows updated preview in insomnia
            )
        res.status(200).json(updatedBooking)
    }catch(err){
        next(err)
    }
}

//DELETE BOOKING
export const deleteBooking = async (req,res,next) =>{
    try{
        const deleteBooking = await booking.findByIdAndDelete(
            req.params.id
            )
        res.status(200).json("Object has been deleted")
    }catch(err){
        next(err)
    }
}

//GET BOOKING
export const getBooking = async (req,res,next) =>{
    try{
        const hotel = await booking.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

//GET ALL BOOKING
export const getallBooking = async (req,res,next) =>{
    try{
        const hotels = await booking.find()
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
}

export const getAvailableTimes = async (req,res,next) => {
    try {
      // Fetch approved bookings from MongoDB
      const bookedSlots = await booking.find({ Status: 'approved' });
  
      // Calculate available time slots
      const openingTime = new Date(); // Define your opening time
      openingTime.setHours(6, 0, 0, 0);
  
      const closingTime = new Date(); // Define your closing time
      closingTime.setHours(20, 30, 0, 0);
      const timeSlots = [];
  
      // Generate time slots between openingTime and closingTime
      let currentTime = new Date(openingTime);

      while (currentTime <= closingTime) {
        timeSlots.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 30); // 30 minutes interval
      }
    
      // Remove booked slots from available time slots
      const availableTimeSlots = timeSlots.filter((timeSlot) => {
        return !bookedSlots.some((booking) => {
          return timeSlot >= booking.timeFrom && timeSlot < booking.timeTo;
        });
      });
  
      res.json({ availableTimeSlots });
    } catch (err) {
      next(err)
    }
  }

export const postSubmit = async (req, res) => {
    try {
        // Extract data from the request (e.g., req.body)
        const { Department, Hall, affiliatedDept, date, timeFrom, timeTo, reason } = req.body;

        // Get the student ID from the JWT token (assuming it's in req.user)
        const studentId = "2021239020";

        // Create a new booking document and save it to the MongoDB booking schema
        const newBooking = new Booking({
        Department,
        Hall,
        affiliatedDept,
        date,
        timeFrom,
        timeTo,
        reason,
        studentId,
        });

        await newBooking.save();

        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};