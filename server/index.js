import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import { notFound } from "./middleware/errorMiddleware.js";


dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

const Port = process.env.PORT

const app = express();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.listen(Port,()=>{
    console.log(`Server is running on port${Port}`)
})


app.use('/api/admin',adminRoutes);
app.use('/api/employee',employeeRoutes);

app.use(notFound)
app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 500;
    const message = err.message||"Internal Server Error!";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
