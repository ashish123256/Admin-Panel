import { cloudinary, storage } from "../cloudinaryConfig.js";
import Employee from "../models/employeeModel.js";
import { errorHandler } from "../utils/error.js";
import validator from "validator";

const validateEmail = (email) => validator.isEmail(email);

export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, mobileNo, designation, gender, courses } = req.body;

    if (!name || !email || !mobileNo || !designation || !gender || !courses) {
      return next(errorHandler(400, "please fill the all fields"));
    }

    if (!validateEmail(email)) {
      return next(errorHandler(400, "Invalid email"));
    }

    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
      return next(errorHandler(409, "Email already exists"));
    }

    let image = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, storage);
      image = result.secure_url;
    }

    const employeeCount = await Employee.countDocuments();
    const id = employeeCount + 1;

    const newEmployee = await Employee.create({
      id,
      name,
      email,
      mobileNo,
      designation,
      gender,
      courses,
      image,
    });

    res
      .status(201)
      .json({
        message: `New employee ${newEmployee.email} created successfully.`,
      });
  } catch (error) {
    next(errorHandler(500, "Employee creation failed"));
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    next(errorHandler(500, "Fetching employees failed"));
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }

    res.status(200).json({ employee });
  } catch (error) {
    next(errorHandler(500, "Fetching employee failed"));
  }
};

export const editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobileNo, designation, gender, courses } = req.body;

    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return next(errorHandler(404, "Employee not found"));
    }

    if (email && email !== existingEmployee.email) {
      if (!validateEmail(email)) {
        return next(errorHandler("Invalid email", 400));
      }
      existingEmployee.email = email;
    }

    if (name) existingEmployee.name = name;
    if (mobileNo) existingEmployee.mobileNo = mobileNo;
    if (designation) existingEmployee.designation = designation;
    if (gender) existingEmployee.gender = gender;
    if (courses) existingEmployee.courses = courses;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      existingEmployee.image = result.secure_url;
    }

    await existingEmployee.save();
    res
      .status(200)
      .json({
        message: `Employee ${existingEmployee.email} updated successfully.`,
      });
  } catch (error) {
    next(errorHandler(500, "Employee update failed"));
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return next(errorHandler(404, "Employee not found"));
    }
    res.status(200).json({ message: `Deleted employee ${employee.name}` });
  } catch (error) {
    next(errorHandler(500, "Could not delete employee"));
  }
};
