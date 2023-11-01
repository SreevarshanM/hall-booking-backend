import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import bookingRoute from "./routes/booking.js";
import hallsRoute from "./routes/halls.js";
import studentRoute from "./routes/student.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connection est.");
  } catch (error) {
    console.log("Connection failed");
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected MongoDb");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/halls", hallsRoute);
app.use("/api/student", studentRoute);

app.listen(8800, () => {
  connect();
  console.log("Backend Started");
});
