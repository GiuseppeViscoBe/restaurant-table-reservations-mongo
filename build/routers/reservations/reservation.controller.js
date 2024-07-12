"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_schema_1 = __importDefault(require("../../models/reservations/reservation.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getReservationsByDateRange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reservationQueryStart, reservationQueryEnd } = req.query;
        const resultReservation = yield reservation_schema_1.default.find({
            $and: [
                { reservationTime: { $gte: reservationQueryStart } },
                { reservationTime: { $lte: reservationQueryEnd } },
            ],
        });
        res.status(200).json(resultReservation);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errorMessages = Object.values(error.errors)
                .map((error) => error.message)
                .join(", ");
            const errorCustom = new Error(errorMessages);
            errorCustom.statusCode = 400;
            next(errorCustom);
        }
        else {
            next(error);
        }
    }
});
const createReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, reservationTime, tableNumber } = req.body;
        const newReservation = new reservation_schema_1.default({
            userEmail: userEmail,
            reservationTime: reservationTime,
            tableNumber: tableNumber,
        });
        console.log(newReservation);
        const savedReservation = yield newReservation.save();
        // const resultReservation: IReservation[] | null = await Reservation.find({
        //   $and: [
        //     { reservationTime: { $gte: reservationQueryStart } },
        //     { reservationTime: { $lte: reservationQueryEnd } },
        //   ],
        // });
        res.status(200).json(savedReservation);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errorMessages = Object.values(error.errors)
                .map((error) => error.message)
                .join(", ");
            const errorCustom = new Error(errorMessages);
            errorCustom.statusCode = 400;
            next(errorCustom);
        }
        else {
            next(error);
        }
    }
});
exports.default = {
    createReservation,
    getReservationsByDateRange,
};
