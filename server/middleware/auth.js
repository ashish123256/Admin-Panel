import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const authMiddleware = async(req, res, next) =>{
    const Authorization = req.headers.Authorization || req.headers.authorization;
    if(Authorization && Authorization.startsWith('Bearer')){
        const token = Authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
            if(err) return next(errorHandler(403 ,"Forbidden"));
            req.user= user;
            next();
        })
    }
    else{
        return next(errorHandler(401,"Unauthorized"))
    }
}
