import mongoose from 'mongoose'

const hallsSchema = new mongoose.Schema({
    "Faculty_ID": {
        "type": "String",
        "required":true
    },
    "Hall_Name": {
        "type": "String",
        "required":true
    },
    "Department": {
        "type": "String",
        "required":true
    },
    "Description": {
        "type": "String",
    },
    "Capacity": {
        "type": "Number",
        "required":false
    },
    "Image1": {
        "type": "String",
        "required":false
    },
    "Image2": {
        "type": "String",
        "required":false
    }
})

export default mongoose.model("halls",hallsSchema)