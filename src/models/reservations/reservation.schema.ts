import { model, Schema } from "mongoose";
import IReservation from "./reservation.interface";

const reservationSchema = new Schema<IReservation>({
  userEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  reservationTime: {
    type: Date,
    required: true,
    validate: [
      {
        validator: function (value: Date) {
          const now = new Date();
          return value > now;
        },
        message: "Reservation time must be after the current date.",
      },
      {
        validator: function (value: Date) {
          const hour = value.getHours();
          return hour >= 19 && hour <= 23;
        },
        message: "Reservation time must be between 19:00 and 23:00.",
      }
    ],
  },
  tableNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value >= 1 && value <= 5;
      },
      message: "Table number must be between 1 and 5.",
    },
  },
});

const Reservation = model<IReservation>("Reservation", reservationSchema);

export default Reservation;
