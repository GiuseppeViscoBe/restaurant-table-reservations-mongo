import { Request, Response, NextFunction } from "express";
import User from "../../models/users/user.schema";
import IUser from "../../models/users/user.interface";
import mongoose from "mongoose";
import { CustomError } from "../../models/customError.interface";

// const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   res.status(200).json("user gotten");
// };

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    const existingUser: IUser | null = await User.findOne({
      name: name,
      email: email,
    });

    if (existingUser) {
      const error: CustomError = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const newUser = new User({
      name: name,
      email: email,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors)
        .map((error) => error.message)
        .join(", ");
      const errorCustom: CustomError = new Error(errorMessages);
      errorCustom.statusCode = 400;
      next(errorCustom);
    } else {
      next(error);
    }
  }
};

export default {
  createUser,
};
