import { Response, Request, NextFunction } from "express";
import IReservation from "../../models/reservations/reservation.interface";
import Reservation from "../../models/reservations/reservation.schema";
import mongoose from "mongoose";
import { CustomError } from "../../models/customError.interface";

const getReservationsByDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationQueryStart, reservationQueryEnd } = req.query;

    const resultReservation: IReservation[] | null = await Reservation.find({
      $and: [
        { reservationTime: { $gte: reservationQueryStart } },
        { reservationTime: { $lte: reservationQueryEnd } },
      ],
    });

    res.status(200).json(resultReservation);
  } catch (error) {
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

const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, reservationTime, tableNumber } = req.body;

    const newReservation = new Reservation({
      userEmail: userEmail,
      reservationTime: reservationTime,
      tableNumber: tableNumber,
    });

    console.log(newReservation);

    const savedReservation = await newReservation.save();
    // const resultReservation: IReservation[] | null = await Reservation.find({
    //   $and: [
    //     { reservationTime: { $gte: reservationQueryStart } },
    //     { reservationTime: { $lte: reservationQueryEnd } },
    //   ],
    // });

    res.status(200).json(savedReservation);
  } catch (error) {
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
  createReservation,
  getReservationsByDateRange,
};
