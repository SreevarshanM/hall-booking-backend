import express from "express";

const router = express.Router();

router.get("/", (req,res)=> {
    res.send("This is student endpoint")
})

export default router