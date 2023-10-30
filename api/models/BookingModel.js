import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    "Booking_ID": {
        "type": "String",
        "required":true
    },
    "Hall_ID": {
        "type": "String",
        "required":true
    },
    "Student_ID": {
        "type": "String",
        "required":true
    },
    "Department": {
        "type": "String",
        "required":true
    },
    "Affiliated": {
        "type": "String",
        "required":true
    },
    "Status": {
        "type": "String",
        "enum": ['rejected','approved','pending'],
        "default":'pending'
    },
    "Date": {
        "type": "Date",
        "required":true
    },
    "Time_From": {
        "type": "Date",
        "required":false
    },
    "Time_To": {
        "type": "Date",
        "required":false
    },
    "Reason": {
        "type": "String",
        "required":true
    }
})

export default mongoose.model("booking",bookingSchema)