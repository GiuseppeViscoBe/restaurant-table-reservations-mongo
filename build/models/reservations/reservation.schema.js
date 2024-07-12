"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
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
                validator: function (value) {
                    const now = new Date();
                    return value > now;
                },
                message: "Reservation time must be after the current date.",
            },
            {
                validator: function (value) {
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
            validator: function (value) {
                return value >= 1 && value <= 5;
            },
            message: "Table number must be between 1 and 5.",
        },
    },
});
const Reservation = (0, mongoose_1.model)("Reservation", reservationSchema);
exports.default = Reservation;
