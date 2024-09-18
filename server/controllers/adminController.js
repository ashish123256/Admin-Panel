import AdminUser from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    if (!username || !email || !password) {
      return next(errorHandler(400, "fill the all the fields"));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await AdminUser.findOne({ email: newEmail });

    if (emailExists) {
      return next(errorHandler(409, "email already Exist"));
    }

    if (password.trim().length < 6) {
      return next(errorHandler("password should be atleast 6 characters"));
    }

    const newAdmin = await AdminUser.create({
      username,
      email: newEmail,
      password: hashPassword,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({
        message: `new Admin user ${newAdmin.email} is created successfully`,
      });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "please fill all fields"));
    }

    const newEmail = email.toLowerCase();

    const admin = await AdminUser.findOne({ email: newEmail });
    if (!admin) {
      return next(errorHandler(404, "Invalid Credentials"));
    }

    const validPassword = await bcryptjs.compare(password, admin.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = admin._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({token,rest});
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await AdminUser.findById(id).select("-password");
    if (!admin) {
      return next(errorHandler(404, "Admin user not found"));
    }
    res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
   res.clearCookie('access_token');
   res.status(200).json('Admin User has been logged out!')
  } catch (error) {
     next(error)
  }
}